import {Overhit} from "./Overhit.js";

export class KerisOverhit extends Overhit{
	algorithm(){
		const hp = this.state.monster.stats.hitpoints
		const m1 = this.calcs.maxHit

		//number of possible outcomes of a hit

		const dist = Array(m1 * 3 + 1).fill(0) // [0, 0, 0, ... , 0].length == msum+1

		//populate hit distribution lookup table
		for(let h1 = 0; h1 <= m1; h1 += 1){
			dist[h1] += 50/51
			dist[h1 * 3] += 1/51
		}

		//calc overhit dps for hp = 0, hp = 1, ..., hp = hp
		for (let i = 1; i <= hp; i += 1){
			let sum = 0
			for(let hit = 1; hit <= m1 * 3; hit += 1){
				sum += this.getStep(i - hit) * dist[hit]
			}
			this.generalMemory[i] = (sum + m1 + 1) / m1
		}

		console.log("keris!!!!!")
		return this.getStep(hp)
	}
}