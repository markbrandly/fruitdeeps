


export class AttackSpeed{
	constructor(state, calcs){
		this.state = state
		this.vertex = calcs.vertex
		this.flags = calcs.flags
	}

	output(){
		const player = this.state.player
		const attackStyle = player.attackStyle.style
		const weaponSpeed = player.equipment.weapon.speed


		if(this.flags.includes("Harmonised nightmare staff")){
			return 4
		}

		if(this.state.player.spell){
			return 5
		}

		if(attackStyle == "Rapid"){
			return weaponSpeed - 1
		}

		return weaponSpeed
	}
}