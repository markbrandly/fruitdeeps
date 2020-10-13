import {Overhit} from "./Overhit.js";

export class DiamondBoltsOverhit extends Overhit{
	algorithm(){
		const hp = this.state.monster.stats.hitpoints

		const m1 = this.calcs.maxHit
		const m2 = this.calcs.maxHitSpec

		const specChance = this.calcs.specChance
		const accuracy = this.calcs.rawAcc

		const dist = Array(m2 + 1).fill(0)
		let hitSum = 0

		//populate hit distribution lookup table
		for(let h1 = 1; h1 <= m1; h1 += 1){
			dist[h1] += (1 - specChance) * accuracy / (m1 + 1)
			hitSum += (1 - specChance) * accuracy / (m1 + 1)
		} 

		for(let h2 = 1; h2 <= m2; h2 += 1){
			dist[h2] += specChance / (m2 + 1)
			hitSum += specChance / (m2 + 1)
		}

		for (let i = 1; i <= hp; i += 1){
			let sum = 0
			for(let hit = 1; hit <= m2; hit += 1){
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