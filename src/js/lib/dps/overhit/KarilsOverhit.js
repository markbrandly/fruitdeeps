import {Overhit} from "./Overhit.js";

export class KarilsOverhit extends Overhit{
	algorithm(){
		const hp = this.state.monster.stats.hitpoints

		const m1 = this.calcs.maxHit

		const dist = Array(Math.floor(m1 * 1.5) + 1).fill(0)

		//populate hit distribution lookup table
		for(let h1 = 0; h1 <= m1; h1 += 1){
			dist[h1] += 0.75
			dist[Math.floor(h1 * 1.5)] += 0.25
		}

		//calc overhit dps for hp = 0, hp = 1, ..., hp = hp
		for (let i = 1; i <= hp; i += 1){
			let sum = 0
			for(let hit = 1; hit <= Math.floor(m1 * 1.5); hit += 1){
				sum += this.getStep(i - hit) * dist[hit]
			}
			this.generalMemory[i] = (sum + m1 + 1) / m1
		}

		return this.getStep(hp)
	}
}