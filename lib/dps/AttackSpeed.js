export class AttackSpeed {
    constructor(state, calcs) {
        this.state = state
        this.vertex = calcs.vertex
        this.flags = calcs.flags
    }

    output() {
        const player = this.state.player
        const attackStyle = player.attackStyle.style
        let weaponSpeed = player.equipment.weapon.speed
        const vertex = this.vertex
        if (player.misc.manualSpeed > 0) {
            return player.misc.manualSpeed
        }

        if (this.flags.includes("Harmonised nightmare staff")) {
            weaponSpeed = 4
        } else if (this.state.player.spell) {
            weaponSpeed = 5
        } else if (attackStyle == "Rapid") {
            weaponSpeed -= 1
        }

        let t3 = false

        t3 = t3 || (vertex == "Ranged" && this.flags.includes("Quick Shot"))
        t3 = t3 || (vertex == "Melee" && this.flags.includes("Fluid Strike"))
        t3 = t3 || (vertex == "Magic" && this.flags.includes("Double Cast"))

        if (t3) {
            weaponSpeed = weaponSpeed - Math.floor(weaponSpeed / 2)
        }

        return weaponSpeed
    }
}