import {Flags} from "./Flags.js";
import {MaxHit} from "./MaxHit.js";

export class Dps{
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
			this.calcs.vertex = this.state.player.equipment.weapon.category.styles[this.state.player.attackStyle].type
		}
	}

	setFlags(){
		var flags = new Flags(this.state);
		this.calcs.flags = flags.outputFlags()
	}

	setMaxHit(){
		var max = new MaxHit(this.state, this.calcs)
		this.calcs.maxHit = max.output()
		console.log(this.calcs)
	}

	output(){
		return this.calcs
	}
}