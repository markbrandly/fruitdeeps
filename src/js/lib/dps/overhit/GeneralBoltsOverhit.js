import {Overhit} from "./Overhit.js";

export class GeneralBoltsOverhit extends Overhit{
	timeToKill(hp){
		const m1 = this.calcs.maxHit
		const m2 = this.calcs.maxHitSpec

		const boost = this.calcs.boost

		const specChance = this.calcs.specChance
		const accuracy = this.calcs.rawAcc
		const speed = this.calcs.attackSpeed

		const dist = Array(m2 + 1).fill(0)
		let hitSum = 0

		if(typeof this.generalMemory[hp-1] === 'undefined'){
			this.fillMemory(hp)
		}

		//populate hit distribution lookup table
		for(let h1 = 0; h1 <= m1; h1 += 1){
			dist[h1 + boost] = specChance / (m1 + 1)
			dist[h1] += (1-specChance) * accuracy / (m1 + 1)

			if(h1 + boost > 0){
				hitSum += specChance / (m1 + 1)
			}
			if(h1 > 0){
				hitSum += (1-specChance) * accuracy / (m1 + 1)
			}
		}

		let sum = 0
		for(let hit = 1; hit <= m2; hit += 1){
			sum += this.getStep(hp - hit) * dist[hit]
		}
		const ttk = (sum + speed) / (hitSum)
		this.generalMemory[hp] = ttk
		return ttk
	}
}