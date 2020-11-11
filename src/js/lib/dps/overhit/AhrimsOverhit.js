import {Overhit} from "./Overhit.js";

export class AhrimsOverhit extends Overhit{
	timeToKill(hp){
		const m1 = this.calcs.maxHit
		const m2 = this.calcs.maxHitSpec
		const accuracy = this.calcs.accuracy
		const speed = this.calcs.attackSpeed

		const dist = Array(m2 + 1).fill(0)
		
		if(typeof this.generalMemory[hp-1] === 'undefined'){
			this.fillMemory(hp)
		}

		// const zeroChance =  0.25 * (m2 + 1) / m2 + 0.75 * (m1 + 1) / m1
		
		//populate hit distribution lookup table
		for(let h1 = 1; h1 <= m1; h1 += 1){
			dist[h1] += 0.75 / m1
		} 

		for(let h2 = 1; h2 <= m2; h2 += 1){
			dist[h2] += 0.25 / m2
		}

		let sum = 0
		for(let hit = 1; hit <= m2; hit += 1){
			sum += this.getStep(hp - hit) * dist[hit]
		}
		const ttk = sum + 1 / (1 - 0.75/(m1+1) - 0.25/(m2+1)) * speed / accuracy
		this.generalMemory[hp] = ttk
		return ttk
	}
}