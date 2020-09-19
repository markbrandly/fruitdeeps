import {Flags} from "./Flags.js";


class Dps{
	constructor(stateObj){
		this.state = stateObj
		this.calcs = {
			vertex: null,
			flags: [],
			maxHit: 0,
			accuracy: 0,
			acc1plus: 0,
			dps: 0,
			overhitDps: 0
		}
		this.setVertex();
		this.setFlags();
		this.setMaxHit();
	}

	setVertex(){
		if(this.state.player.spell != null){
			this.calcs.vertex = "Magic";
		}
		else{
			this.calcs.vertex = this.state.player.equipment.weapon.category.styles[this.state.player.attackStyle]
		}
	}

	setFlags(){
		flags = new Flags();
		flags.setFlags(this.calcs, this.state)
	}

	setMaxHit(calcs){

	}

	output(){
		
	}
}