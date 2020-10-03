import {PrayerBook} from '../PrayerBook.js';
import {SpellBook} from '../SpellBook.js';

//MaxHit calculates a player's max hit from player and monster state
//Notes:
//	Melee and ranged max hit codes are very redundant
//	Can definitely generalize them a lot. Not sure if that will improve or diminish readability, however
//	I think that this should be done, eventually.

const weaponMultiplier = {
	"Arclight": 1.7,
	"Leaf-bladed battleaxe": 1.175,
	"Dragon Hunter Lance": 1.2,
	"Viggora's chainmace": 1.5,
	"Dragon hunter crossbow": 1.3,
	"Craw's bow": 1.5,
	"Obsidian armor": 1.1
}


export class MaxHit{
	constructor(state, calcs){
		this.state = state
		this.flags = calcs.flags
		this.vertex = calcs.vertex
		console.log('this.vertex', this.vertex)
		var prayerBook = new PrayerBook()
		this.prayerModifiers = prayerBook.getModifiers(this.state.player.prayers)
	}

	generalFormula(a, b){
		return Math.floor(0.5 + a * (b + 64) / 640)
	}

	//These methods are really long, but in general since it's really procedural it's readable
	melee(){
		const player = this.state.player
		const attackStyle = player.equipment.weapon.category.styles[player.attackStyle].attackStyle
		const strBonus = player.bonuses[10] //str bonus

		//Start with visible stats
		var effectiveStr = player.boostedStats.strength

		//apply prayer bonus
		effectiveStr = Math.floor(effectiveStr * this.prayerModifiers.strength)

		//add attack style bonus
		if(attackStyle == "Controlled"){
			effectiveStr += 1;
		}
		else if(attackStyle == "Aggressive"){
			effectiveStr += 3;
		}
		effectiveStr += 8;

		//apply void melee bonus
		if(this.flags.includes("Void melee")){
			effectiveStr = Math.floor(effectiveStr * 1.10)
		}

		//Calc max hit
		var maxHit = this.generalFormula(effectiveStr, strBonus)

		//apply black mask/salve bonus
		if(this.flags.includes("Salve amulet (e)") || this.flags.includes("Salve amulet(ei)")){
			maxHit = Math.floor(maxHit * 6 / 5)
		}
		else if(this.flags.includes("Salve amulet") || this.flags.includes("Salve amulet(i)")){
			maxHit = Math.floor(maxHit * 7 / 6)
		}
		//Redundant, but separate from salve amulet for readability. The minimizer fixes this in production
		else if(this.flags.includes("Black mask") || this.flags.includes("Black mask (i)")){
			maxHit = Math.floor(maxHit * 7 / 6) 
		}

		//apply weapon special effect bonuses
		Object.keys(weaponMultiplier).forEach((key) => {
			if(this.flags.includes(key)){
				maxHit = Math.floor(maxHit * weaponMultiplier[key])
			}
		})

		return maxHit

	}

	ranged(){
		const player = this.state.player
		const attackStyle = player.equipment.weapon.category.styles[player.attackStyle].attackStyle
		const strBonus = player.bonuses[11] //ranged strength
		const monster = this.state.monster

		//Start with visible stats
		var effectiveStr = player.boostedStats.ranged

		//apply prayer bonus
		effectiveStr = Math.floor(effectiveStr * this.prayerModifiers.rangedStr)

		//add attack style bonus
		if(attackStyle == "Accurate"){
			effectiveStr += 3;
		}
		effectiveStr += 8;

		//apply void ranged bonus and void elite ranged bonus
		if(this.flags.includes("Elite void range")){
			effectiveStr = Math.floor(effectiveStr * 9 / 8)
		}
		else if(this.flags.includes("Void range")){
			effectiveStr = Math.floor(effectiveStr * 11 / 10)
		}

		//Calc max hit
		var maxHit = this.generalFormula(effectiveStr, strBonus)

		//apply black mask/salve bonus
		if(this.flags.includes("Salve amulet(ei)")){
			maxHit = Math.floor(maxHit * 6 / 5)
		}
		else if(this.flags.includes("Salve amulet(i)")){
			maxHit = Math.floor(maxHit * 23 / 20)
		}
		//Redundant, but separate from salve amulet for readability. The minimizer fixes this in production
		else if(this.flags.includes("Black mask (i)")){
			maxHit = Math.floor(maxHit * 23 / 20) 
		}

		//tbow
		if(this.flags.includes("Twisted bow")){
			const magic = Math.max(monster.stats.mage, monster.stats.mbns)
			const tbowMod = 250 + Math.floor((3*magic-14)/100) - Math.floor(Math.pow(3*magic/10 - 140, 2) / 100)
			maxHit = Math.floor(maxHit * Math.min(tbowMod, 250) / 100) //should be 350 for cox
		}

		//apply weapon special effect bonuses
		Object.keys(weaponMultiplier).forEach((key) => {
			if(this.flags.includes(key)){
				maxHit = Math.floor(maxHit * weaponMultiplier[key])
			}
		})
		console.log('maxhit', maxHit)
		return maxHit
	}

	magic(){
		var spellBook = new SpellBook();
		const spell = this.state.player.spell
		var magic = this.state.player.boostedStats.magic
		var dmgBonus = this.state.player.bonuses[12]

		var maxHit = 0
		if(spell && spell !== "Slayer Dart"){
			maxHit = spellBook.maxLookup(spell)
		}
		//I do not like listing all of these individually like this.
		else if(spell == "Slayer Dart"){
			maxHit = Math.floor(magic/10) + 10
		}
		else if(this.flags.includes("Trident of the seas")){
			maxHit = Math.floor(magic/3) - 5
		}
		else if(this.flags.includes("Trident of the swamp")){
			maxHit = Math.floor(magic/3) - 2
		}
		else if(this.flags.includes("Sanguinesti staff")){
			maxHit = Math.floor(magic/3) - 1
		}
		else if(this.flags.includes("Black salamander")){
			maxHit = this.generalFormula(magic, 92)
		}
		else if(this.flags.includes("Red salamander")){
			maxHit = this.generalFormula(magic, 77)
		}
		else if(this.flags.includes("Orange salamander")){
			maxHit = this.generalFormula(magic, 59)
		}
		else if(this.flags.includes("Swamp lizard")){
			maxHit = this.generalFormula(magic, 56)
		}

		//static max hit additives
		if(this.flags.includes("Charge")){
			maxHit += 10
		}
		else if(this.flags.includes("Chaos gauntlets")){
			maxHit += 3
		}

		//dmg bonus additives
		if(this.flags.includes("Smoke battlestaff")){
			dmgBonus += 10
		}
		if(this.flags.includes("Elite void magic")){
			dmgBonus += 2.5
		}
		if(this.flags.includes("Salve amulet(ei)")){
			dmgBonus += 20
		}
		else if(this.flags.includes("Salve amulet(i)")){
			dmgBonus += 15
		}

		maxHit = Math.floor(maxHit * (100 + dmgBonus) / 100)

		if(this.flags.includes("Black mask (i)")){
			maxHit = Math.floor(maxHit * 23 / 20)
		}

		if(this.flags.includes("Tome of fire")){
			maxHit = Math.floor(maxHit * 3 / 2)
		}

		return maxHit
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