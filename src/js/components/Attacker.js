import React, { Component } from 'react';
import {connect} from 'react-redux';
import {AttackerTableDisplay} from './AttackerTableDisplay.js';
import {AttackerTabs} from './AttackerTabs.js';

import {Player} from '../lib/Player.js';

class Attacker extends Component {

	render() {
		const player = new Player(this.props.player)


		return (
			<div class="flex-container">
				<div class="flex-child flex-container-vertical">
					<AttackerTabs 
						player={player}
						equipItem={this.props.equipItem}
						unequipItem={this.props.unequipItem}
						setStat={this.props.setStat} 
						addBoost={this.props.addBoost} 
						removeBoost={this.props.removeBoost} 
						addPrayer={this.props.addPrayer}
						removePrayer={this.props.removePrayer}
						clearPrayers={this.props.clearPrayers}
						setSpell={this.props.setSpell}
						clearSpell={this.props.clearSpell}
						toggleCharge={this.props.toggleCharge}
						/>
				</div>
			</div>
		);

				//<AttackerTableDisplay player={this.props.player} />
	}

	componentDidMount(){
		const thirdab = {"name":"3rd age bow","slot":"2h","bonuses":[0,0,0,0,80,0,0,0,0,0,0,0,0,0],"category":"Bow","speed":4}
		this.props.equipItem(thirdab)
	}
}

function mapStateToProps(state){
	return {
		player: state.player
	}
}

function mapDispatchToProps(dispatch){
	return {
		equipItem: (item) => {
			dispatch({type: "PLAYER_EQUIP_ITEM", item: item})
		},

		unequipItem: (slot) => {
			dispatch({type: "PLAYER_UNEQUIP_ITEM", slot: slot})
		},

		setStat: (stat, level) => {
			dispatch({type: "PLAYER_SET_STAT", stat: stat, level: level})
		},

		addBoost: (boost) => {
			dispatch({type: "PLAYER_ADD_BOOST", boost:boost})
		},

		removeBoost: (boost) => {
			dispatch({type: "PLAYER_REMOVE_BOOST", boost: boost})
		},

		addPrayer: (prayer) => {
			dispatch({type: "PLAYER_ADD_PRAYER", prayer: prayer})
		},

		removePrayer: (prayer) => {
			dispatch({type: "PLAYER_REMOVE_PRAYER", prayer: prayer})
		},

		clearPrayers: () => {
			dispatch({type:"PLAYER_CLEAR_PRAYERS"})
		},

		setSpell: (spell) => {
			dispatch({type: "PLAYER_SET_SPELL", spell:spell})
		},

		clearSpell: () => {
			dispatch({type: "PLAYER_CLEAR_SPELL"})
		},

		toggleCharge: () => {
			dispatch({type: "PLAYER_TOGGLE_CHARGE"})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Attacker)