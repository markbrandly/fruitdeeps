
export class SpecialWeapons{
	constructor(state, calcs){
		this.state = state
		this.calcs = calcs
	}

	keris(){
		var dps = this.calcs
		dps.maxHit = Math.floor(dps.maxHit * 1.33)
		dps.maxHit2 = dps.maxHit * 3

		dps.dps = dps.accuracy * dps.maxHit / 4.8 * (3 / 51)
		dps.acc1plus = dps.accuracy * dps.maxHit / (dps.maxHit + 1)
		return dps
	}

	scythe(){
		var dps = this.calcs
		dps.maxHit1 = dps.maxHit
		dps.maxHit2 = Math.floor(0.5 * dps.maxHit)
		dps.maxHit3 = Math.floor(0.25 * dps.maxHit)

		dps.dps1 = dps.dps //lol
		dps.dps2 = dps.accuracy * dps.maxHit2 / 6
		dps.dps3 = dps.accuracy * dps.maxHit3 / 6

		dps.dps = dps.dps1 + dps.dps2 + dps.dps3

		dps.accSum = dps.acc
		dps.accSum = dps.accSum + (1 - dps.accSum) * dps.accSum
		dps.accSum = dps.accSum + (1 - dps.accSum) * dps.accSum

		dps.acc1plus = dps.acc * dps.maxHit1 / (dps.maxHit1 + 1)
		dps.acc1plus = dps.acc1plus + (1 - dps.acc1plus) * dps.accSum * dps.maxHit2 / (dps.maxHit2 + 1)
		dps.acc1plus = dps.acc1plus + (1 - dps.acc1plus) * dps.accSum * dps.maxHit3 / (dps.maxHit3 + 1)

		return dps
	}

	veracs(){
		const specChance = 0.25
		var dps = this.calcs
		dps.maxHit2 = dps.maxHit + 1
		dps.accuracy2 = specChance + (1-specChance) * dps.accuracy
		dps.dps = specChance * (1 + dps.maxHit / 2) / (0.6 * dps.attackSpeed) + (1-specChance) * dps.dps;
		dps.acc1plus = specChance + (1 - specChance) * dps.acc1plus

		return dps
	}

	karils(){
		var dps = this.calcs

		dps.maxHit2 = Math.floor(dps.maxHit / 2)
		dps.maxHitSum = dps.maxHit + dps.maxHit2

		const roundingMargin = Math.ceil(dps.maxHit / 2) / (8 * dps.maxHit + 8)

		//Karils set effect (25% chance of 50% extra damage) increases damage ouput by approximately 1/8
        //By adding the 9/16 coefficient we account for this increase in damage
        //The rounding margin corrects for when hits odd hits are floored
		dps.dps = dps.accuracy * (9 * dps.maxHit / 16 - roundingMargin) / (0.6 * dps.attackSpeed)

		return dps
	}

	ahrims(){
		var dps = this.calcs

		dps.maxHit2 = Math.floor(dps.maxHit * 13 / 10)
		dps.dps = dps.accuracy * (0.25 * dps.maxHit2 + 0.75 * dps.maxHit) / 6
		dps.acc1plus = 0.25 * dps.maxHit2 * dps.accuracy / (dps.maxHit2 + 1) + 0.75 * dps.acc1plus

		return dps
	}

	generalBolt(bolt){
		const ranged = this.state.player.boostedStats.ranged
		const boostTable = {
			"Enchanted pearl bolts": Math.floor(ranged / 20),
			"Enchanted opal bolts": Math.floor(ranged/ 10),
			"Enchanted jade bolts": 0,
			"Enchanted pearl bolts fiery": Math.floor(ranged / 15),
			"Enchanted dragonstone bolts": Math.floor(ranged / 20)
		}

		const dps = this.calcs
		const boost = boostTable[bolt]
		var specChance = (bolt == "Enchanted opal bolts" ? 0.05 : 0.06)
		specChance = this.calcs.flags.includes("Kandarin hard diary") ? specChance * 11 / 10 : specChance

		//spec dps = average hit / attack speed / 0.6
		const specDps = ((dps.dps / 2) + boost) / (0.6 * dps.attackSpeed)

		//max hit of the spec
		dps.maxHit2 = dps.maxHit + boost

		//Accuracy when taking spec into account
		console.log("specchange", specChance, 1-specChance)
		dps.accuracy2 = specChance + (1 - specChance) * dps.accuracy

		//dps when taking spec into account
		dps.dps = specChance * specDps + (1 - specChance) * dps.dps

		//Chance to hit > 0 when taking spec into account
		dps.acc1plus = specChance * (boost ? 1 : dps.maxHit / (dps.maxHit + 1)) + (1-specChance) * dps.acc1plus

		return dps
	}

	rubyBolts(){
		const dps = this.calcs
		const hp = this.state.monster.stats.hitpoints
		const specDmg = Math.min(100, Math.floor(hp / 5))
		const specChance = this.calcs.flags.includes("Kandarin hard diary") ? 0.066 : 0.06

		dps.maxHit2 = specDmg
		dps.dps = specChance * specDmg / (0.6 * dps.attackSpeed) + (1 - specChance) * dps.dps
		dps.accuracy2 = specChance + (1-specChance) * dps.accuracy
		dps.acc1plus = specChance * (specDmg ? 1 : 0) + (1 - specChance) * dps.acc1plus

		return dps
	}

	diamondBolts(){
		const dps = this.calcs
		const specChance = this.calcs.flags.includes("Kandarin hard diary") ? 0.11 : 0.10

		dps.maxHit2 = Math.floor(dps.maxHit * 23 / 20)

		dps.dps = specChance * dps.maxHit2 / (1.2 * dps.attackSpeed) + (1 - specChance) * dps.dps

		dps.accuracy2 = specChance + (1 - specChance) * dps.accuracy

		dps.acc1plus = specChance * dps.maxHit2 / (dps.maxHit2 + 1) + (1-specChance) * dps.acc1plus

		return dps
	}

	onyxBolts(){
		const dps = this.calcs
		const specChance = this.calcs.flags.includes("Kandarin hard diary") ? 0.121 : 0.11

		dps.maxHit2 = Math.floor(dps.maxHit * 6 / 5)

		const avgHit = (dps.maxHit2 * specChance + dps.maxHit * (1 - specChance)) / 4

		dps.dps = dps.accuracy * avgHit / (0.6 * dps.attackSpeed)

		dps.acc1plus = dps.accuracy * (dps.maxHit2 * specChance / (dps.maxHit2 + 1) + dps.maxHit * (1-specChance) / (dps.maxHit + 1))

		return dps
	}
}