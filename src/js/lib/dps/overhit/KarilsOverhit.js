import {Overhit} from "./Overhit.js";

export class KarilsOverhit extends Overhit{
	timeToKill(hp){

		const m1 = this.calcs.maxHit1

		const dist = Array(Math.floor(m1 * 1.5) + 1).fill(0)
		const accuracy = this.calcs.rawAcc
		const speed = this.calcs.attackSpeed

		if(typeof this.generalMemory[hp-1] === 'undefined'){
			this.fillMemory(hp)
		}

		//populate hit distribution lookup table
		for(let h1 = 0; h1 <= m1; h1 += 1){
			dist[h1] += 0.75
			dist[Math.floor(h1 * 1.5)] += 0.25
		}

		//calc overhit dps for hp = 0, hp = 1, ..., hp = hp
		let sum = 0
		for(let hit = 1; hit <= Math.floor(m1 * 1.5); hit += 1){
			sum += this.getStep(hp - hit) * dist[hit]
		}
		const ttk = (sum + m1 + speed) / m1 / accuracy
		this.generalMemory[hp] = ttk
		return ttk
	}
}