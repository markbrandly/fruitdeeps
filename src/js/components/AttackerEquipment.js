import React, { Component } from 'react';
import {EquipmentSelect} from './EquipmentSelect.js'

class LoadoutCell extends Component{
	constructor(props){
		super(props)
	}

	render(){
		var img = ""
		if (this.props.player.equipment[this.props.slotname].name){
			img = (
				<img 
					class='item-icon' 
					src={'./assets/item_images/'+ this.props.player.equipment[this.props.slotname].name + '.png'}
					onClick={()=> {this.props.unequipItem(this.props.slotname)}}
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

export class AttackerEquipment extends Component{
	constructor(props){
		super(props)
	}

	render(){
		const player = this.props.player


		return(
			<div class='highlight-section flex-container-vertical'>
				<div class="loadout-container">
					<div class='loadout-row'>
						<LoadoutCell slotname="head" player={player} unequipItem={this.props.unequipItem} />
					</div>
					<div class='loadout-row'>
						<LoadoutCell slotname="cape" player={player} unequipItem={this.props.unequipItem} />
						<LoadoutCell slotname="neck" player={player} unequipItem={this.props.unequipItem} />
						<LoadoutCell slotname="ammo" player={player} unequipItem={this.props.unequipItem} />
					</div>
					<div class='loadout-row'>
						<LoadoutCell slotname="weapon" player={player} unequipItem={this.props.unequipItem} />
						<LoadoutCell slotname="body" player={player} unequipItem={this.props.unequipItem} />
						<LoadoutCell slotname="shield" player={player} unequipItem={this.props.unequipItem} />
					</div>
					<div class='loadout-row'>
						<LoadoutCell slotname="legs" player={player} unequipItem={this.props.unequipItem} />
					</div>
					<div class='loadout-row'>
						<LoadoutCell slotname="hands" player={player} unequipItem={this.props.unequipItem} />
						<LoadoutCell slotname="feet" player={player} unequipItem={this.props.unequipItem} />
						<LoadoutCell slotname="ring" player={player} unequipItem={this.props.unequipItem} />
					</div>
				</div>
				<EquipmentSelect equipItem={this.props.equipItem} />
			</div>
		)
		
	}
}