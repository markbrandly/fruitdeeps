import {Flags} from "./Flags.js";
import {MaxHit} from "./MaxHit.js";
import {Accuracy} from "./Accuracy.js";
import {AttackSpeed} from "./AttackSpeed.js";
import {SpecialWeapons} from "./SpecialWeapons.js";
import Player from "../Player.js";

import {Overhit} from "./overhit/Overhit.js";

export class Dps{
	constructor(stateObj){
		this.state = {
			...stateObj,
			player: new Player(stateObj.player)
		}
		console.log(this.state.player)
		this.calcs = {
			vertex: "Melee",
			flags: [],
			maxHit: 0,
			accuracy: 0,
			attackSpeed: 1,
			dps: 0,
			acc1plus: 0,
			overhit1: 0,
			overhit2: 0
		}
		this.setVertex();
		this.setFlags();
		this.setMaxHit();
		this.setAccuracy();
		this.setAttackSpeed();
		this.setDps();
		this.setAccOverOne();
		this.applySpecials();
		this.overhit()
	}

	setVertex(){
		const type = this.state.player.attackStyle.type

		if(this.state.player.spell != null || type == "Magic"){
			this.calcs.vertex = "Magic";
		}
		else if(type == "Ranged"){
			this.calcs.vertex = "Ranged"
		}
		else{
			this.calcs.vertex = "Melee"
		}
	}

	setFlags(){
		var flags = new Flags(this.state, this.calcs);
		this.calcs.flags = flags.outputFlags()
	}

	setMaxHit(){
		var max = new MaxHit(this.state, this.calcs)
		this.calcs.maxHit = max.output()
	}

	setAccuracy(){
		var acc = new Accuracy(this.state, this.calcs)
		this.calcs.accuracy = acc.output()
		this.calcs.rawAcc = this.calcs.accuracy
	}

	setAttackSpeed(){
		var speed = new AttackSpeed(this.state, this.calcs)
		this.calcs.attackSpeed = speed.output()
	}

	setDps(){
		const acc = this.calcs.accuracy
		const max = this.calcs.maxHit
		const speed = this.calcs.attackSpeed

		//Lol formula: acc * (max/2) / 0.6 / speed
		this.calcs.dps = acc * max / (1.2 * speed)
	}

	setAccOverOne(){
		this.calcs.acc1plus = this.calcs.accuracy * this.calcs.maxHit / (this.calcs.maxHit + 1)
	}

	applySpecials(){
		const someBolts = [
			"Enchanted pearl bolts",
			"Enchanted opal bolts",
			"Enchanted jade bolts",
			"Enchanted pearl bolts fiery",
			"Enchanted dragonstone bolts"
		]
		const specs = new SpecialWeapons(this.state, this.calcs)
		if(this.calcs.flags.includes("Scythe of vitur")){
			this.calcs = specs.scythe()
		}
		else if(this.calcs.flags.includes("Enchanted diamond bolts")){
			this.calcs = specs.diamondBolts()
		}
		else if(this.calcs.flags.includes("Enchanted ruby bolts")){
			this.calcs = specs.rubyBolts()
		}
		else if(this.calcs.flags.includes("Enchanted onyx bolts")){
			this.calcs = specs.onyxBolts()
		}
		else if(this.calcs.flags.includes("Keris")){
			this.calcs = specs.keris()
		}
		else if(this.calcs.flags.includes("Verac's set")){
			this.calcs = specs.veracs()
		}
		else if(this.calcs.flags.includes("Karil's set")){
			this.calcs = specs.karils()
		}
		else if (this.calcs.flags.includes("Ahrim's set")){
			this.calcs = specs.ahrims()
		}
		else if(this.calcs.flags.includes("Dark bow")){
			this.calcs = specs.darkBow()
		}
		
		someBolts.forEach((bolt) => {
			if(this.calcs.flags.includes(bolt)){
				this.calcs = specs.generalBolt(bolt)
			}
		})
	}

	overhit(){
		const overhit = new Overhit(this.state, this.calcs)
		this.calcs.approxOverhit = overhit.approximate()
	}

	output(){
		console.log(this.calcs)
		return this.calcs
	}
}