const tbow = {
	max: 89,
	speed: 5
}

const blowpipe = {
	max: 33,
	speed: 2
}

const maxHp  = 300
const switchHp = 50

class Overhit{
	constructor(switchHp){
		this.switchHp = switchHp
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
		for(let i = 1; i <= maxHp; i++){
			let sum = 0
			let weapon = i <= this.switchHp ? blowpipe : tbow
			for(let hit = 1; hit <= weapon.max; hit++){
				sum += this.getStep(i - hit)
			}
			this.generalMemory[i] = sum  / weapon.max + (weapon.max+1) * weapon.speed / (weapon.max)
		}
		// console.log(this.generalMemory)
		return this.generalMemory
	}
}

let tbowTime = new Overhit(0).algorithm()
let blowpTime = new Overhit(300).algorithm()

for (var i = tbowTime.length - 1; i > 0; i--) {
	console.log(i, (i / tbowTime[i] - i / blowpTime[i]) * blowpTime[i])
}