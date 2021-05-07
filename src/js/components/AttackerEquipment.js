import React, { Component } from 'react';
import { EquipmentSelect } from './EquipmentSelect.js'

class LoadoutCell extends Component {
    constructor(props) {
        super(props)
    }

    unequipItem(slot) {
        let player = this.props.player
        player.unequip(slot)
        this.props.setPlayer(player.minimize())
    }

    render() {
        var img = ""
        if (this.props.player.equipment[this.props.slotname].name) {
            img = (
                <img 
					class='item-icon' 
					src={'./assets/item_images/'+ this.props.player.equipment[this.props.slotname].name + '.png'}
					onClick={()=> {this.unequipItem(this.props.slotname)}}
				/>
            )
        }
        return (
            <div class='loadout-cell'>
				{img}
			</div>
        )
    }
}

export class AttackerEquipment extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const player = this.props.player


        return (
            <div class='highlight-section flex-container-vertical'>
				<div class="loadout-container">
					<div class='loadout-row'>
						<LoadoutCell slotname="head" player={player} setPlayer={this.props.setPlayer} />
					</div>
					<div class='loadout-row'>
						<LoadoutCell slotname="cape" player={player} setPlayer={this.props.setPlayer} />
						<LoadoutCell slotname="neck" player={player} setPlayer={this.props.setPlayer} />
						<LoadoutCell slotname="ammo" player={player} setPlayer={this.props.setPlayer} />
					</div>
					<div class='loadout-row'>
						<LoadoutCell slotname="weapon" player={player} setPlayer={this.props.setPlayer} />
						<LoadoutCell slotname="body" player={player} setPlayer={this.props.setPlayer} />
						<LoadoutCell slotname="shield" player={player} setPlayer={this.props.setPlayer} />
					</div>
					<div class='loadout-row'>
						<LoadoutCell slotname="legs" player={player} setPlayer={this.props.setPlayer} />
					</div>
					<div class='loadout-row'>
						<LoadoutCell slotname="hands" player={player} setPlayer={this.props.setPlayer} />
						<LoadoutCell slotname="feet" player={player} setPlayer={this.props.setPlayer} />
						<LoadoutCell slotname="ring" player={player} setPlayer={this.props.setPlayer} />
					</div>
				</div>
				<EquipmentSelect player={player} setPlayer={this.props.setPlayer} />
			</div>
        )

    }
}