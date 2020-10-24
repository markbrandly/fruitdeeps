import {Overhit} from "./Overhit.js";

export class KerisOverhit extends Overhit{
	timeToKill(hp){
		const m1 = this.calcs.maxHit
		const baseMax = this.calcs.baseMax
		const speed = this.calcs.attackSpeed
		const accuracy = this.calcs.accuracy

		if(typeof this.generalMemory[hp-1] === 'undefined'){
			this.fillMemory(hp)
		}


		const dist = Array(baseMax * 3 + 1).fill(0) // [0, 0, 0, ... , 0].length == msum+1

		//populate hit distribution lookup table
		let sumHits = 0
		for(let h1 = 1; h1 <= m1; h1 += 1){
			dist[h1] += 50/51 / m1
			sumHits += 50/51 / m1
		}

		for(let h2 = 1; h2 <= baseMax; h2++){
			dist[h2 * 3] += 1/51 / baseMax
			sumHits += 1/51 / baseMax
		}

		// console.log(sumHits)


		let zeroChance = 50/51 / (m1 + 1) + 1/51 / (baseMax + 1)
		let sum = 0
		for(let hit = 1; hit <= baseMax * 3; hit += 1){
			sum += this.getStep(hp - hit) * dist[hit]
		}
		const ttk = sum + speed / (1-zeroChance) / accuracy
		this.generalMemory[hp] = ttk
		return ttk
	}
}