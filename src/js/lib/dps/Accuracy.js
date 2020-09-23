
export class Accuracy{
	constructor(stateObj, calcs){
		this.vertex = calcs.vertex;
		this.flags = calcs.flags;
		this.state = stateObj
	}

	generalFormula(a, b){
		return a * (b + 64)
	}

	compareRolls(atk, def){
		if(atk > def){
			return 1 - (def + 2) / (2 * (atk + 1))
		}
		else{
			return atk / (2 * (def + 1))
		}
	}

	melee(){

	}

	ranged(){

	}

	magic(){

	}

	output(){
		if(this.vertex == "Melee"){
			return this.melee()
		}
		else if(this.vertex == "Ranged"){
			console.log('ranged')
			return this.ranged()
		}
		else if(this.vertex == "Magic"){
			return this.magic()
		}
		else {return 0}
	}
}