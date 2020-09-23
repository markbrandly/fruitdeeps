//Flags.js is responsible for determining if various special effects are active for the player
//It takes in the state and outputs a list of effects
//This way, all the queries on a player are in one place

//potential flags: black mask, black mask i, salve, salve ei, salve i, salve e, 
//void melee, void ranged, void made, elite void ranged, elite void magic
//arclight, leaf-blade battleaxe, dragon hunter lance, viggora's chainmace, obsidian armor,
//dhcb, craws, twisted bow,


import {SpellBook} from "../SpellBook.js";

const salvList = ["Salve amulet", "Salve amulet (e)", "Salve amulet(i)", "Salve amulet(ei)"]

const obbyMelee = ['Toktz-xil-ak', 'Tzhaar-ket-em', 'Tzhaar-ket-om', 'Tzhaar-ket-om (t)', 'Toktz-xil-ek']

export class Flags{
	constructor(state = {}){
		this.state = state;
	}

	salveBlackMask(){
		const neck = this.state.player.equipment.neck.name
		const head = this.state.player.equipment.head.name
		const attributes = this.state.monster.attributes
		if(salvList.includes(neck) && attributes.includes("Salve amulet")){
			return [neck]
		}
		else if(head.includes("Black mask") || head.toLowerCase().includes("slayer helmet")){
			if(head.includes("(i)")){
				return ["Black mask (i)"]
			}
			else{
				return ["Black mask"]
			}
		}
		return null
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
			return null
		}

		if(head == "Void melee helm"){
			return ["Void melee"]
		}
		else if(head == "Void ranger helm" && elite){
			return ["Elite void range"]
		}
		else if(head == "Void mage helm" && elite){
			return ["Elite void mage"]
		}
		else if(head == "Void ranger helm"){
			return ["Void range"]
		}
		else if(head == "Void mage helm"){
			return ["Void mage"]
		}
		return null
	}

	weapon(){
		const weapon = this.state.player.equipment.weapon.name
		const attributes = this.state.monster.attributes

		switch(weapon){
			case "Arclight":
				return (attributes.includes('demon') ? [weapon] : null)
			case "Leaf-bladed battleaxe":
				return (attributes.includes('leafy') ? [weapon] : null)
			case "Dragon Hunter Lance":
				return (attributes.includes('dragon') ? [weapon] : null)
			case "Viggora's chainmace":
				return [weapon]
			case "Dragon hunter crossbow":
				return (attributes.includes('dragon') ? [weapon] : null)
			case "Craw's bow":
				return [weapon]
			case "Twisted bow":
				return [weapon]
			case "Keris":
				return (attributes.includes('kalphite') ? [weapon] : null)
			return null
		}

	}

	obsidian(){
		const weapon = this.state.player.equipment.weapon.name;
		const neck = this.state.player.equipment.neck.name

		const body = this.state.player.equipment.body.name
		const legs = this.state.player.equipment.legs.name
		const head = this.state.player.equipment.head.name

		var flaglist = []
		if(!obbyMelee.includes(weapon)){
			return null
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


		const spell = this.state.player.spell
		const charge = this.state.player.charge
		const weapon = this.state.player.equipment.weapon.name;
		const shield = this.state.player.equipment.shield.name;
		const hands = this.state.player.equipment.hands.name;
		const attributes = this.state.monster.attributes
		var flags = []

		switch(spell){
			case "Crumble Undead":
				attributes.includes("undead") ? flags.push(spell) : null;
				break;
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
				if(shield == "Tome of fire" && spell.includes("Fire")){
					flags.push(shield)
				}
				if(weapon == "Smoke battlestaff" && stdSpells.includes(spell)){
					flags.push(weapon)
				}
				break;
		}

		//return null if flags is empty, else return flags
		return (flags.length > 0 ? flags : null)
	}

	outputFlags(){
		var state = this.state
		const equipment = state.player.equipment
		var flags = []

		//[...(x || [])] will push to an array conditionally only if x is truthy.
		//In other words, the return value of this.salveBlackMask() will be pushed to flags only if it is truthy
		//Therefore, every method returns a list of flags and then they are consolidated into a single list
		flags = [
			...(this.salveBlackMask() || []),
			...(this.void() || []),
			...(this.weapon() || []),
			...(this.obsidian() || []),
			...(this.magicStuff() || [])
		]

		return flags

	}
}