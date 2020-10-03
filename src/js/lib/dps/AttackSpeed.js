


export class AttackSpeed{
	constructor(state, calcs){
		this.state = state
		this.vertex = calcs.vertex
		this.flags = calcs.flags
	}

	output(){
		const player = this.state.player
		const attackStyle = player.equipment.weapon.category.styles[player.attackStyle].attackStyle
		const attackType = player.equipment.weapon.category.styles[player.attackStyle].type
		const weaponSpeed = player.equipment.weapon.category.speed


		if(this.flags.includes("Spell")){
			return 5
		}

		if(attackType == "Rapid"){
			return weaponSpeed - 1
		}

		return weaponSpeed

	}
}