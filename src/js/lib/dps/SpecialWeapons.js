
export class SpecialWeapons{
	constructor(state, calcs){
		this.state = state
		this.calcs = calcs
	}

	keris(){

		var dps = this.calcs
		const speed = dps.attackSpeed
		dps.baseMax = dps.maxHit
		dps.maxHit = Math.floor(dps.maxHit * 4 / 3)
		dps.maxHitSpec = dps.baseMax * 3

		
		const avgHit = (dps.maxHit / 2 * 50/51) + (1/51 * dps.baseMax * 3 / 2)
		dps.dps = dps.rawAcc * avgHit / speed / 0.6


		dps.acc1plus = dps.rawAcc * (50/51 * dps.maxHit / (dps.maxHit + 1)) + (1/51 * dps.baseMax / (dps.baseMax + 1))
		return dps
	}

	scythe(){
		var dps = this.calcs
		const speed = dps.attackSpeed
		dps.maxHit1 = dps.maxHit
		dps.maxHit2 = Math.floor(0.5 * dps.maxHit)
		dps.maxHit3 = Math.floor(0.25 * dps.maxHit)

		dps.maxHit = dps.maxHit1 + dps.maxHit2 + dps.maxHit3

		dps.dps1 = dps.dps //lol
		dps.dps2 = dps.accuracy * dps.maxHit2 / speed / 2 / 0.6
		dps.dps3 = dps.accuracy * dps.maxHit3 / speed / 2 / 0.6

		dps.dps = dps.dps1 + dps.dps2 + dps.dps3

		dps.accSum = dps.accuracy
		dps.accSum = dps.accSum + (1 - dps.accSum) * dps.accSum
		dps.accSum = dps.accSum + (1 - dps.accSum) * dps.accSum

		dps.acc1plus = dps.accuracy * dps.maxHit1 / (dps.maxHit1 + 1)
		dps.acc1plus = dps.acc1plus + (1 - dps.acc1plus) * dps.accuracy * dps.maxHit2 / (dps.maxHit2 + 1)
		dps.acc1plus = dps.acc1plus + (1 - dps.acc1plus) * dps.accuracy * dps.maxHit3 / (dps.maxHit3 + 1)

		return dps
	}

	veracs(){
		const specChance = 0.25
		const speed = dps.attackSpeed
		var dps = this.calcs
		dps.maxHitSpec = dps.maxHit + 1
		
		dps.rawAcc = dps.accuracy
		dps.accuracy = specChance + (1-specChance) * dps.accuracy
		dps.specAcc = dps.accuracy
		dps.dps = specChance * (1 + dps.maxHit / 2) / (0.6 * speed) + (1-specChance) * dps.dps;
		dps.acc1plus = specChance + (1 - specChance) * dps.acc1plus

		return dps
	}

	karils(){
		var dps = this.calcs

		dps.maxHit1 = dps.maxHit
		dps.maxHit2 = Math.floor(dps.maxHit / 2)
		dps.maxHit = dps.maxHit + dps.maxHit2

		const roundingMargin = Math.ceil(dps.maxHit1 / 2) / (8 * dps.maxHit1 + 8)

		//Karils set effect (25% chance of 50% extra damage) increases damage ouput by approximately 1/8
        //By adding the 9/16 coefficient we account for this increase in damage
        //The rounding margin corrects for when hits odd hits are floored
		dps.dps = dps.accuracy * (9 * dps.maxHit1 / 16 - roundingMargin) / (0.6 * dps.attackSpeed)

		return dps
	}

	ahrims(){
		
		var dps = this.calcs
		const speed = dps.attackSpeed
		dps.maxHitSpec = Math.floor(dps.maxHit * 13 / 10)
		dps.dps = dps.accuracy * (0.25 * dps.maxHitSpec + 0.75 * dps.maxHit) / 2 / speed / 0.6
		dps.acc1plus = 0.25 * dps.maxHitSpec * dps.accuracy / (dps.maxHitSpec + 1) + 0.75 * dps.acc1plus

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
		const specDps = (dps.maxHit / 2 + boost) / (0.6 * dps.attackSpeed)

		//max hit of the spec
		dps.maxHitSpec = dps.maxHit + boost

		dps.boost = boost
		dps.specChance = specChance
		dps.rawAcc = dps.accuracy

		//Accuracy when taking spec into account
		dps.accuracy = specChance + (1 - specChance) * dps.accuracy
		dps.specAcc = dps.accuracy

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

		dps.specChance = specChance
		dps.maxHitSpec = specDmg

		dps.rawAcc = dps.accuracy
		dps.accuracy2 = specChance + (1-specChance) * dps.accuracy
		dps.specAcc = dps.accuracy2

		dps.dps = specChance * specDmg / (0.6 * dps.attackSpeed) + (1 - specChance) * dps.dps
		
		dps.acc1plus = specChance * (specDmg ? 1 : 0) + (1 - specChance) * dps.acc1plus

		return dps
	}

	diamondBolts(){
		const dps = this.calcs
		const specChance = this.calcs.flags.includes("Kandarin hard diary") ? 0.11 : 0.10

		dps.specChance = specChance
		dps.maxHitSpec = Math.floor(dps.maxHit * 23 / 20)

		dps.dps = specChance * dps.maxHitSpec / (1.2 * dps.attackSpeed) + (1 - specChance) * dps.dps

		dps.rawAcc = dps.accuracy
		dps.accuracy = specChance + (1 - specChance) * dps.accuracy
		dps.specAcc = dps.accuracy

		dps.acc1plus = specChance * dps.maxHitSpec / (dps.maxHitSpec + 1) + (1-specChance) * dps.acc1plus

		return dps
	}

	onyxBolts(){
		const dps = this.calcs
		const specChance = this.calcs.flags.includes("Kandarin hard diary") ? 0.121 : 0.11

		dps.specChance = specChance
		dps.maxHitSpec = Math.floor(dps.maxHit * 6 / 5)

		const avgHit = (dps.maxHitSpec * specChance + dps.maxHit * (1 - specChance)) / 2

		dps.dps = dps.accuracy * avgHit / (0.6 * dps.attackSpeed)

		dps.acc1plus = dps.accuracy * (dps.maxHitSpec * specChance / (dps.maxHitSpec + 1) + dps.maxHit * (1-specChance) / (dps.maxHit + 1))

		return dps
	}

	darkBow(){
		const dps = this.calcs
		dps.maxHit1 = dps.maxHit
		dps.maxHit2 = dps.maxHit
		dps.maxHit = 2 * dps.maxHit
		dps.dps = dps.dps * 2
		dps.acc1plus = dps.acc1plus * (1 - dps.acc1plus) + dps.acc1plus

		return dps
	}
}