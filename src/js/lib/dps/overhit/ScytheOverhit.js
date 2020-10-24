import {Overhit} from "./Overhit.js";

function binList(dec){
	let bin = (dec >>> 0).toString(2)
	while(bin.length < 3){
		bin = "0" + bin
	}
	let binList = [false,false,false]
	for(let i = 0; i < 3; i++){
		if(bin[i] === "1"){
			binList[i] = true
		}
	}

    return binList
}

export class ScytheOverhit extends Overhit{

	distTable(){
		if("distTableMemory" in this){
			return this.distTableMemory
		}
		else {
			const m1 = this.calcs.maxHit1
			const m2 = this.calcs.maxHit2
			const m3 = this.calcs.maxHit3
			const mSum = m1 + m2 + m3

			const acc = this.calcs.accuracy
			const dist = Array(mSum + 1).fill(0)

			const mProduct = (m1 + 1) * (m2 + 1) * (m3 + 1)

			for(let h1 = 0; h1 <= m1; h1 += 1){
				for(let h2 = 0; h2 <= m2; h2 += 1){
					for(let h3 = 0; h3 <= m3; h3 += 1){

						let hitList = [h1, h2, h3]
						for(let i = 0; i <= 7; i++){
							let successList = binList(i)
							let sum = 0
							let chance = 1 / mProduct

							for(var j = 0; j < 3; j++){
								if(successList[j]){
									sum += hitList[j]
									chance = chance * acc
								}
								else{
									chance = chance * (1-acc)
								}
							}

							dist[sum] += chance
						}
					}
				}
			}

			this.distTableMemory = dist
			return dist
		}
	}

	timeToKill(hp){
		const mSum = this.calcs.maxHit
		const speed = this.calcs.attackSpeed
		
		if(typeof this.generalMemory[hp-1] === 'undefined'){
			this.fillMemory(hp)
		}
		const dist = this.distTable()	

		let sum = 0
		for(let hit = 1; hit <= mSum; hit += 1){
			sum += this.getStep(hp - hit) * dist[hit]
		}
		
		const ttk = (sum + speed) / (1 - dist[0])
		this.generalMemory[hp] = ttk

		return ttk
	}
}