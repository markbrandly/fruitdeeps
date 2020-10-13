import {Overhit} from "./Overhit.js";

export class DarkBowOverhit extends Overhit{
	algorithm(){
		const hp = this.state.monster.stats.hitpoints

		const m1 = this.calcs.maxHit1
		const m2 = this.calcs.maxHit2

		const mSum = m1 + m2

		console.log(mSum)

		//number of possible outcomes of a hit
		const mProduct = (m1 + 1) * (m2 + 1)

		const dist = Array(mSum + 1).fill(0) // [0, 0, 0, ... , 0].length == msum+1

		//populate hit distribution lookup table
		for(let h1 = 0; h1 <= m1; h1 += 1){
			for(let h2 = 0; h2 <= m2; h2 += 1){
				dist[h1 + h2] += 1
			}
		}

		//calc overhit dps for hp = 0, hp = 1, ..., hp = hp
		for (let i = 1; i <= hp; i += 1){
			let sum = 0
			var bigSum = 0
			for(let hit = 1; hit <= mSum; hit += 1){
				sum += this.getStep(i - hit) * dist[hit]
				bigSum += dist[hit]
			}
			this.generalMemory[i] = sum / (mProduct-1) + mProduct / (mProduct - 1)
		}

		console.log("dark bow!!!!!!!!!!!!")

		return this.getStep(hp)
	}
}