import {Overhit} from "./Overhit.js";

export class VeracsOverhit extends Overhit{
	algorithm(){
		const hp = this.state.monster.stats.hitpoints

		const m1 = this.calcs.maxHit

		const specChance = 0.25
		const accuracy = this.calcs.rawAcc

		const dist = Array(m1 + 2).fill(0)
		let hitSum = 0

		//populate hit distribution lookup table
		for(let h1 = 0; h1 <= m1; h1++){
			dist[h1 + 1] += specChance / (m1 + 1)
			dist[h1] += (1 - specChance) * accuracy / (m1 + 1)

			hitSum += specChance / (m1 + 1)
			if(h1 > 0){
				hitSum += (1 - specChance) * accuracy / (m1 + 1)
			}
 		}

		for (let i = 1; i <= hp; i++){
			let sum = 0
			for(let hit = 1; hit <= m1 + 1; hit++){
				sum += this.getStep(i - hit) * dist[hit]
			}
			this.generalMemory[i] = (sum + 1) / (hitSum)
		}

		return this.getStep(hp)
	}

	hitsToDps(hits){
		const acc = this.calcs.accuracy
		const hp = this.state.monster.stats.hitpoints
		const speed = this.calcs.attackSpeed
		return hp / hits / speed / 0.6
	}
}