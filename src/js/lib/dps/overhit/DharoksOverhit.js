import {Overhit} from "./Overhit.js";

export class DharoksOverhit extends Overhit{
	timeToKill(hp){

		const m = this.calcs.maxHit
		const baseMax = this.calcs.baseMax
		const hpMult = this.calcs.hpMult

		const accuracy = this.calcs.accuracy
		const speed = this.calcs.attackSpeed

		if(typeof this.generalMemory[hp-1] === 'undefined'){
			this.fillMemory(hp)
		}

		const dist = Array(m + 1).fill(0) // [0, 0, 0, ... , 0]

		//populate hit distribution lookup table
		for(let h1 = 0; h1 <= baseMax; h1 += 1){
			dist[Math.floor(h1 * hpMult)] += 1 / baseMax
		}

		let sum = 0
		var bigSum = 0
		for(let hit = 1; hit <= m; hit += 1){
			sum += this.getStep(hp - hit) * dist[hit]
			bigSum += dist[hit]
		}

		const ttk = sum + (baseMax + 1) / baseMax * speed / accuracy
		this.generalMemory[hp] = ttk
		return ttk
	}
}