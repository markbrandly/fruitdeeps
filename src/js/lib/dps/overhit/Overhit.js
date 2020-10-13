export class Overhit{
	constructor(state, calcs){
		this.state = state
		this.calcs = calcs

		this.generalMemory = [0]
	}

	getStep(i){
		if(i < 0){
			return 0
		}
		else {
			return this.generalMemory[i]
		}
	}

	algorithm(){
		const hp = this.state.monster.stats.hitpoints
		const max = this.calcs.maxHit
		const acc = this.calcs.accuracy
		const speed = this.calcs.attackSpeed

		for (let i = 1; i <= hp; i += 1){
			let sum = 0
			for(let hit = 1; hit <= max; hit += 1){
				sum += this.getStep(i - hit)
			}
			this.generalMemory[i] = (sum / max + (max+1) / (max)) 
		}

		return this.getStep(hp)	
	}

	approximate(){
		const hp = this.state.monster.stats.hitpoints
		const max = this.calcs.maxHit
		const acc = this.calcs.accuracy
		const speed = this.calcs.attackSpeed

		if(hp <= max + 1){
			return Math.pow((max + 1)/max, hp)
		}
		else {
			return 2 * hp / max + (2 * max - 2) / (3 * max)
		}
	}

	hitsToDps(hits){
		const acc = this.calcs.accuracy
		const hp = this.state.monster.stats.hitpoints
		const speed = this.calcs.attackSpeed
		return hp * acc / hits / speed / 0.6
	}

	output(){
		return this.hitsToDps(this.algorithm())
	}
}