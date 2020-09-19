//Flags.js is responsible for determining if various special effects are active for the player
//It takes in the state and outputs a list of effects

//potential flags: black mask, black mask i, salve, salve ei, salve i, salve e, 
//void melee, void ranged, void made, elite void ranged, elite void magic
//arclight, leaf-blade battleaxe, dragon hunter lance, viggora's chainmace, obsidian armor,
//dhcb, craws, twisted bow,


const salvList = ["Salve amulet", "Salve amulet (e)", "Salve amulet(i)", "Salve amulet(ei)"]

export class Flags{
	constructor(state){
		this.state = state;
	}

	salveBlackMask(){
		const neck = this.state.player.equipment.neck.name
		const head = this.state.player.equipment.head.name
		const weaknesses = this.state.monster.weakness

		if(salvList.includes(neck) || weaknesses.includes("Salve amulet")){
			return neck
		}
		else if(head.includes("Black mask") || head.toLowerCase().includes("slayer helmet")){
			if(head.includes("(i)")){
				return "Black mask (i)"
			}
			else{
				return "Black mask"
			}
		}
		return null
	}

	void(){
		const head = this.state.player.equipment.head.name
		const hands = this.state.player.equipment.hands.name
		const body = this.state.player.equipment.body.name
		const legs = this.state.player.equipent.legs.name

		const elite = (body.includes("Elite") && legs.includes("Elite"))

		//Check each slot and return null if it's not void
		["head", "hands", "body", "legs"].forEach((slot) => {
			if(!this.state.player.equipment[slot].name.includes("void")){
				return null
			}
		})

		if(head == "Void melee helm"){
			return "Void melee"
		}
		else if(head == "Void ranger helm" && elite){
			return "Elite void range"
		}
		else if(head == "Void mage helm" && elite){
			return "Elite void mage"
		}
		else if(head == "Void ranger helm"){
			return "Void range"
		}
		else if(head == "Void mage helm"){
			return "Void mage"
		}
		return null
	}

	weapon(){
		const weapon = this.state.player.equipment.weapon.name
		const weaknesses = this.state.monster.weakness

		switch(weapon){
			case "Arclight":
				return weapon
		}

	}

	outputFlags(){
		state = this.state
		const equipment = state.player.equipment
		var flags = []

		//[...(x || [])] will push to an array conditionally only if x is truthy.
		//In other words, the return value of this.salveBlackMask() will be pushed to flags only if it is truthy
		flags = [
			...(this.salveBlackMask() || []),
			...(this.void() || [])
		]



	}
}