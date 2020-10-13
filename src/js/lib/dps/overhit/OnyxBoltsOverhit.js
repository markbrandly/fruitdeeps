import {Overhit} from "./Overhit.js";

export class OnyxBoltsOverhit extends Overhit{
	algorithm(){
		const hp = this.state.monster.stats.hitpoints
		const m1 = this.calcs.maxHit
		const m2 = this.calcs.maxHitSpec

		const specChance = this.calcs.specChance

		//number of possible outcomes of a hit

		const dist = Array(m2 + 1).fill(0) // [0, 0, 0, ... , 0].length == msum+1

		//populate hit distribution lookup table
		for(let h1 = 0; h1 <= m1; h1 += 1){
			dist[h1] += (1 - specChance) / (m1 + 1)
		}

		for(let h2 = 0; h2 <= m2; h2++){
			dist[h2] += specChance / (m2 + 1)
		}

		//calc overhit dps for hp = 0, hp = 1, ..., hp = hp
		for (let i = 1; i <= hp; i += 1){
			let sum = 0
			for(let hit = 1; hit <= m1 * 3; hit += 1){
				sum += this.getStep(i - hit) * dist[hit]
			}
			this.generalMemory[i] = sum + 1 / dist[0]
		}

		return this.getStep(hp)
	}
}