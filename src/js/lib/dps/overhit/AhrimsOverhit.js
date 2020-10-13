import {Overhit} from "./Overhit.js";

export class AhrimsOverhit extends Overhit{
	algorithm(){
		const hp = this.state.monster.stats.hitpoints

		const m1 = this.calcs.maxHit
		const m2 = this.calcs.maxHitSpec

		const dist = Array(m2 + 1).fill(0)

		const zeroChance =  0.25 * (m2 + 1) / m2 + 0.75 * (m1 + 1) / m1
		
		//populate hit distribution lookup table
		for(let h1 = 1; h1 <= m1; h1 += 1){
			dist[h1] += 0.75 / m1
		} 

		for(let h2 = 1; h2 <= m2; h2 += 1){
			dist[h2] += 0.25 / m2
		}

		console.log(dist)
		//calc overhit dps for hp = 0, hp = 1, ..., hp = hp
		for (let i = 1; i <= hp; i += 1){
			let sum = 0
			for(let hit = 1; hit <= m2; hit += 1){
				sum += this.getStep(i - hit) * dist[hit]
			}
			this.generalMemory[i] = sum + 1 / (1 - 0.75/(m1+1) - 0.25/(m2+1))
		}

		console.log(this.generalMemory)

		return this.getStep(hp)
	}
}