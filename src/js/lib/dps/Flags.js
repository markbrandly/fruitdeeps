//Flags.js is responsible for determining if various special effects are active for the player
//It takes in the state and outputs a list of effects
//This way, all the queries on a player are in one place

//potential flags: black mask, black mask i, salve, salve ei, salve i, salve e, 
//void melee, void ranged, void made, elite void ranged, elite void magic
//arclight, leaf-blade battleaxe, dragon hunter lance, viggora's chainmace, obsidian armor,
//dhcb, craws, twisted bow,

const flagDescriptions = {
	"Salve amulet" : "The Salve amulet gives a 16.7% damage bonus when meleeing undead monsters",
	"Salve amulet (e)" : "The Salve amulet gives a 20% damage bonus when meleeing undead monsters",
	"Salve amulet(i)" : "The Salve amulet gives a 16.7% damage bonus when meleeing undead monsters and a 15% damage bonus when maging or ranging",
	"Salve amulet(ei)" : "The Salve amulet gives a 20% damage bonus when attacking undead monsters",
	"Void melee" : "The Void melee set gives a 10% damage and accuracy bonus when meleeing monsters",
	"Void range" : "The Void range set gives a 10% damage and accuracy bonus when ranging monsters",
	"Void mage" : "The Void mage set gives a 45% accuracy bonus when maging monsters",
	"Elite void range" : "The Elite void range set gives a 12.5% damage and 10% accuracy bonus when ranging monsters",
	"Elite void mage" : "The Elite void mage set gives a 2.5% damage and 45% accuracy bonus when maging monsters",
	"Black mask" : "The Slayer helmet and Black mask give a 16.7% damage and accuracy bonus when meleeing monsters ",
	"Black mask (i)" : "The Slayer helmet (i) and Black mask (i) give a 16.7% damage and accuracy bonus when meleeing monsters and a 15% damage and accuracy bonus when ranging or maging",
	
	"Arclight" : "The Arclight gives a 70% damage and accuracy bonus against demons",
	"Leaf-bladed battleaxe" : "The Lead-bladed battleaxe gives a 17.5% damage bonus against kurasks and turoths",
	"Keris" : "The Keris gives a 33% damage bonus against kalphites and scabarites, and offers a 1/51 chance to deal triple damage",
	"Twisted bow" : "The Twisted bow gives a damage and accuracy bonus dependent on the opponent's magic or magic accuracy",
	"Scythe of vitur" : "The Scythe of vitur offers two extra hits of 50% and 25% of the standard max hit",
	"Berserker necklace" : "The Berserker necklace increases the max hit of obsidian melee weapons by 20%",
	"Obsidian armour" : "The Obsidian armour set gives a 10% damage and accuracy boost to melee obsidian weaponry",
	"Dragon hunter crossbow" : "The Dragon hunter crossbow gives a 30% damage and accuracy boost when attacking dragons and dragon-kind",
	"Craw's bow" : "The Craw's bow gives a 50% damage and accuracy boost when attacking a monster in the wilderness",
	"Viggora's chainmace" : "The Viggora's chainmace gives a 50% damage and accuracy boos when attacking a monster in the wilderness",
	"Thammaron's sceptre" : "Thammaron's sceptre gives a 100% accuracy bonus and 20% damage bonus when casting spells in the wilderness",
	"Dragon hunter lance" : "The Dragon hunter lance gives a 20% damage and accuracy boost when attacking dragons and dragon-kind",
	"Dark bow": "The Dark bow shoots two arrows at once",

	"Blisterwood flail" : "Blisterwood flail gives a 25% damage and 5% accuracy bonus against vampyres",
	"Blisterwood sickle" : "Blisterwood sickle gives a 15% damage and 5% accuracy bonus against vampyres",
	"Ivandis flail" : "Ivandis flail gives a 20% damage bonus against vampyres",

	"Smoke battlestaff" : "The Smoke battlestaff gives a 10% damage and accuracy boost when casting spells from the standard spellbook",
	"Tome of fire" : "The Tome of fire gives a 50% damage boost when casting fire elemental spells",
	"Chaos gauntlets" : "The Chaos gauntlets add 3 to the max hits of bolt spells",
	"Charge" : "The Charge spell adds 10 to the max hits of god spells",
	"Spell" : "Spells typically have predefined max hits and attack speeds of 5",

	"Trident of the seas" : "The Trident of the seas has a max hit of Magic/3 - 5", 
	"Trident of the swamp" : "The Trident of the swamp has a max hit of Magic/3 - 2",
	"Sanguinesti staff" : "The Sanguinesti staff has a max hit of Magic/3 - 1",
	"Black salamander" : "When used for magic, the Black salamander has a max hit of 0.5 + Magic * 39/160",
	"Red salamander" : "When used for magic, the Red salamander has a max hit of 0.5 + Magic * 141/640",
	"Orange Salamander" : "When used for magic, the Orange salamander has a max hit of 0.5 + Magic * 123/64",
	"Swamp Lizard" : "When used for magic, the Swamp lizard has a max hit of 0.5 + Magic * 3/16",


	"Enchanted opal bolts" : "Enchanted opal bolts have a 5% chance of guaranteeing a hit and dealing an extra [visible ranged level / 10] damage",
	"Enchanted pearl bolts" : "Enchanted pearl bolts have a 6% chance of guaranteeing a hit and dealing an extra [visible ranged level / 20] damage",
	"Enchanted pearl bolts fiery" : "Enchanted pearl bolts have a 6% chance of guaranteeing a hit and dealing an extra [visible ranged level / 15] damage against fiery monsters",
	"Enchanted ruby bolts" : "Enchanted ruby bolts have a 6% chance of guaranteeing a hit and hitting a monster for 20% of its current hp, capped at 100 damage",
	"Enchanted diamond bolts" : "Enchanted diamond bolts have a 10% chance of guaranteeing a hit and increasing max hit by 15%",
	"Enchanted dragonstone bolts" : "Enchanted dragonstone bolts have a 6% chance of guaranteeing a hit and doing an extra [visible ranged level / 20] damage",
	"Enchanted onyx bolts" : "Enchanted onyx bolts have an 11% chance to deal an extra 20% damage to monsters who are not undead",

	"Kandarin hard diary": "If a player has completed the Kandarin hard diary, enchanted bolts special effect proc chance is increased by a factor of 10%",

	"Ahrim's set": "Ahrim's set has a 25% chance of increasing max hit by 30%",
	"Karil's set": "Karil's set has a 25% chance of doing an extra 50% damage (rounded down) while the Amulet of the damned is equipped",
	"Dharok's set": "Dharok's set gives around a 1% damage bonus for each hitpoint lost",
	"Verac's set": "Verac's set has a 25% chance of skipping the accuracy roll and doing 1 extra damage",

	"Inquisitor's armour set": "Inquisitor's armour set increases crush accuracy and damage by 2.5%",

	"Harmonised nightmare staff": "Harmonised nightmare staff casts standard spells at an attack speed of 4 ticks",

	"Inquisitor's hauberk": "Inquisitor's hauberk increases crush accuracy and damage by 0.5%",
	"Inquisitor's great helm": "Inquisitor's great helm increases crush accuracy and damage by 0.5%",
	"Inquisitor's plateskirt": "Inquisitor's plateskirt increases crush accuracy and damage by 0.5%",

	"Crystal helm": "Crystal helm gives a 3% damage and 6% accuracy bonus when using the Crystal bow",
	"Crystal legs": "Crystal legs gives a 3% damage and 6% accuracy bonus when using the Crystal bow",
	"Crystal body": "Crystal body gives a 3% damage and 6% accuracy bonus when using hte Crystal bow",
	"Crystal armour set": "Crystal armour set gives a 15% damage and 30% accuracy bonus when using the Crystal bow",

	"Slayer dart" : ""

}


import {SpellBook} from "../SpellBook.js";

const salvList = ["Salve amulet", "Salve amulet (e)", "Salve amulet(i)", "Salve amulet(ei)"]

const obbyMelee = ['Toktz-xil-ak', 'Tzhaar-ket-em', 'Tzhaar-ket-om', 'Tzhaar-ket-om (t)', 'Toktz-xil-ek']

export class Flags{
	constructor(state = {}, calcs = {}){
		this.state = state;
		this.calcs = calcs
	}

	salveBlackMask(){
		const neck = this.state.player.equipment.neck.name
		const head = this.state.player.equipment.head.name
		const attributes = this.state.monster.attributes

		if(attributes.includes("undead") && salvList.includes(neck)){
			if(neck == "Salve amulet(i)" || neck == "Salve amulet(ei)" || this.calcs.vertex == "melee"){
				return [neck]
			}
		}

		if(this.state.player.misc.onTask && (head.includes("Black mask") || head.toLowerCase().includes("slayer helmet"))){
			if(head.includes("(i)")){
				return ["Black mask (i)"]
			}
			else if(this.calcs.vertex == "Melee"){
				return ["Black mask"]
			}
		}
		return []
	}

	void(){
		const head = this.state.player.equipment.head.name
		const hands = this.state.player.equipment.hands.name
		const body = this.state.player.equipment.body.name
		const legs = this.state.player.equipment.legs.name
		const slots =["head", "hands", "body", "legs"]

		const elite = (body.includes("Elite") && legs.includes("Elite"))

		//Check each slot and return null if it's not void
		//I named the variable dumb bc this code is dumb
		var dumb = false
		slots.forEach((slot) => {
			if(!this.state.player.equipment[slot].name.toLowerCase().includes("void")){
				dumb = true
			}
		})
		if(dumb){
			//early return if not wearing void
			return []
		}

		if(head.includes("Void melee helm")){
			return ["Void melee"]
		}
		else if(head.includes("Void ranger helm") && elite && this.calcs.vertex == "Ranged"){
			return ["Elite void range"]
		}
		else if(head.includes("Void mage helm") && elite){
			return ["Elite void mage"]
		}
		else if(head.includes("Void ranger helm") && this.calcs.vertex == "Ranged"){
			return ["Void range"]
		}
		else if(head.includes("Void mage helm")){
			return ["Void mage"]
		}
		return []
	}

	weapon(){
		const weapon = this.state.player.equipment.weapon.name
		const player = this.state.player

		const attributes = this.state.monster.attributes
		const vampyre = (attributes.includes("vampyre1") || attributes.includes("vampyre2") || attributes.includes("vampyre3"))

		if(weapon.includes("Craw's bow") && player.misc.wilderness){
			return ["Craw's bow"]
		}

		if(weapon.includes("Viggora's chainmace") && player.misc.wilderness){
			return ["Viggora's chainmace"]
		}

		if(weapon.includes("Dark bow")){
			return ["Dark bow"]
		}

		if(weapon == "Thammaron's sceptre (Charged)"){
			return player.spell && player.misc.wilderness ? ["Thammaron's sceptre"] : []
		}

		if(weapon.includes("Scythe of vitur")){
			return ["Scythe of vitur"]
		}

		if(weapon.includes("Keris")){
			return attributes.includes('kalphite') ? ["Keris"] : []
		}

		switch(weapon){
			case "Arclight":
				return (attributes.includes('demon') ? [weapon] : [])
			case "Leaf-bladed battleaxe":
				return (attributes.includes('leafy') ? [weapon] : [])
			case "Dragon hunter lance":
			case "Dragon hunter crossbow":
				return (attributes.includes('dragon') ? [weapon] : [])
			case "Blisterwood flail":
			case "Blisterwood sickle":
			case "Ivandis flail":
				return vampyre ? [weapon] : []
			case "Twisted bow":
				return [weapon]
		}
		return []
	}

	obsidian(){
		const weapon = this.state.player.equipment.weapon.name;
		const neck = this.state.player.equipment.neck.name

		const body = this.state.player.equipment.body.name
		const legs = this.state.player.equipment.legs.name
		const head = this.state.player.equipment.head.name

		var flaglist = []
		if(!obbyMelee.includes(weapon)){
			return []
		}

		if(neck == "Berserker necklace" || neck == "Berserker necklace (or)"){
			flaglist.push("Berserker necklace")
		}

		if(head == "Obsidian platebody" && legs == "Obsidian platelegs" && head == "Obsidian helmet"){
			flaglist.push("Obsidian armour")
		}

		return flaglist

	}

	magicStuff(){
		const specialWeapons = ["Trident of the seas", "Trident of the swamp", 'Sanguinesti staff', 'Black salamander', "Red salamander", "Orange Salamander", "Swamp Lizard"]
		const godSpells = ['Saradomin Strike','Flames of Zamorak','Claws of Guthix']
		const stdSpells = new SpellBook().getSpellList().standard

		const spellBook = new SpellBook();

		const spell = this.state.player.spell
		const charge = this.state.player.charge
		const weapon = this.state.player.equipment.weapon.name;
		const shield = this.state.player.equipment.shield.name;
		const hands = this.state.player.equipment.hands.name;
		const attributes = this.state.monster.attributes
		var flags = []



		// console.log('standard', spellBook.getSpellList().standard)

		if(spellBook.getSpellList().standard.includes(spell) && weapon == "Harmonised nightmare staff"){
			flags.push("Harmonised nightmare staff")
		}
		if(spell){
			flags.push("Spell")
		}

		switch(spell){
			case "Slayer Dart":
				flags.push(spell)
				break;
			case null:
				if(specialWeapons.includes(weapon)){
					flags.push(weapon)
				}
				break;
			default:
				if(charge && godSpells.includes(spell)){
					flags.push('Charge')
				}
				if(hands == "Chaos gauntlets" && spell.includes("Bolt")){
					flags.push(hands)
				}
				if(shield == "Tome of fire (charged)" && spell.includes("Fire")){
					flags.push("Tome of fire")
				}
				if(weapon == "Smoke battlestaff" && stdSpells.includes(spell)){
					flags.push(weapon)
				}
				break;
		}

		return flags
	}

	enchantedBolts(){
		const player = this.state.player
		const monster = this.state.monster
		const category = player.equipment.weapon.category
		const ammo = player.equipment.ammo.name
		const fiery = this.state.monster.attributes.includes("fiery")
		const dragon = monster.attributes.includes("dragon")
		const undead = monster.attributes.includes("undead")

		const flags = []
		// console.log('category', category)
		if(player.spell || category != "Crossbow"){
			return flags
		}

		switch(ammo){
			case "Opal bolts (e)":
			case "Opal dragon bolts (e)":
				flags.push("Enchanted opal bolts")
				break;
			case "Jade bolts (e)":
			case "Jade dragon bolts (e)":
				flags.push("Enchanted Jade bolts")
				break;
			case "Pearl bolts (e)":
			case "Pearl dragon bolts (e)":
				flags.push(fiery ? "Enchanted pearl bolts fiery" : "Enchanted pearl bolts")
				break;
			case "Ruby bolts (e)":
			case "Ruby dragon bolts (e)":
				flags.push("Enchanted ruby bolts")
				break;
			case "Diamond bolts (e)":
			case "Diamond dragon bolts (e)":
				flags.push("Enchanted diamond bolts")
				break;
			case "Dragonstone bolts (e)":
			case "Dragonstone dragon bolts (e)":
				dragon ? flags.push("Enchanted dragonstone bolts") : null
				break;
			case "Onyx bolts (e)":
			case "Onyx dragon bolts (e)":
				undead ? flags.push("Enchanted onyx bolts") : null
				break;
		}

		if(flags.length > 0 && player.misc.kandarinHard){
			flags.push("Kandarin hard diary")
		}

		return flags
	}

	barrows(){
		const player = this.state.player
		const body = player.equipment.body.name
		const legs = player.equipment.legs.name
		const weapon = player.equipment.weapon.name
		const head = player.equipment.head.name
		const neck = player.equipment.neck.name
		const ammo = player.equipment.ammo.name

		const loadOut = [body, legs, weapon, head]

		var dharoks = (this.calcs.vertex == "Melee")
		loadOut.forEach((slot)=>{
			if(!slot.includes("Dharok's")){
				dharoks = false
			}
		})

		var veracs = true
		loadOut.forEach((slot)=>{
			if(!slot.includes("Verac's")){
				veracs = false
			}
		})


		var ahrims = (neck.includes("Amulet of the damned") && player.spell)
		loadOut.forEach((slot)=>{
			if(!slot.includes("Ahrim's")){
				ahrims = false
			}
		})


		var karils = (neck.includes("Amulet of the damned") && ammo == "Bolt rack")
		loadOut.forEach((slot)=>{
			if(!slot.includes("Karil's")){
				karils = false
			}
		})

		if(dharoks){
			return ["Dharok's set"]
		}
		if(karils){
			return ["Karil's set"]
		}
		if(ahrims){
			return ["Ahrim's set"]
		}
		if(veracs){
			return ["Verac's set"]
		}
		return []
	}

	inquisitors(){
		const player = this.state.player
		const body = player.equipment.body.name
		const head = player.equipment.head.name
		const legs = player.equipment.legs.name

		const slots = ['body', 'head', 'legs']

		const flags = []
		
		if(player.attackStyle.type !== "Crush" || player.spell){
			return flags
		}

		slots.forEach((slot) => {
			if(player.equipment[slot].name.includes("Inquisitor's")){
				flags.push(player.equipment[slot].name)
			}
		})

		if(flags.length == 3){
			return ["Inquisitor's armour set"]
		}
		else{
			return flags
		}
	}

	crystalArmor(){
		const player = this.state.player
		const weapon = player.equipment.weapon.name
		const legs = player.equipment.legs.name
		const body = player.equipment.body.name
		const head = player.equipment.head.name

		const flags = []

		if(player.spell || weapon != "Crystal bow"){
			return flags
		}

		if(body == "Crystal body (Active)"){
			flags.push("Crystal body")
		}

		if(legs == "Crystal legs (Active)"){
			flags.push("Crystal legs")
		}

		if(head == "Crystal helm (Active)"){
			flags.push("Crystal helm")
		}

		if(flags.length == 3){
			return ["Crystal armour set"]
		}
		return flags


	}

	description(flag){
		return flagDescriptions[flag]
	}

	outputFlags(){
		var state = this.state
		const equipment = state.player.equipment
		var flags = []

		// console.log('this.weapon', this.weapon())

		//Runs all the methods and consolidates their return lists
		flags = [
			...this.salveBlackMask(),
			...this.void(),
			...this.weapon(),
			...this.obsidian(),
			...this.magicStuff(),
			...this.enchantedBolts(),
			...this.barrows(),
			...this.inquisitors(),
			...this.crystalArmor()
		]

		return flags

	}
}