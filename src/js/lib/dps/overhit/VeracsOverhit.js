import {Overhit} from "./Overhit.js";

export class VeracsOverhit extends Overhit{
	timeToKill(hp){

		const m1 = this.calcs.maxHit

		const specChance = 0.25
		const accuracy = this.calcs.rawAcc
		const speed = this.calcs.attackSpeed

		const dist = Array(m1 + 2).fill(0)
		let hitSum = 0


		if(typeof this.generalMemory[hp-1] === 'undefined'){
			this.fillMemory(hp)
		}

		//populate hit distribution lookup table
		for(let h1 = 0; h1 <= m1; h1++){
			dist[h1 + 1] += specChance / (m1 + 1)
			dist[h1] += (1 - specChance) * accuracy / (m1 + 1)

			hitSum += specChance / (m1 + 1)
			if(h1 > 0){
				hitSum += (1 - specChance) * accuracy / (m1 + 1)
			}
 		}


		let sum = 0
		for(let hit = 1; hit <= m1 + 1; hit++){
			sum += this.getStep(hp - hit) * dist[hit]
		}
		const ttk = (sum + speed) / (hitSum)
		this.generalMemory[hp] = ttk
		return ttk
	}

	hitsToDps(hits){
		const acc = this.calcs.accuracy
		const hp = this.state.monster.stats.hitpoints
		const speed = this.calcs.attackSpeed
		return hp / hits / speed / 0.6
	}
}