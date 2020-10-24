import {Overhit} from "./Overhit.js";

export class OnyxBoltsOverhit extends Overhit{
	timeToKill(hp){
		const m1 = this.calcs.maxHit
		const m2 = this.calcs.maxHitSpec

		const accuracy = this.calcs.rawAcc
		const speed = this.calcs.attackSpeed

		const specChance = this.calcs.specChance
		let zeroChance = specChance / (m2 + 1) + (1 - specChance) / (m1 + 1)
		//number of possible outcomes of a hit

		const dist = Array(m2 + 1).fill(0) // [0, 0, 0, ... , 0].length == msum+1

		if(typeof this.generalMemory[hp-1] === 'undefined'){
			this.fillMemory(hp)
		}

		//populate hit distribution lookup table
		for(let h1 = 0; h1 <= m1; h1 += 1){
			dist[h1] += (1 - specChance) / m1
		}

		for(let h2 = 0; h2 <= m2; h2++){
			dist[h2] += specChance / m2
		}

		console.log(dist)

		let sum = 0
		for(let hit = 1; hit <= m2; hit += 1){
			sum += this.getStep(hp - hit) * dist[hit]
		}
		const ttk = sum + speed / (1 - zeroChance) / accuracy
		this.generalMemory[hp] = ttk
		return ttk
	}
}