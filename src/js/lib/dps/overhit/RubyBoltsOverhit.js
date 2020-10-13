import {Overhit} from "./Overhit.js";

export class RubyBoltsOverhit extends Overhit{
	algorithm(){
		const hp = this.state.monster.stats.hitpoints

		const m1 = this.calcs.maxHit

		const specChance = this.calcs.specChance
		const accuracy = this.calcs.rawAcc

		const dist = Array(m1 + 1).fill(0)
		let hitSum = 0

		//populate hit distribution lookup table
		for(let h1 = 1; h1 <= m1; h1 += 1){
			dist[h1] += (1 - specChance) * accuracy / (m1 + 1)
			hitSum += dist[h1]
		}

		hitSum += specChance

		for (let i = 1; i <= hp; i++){
			let sum = 0
			let spec = Math.min(100, Math.floor(i / 5))
			for(let hit = 1; hit <= m1; hit += 1){
				sum += this.getStep(i - hit) * dist[hit]
			}

			// console.log(spec)
			if(spec === 0){
				this.generalMemory[i] = (sum + 1) / (hitSum - specChance)
			}
			else{
				this.generalMemory[i] = (this.getStep(i-spec) * specChance + sum + 1) / (hitSum)
			}
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