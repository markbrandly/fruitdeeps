import React, { Component } from 'react';
import {connect} from 'react-redux';
import {AttackerTableDisplay} from './AttackerTableDisplay.js';
import {AttackerTabs} from './AttackerTabs.js';

class Attacker extends Component {
	render() {
		console.log(this.props.player)

		var boosts = ""
		this.props.player.boostList.forEach((boost) => {
			boosts = boosts + boost + ", "
		});
		boosts = boosts.slice(0, -2);

		var prayers = ""
		this.props.player.prayers.forEach((prayer) => {
			prayers = prayers + prayer + ", "
		});
		prayers = prayers.slice(0, -2);


		return (
			<div class="flex-container">
				<div class="flex-child flex-container-vertical">
					<AttackerTabs 
						player={this.props.player}
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
					{(this.props.player.boostList.length ? (<div>Active Boosts: {boosts}</div>) : "")} 
					{(this.props.player.prayers.length ? (<div>Active Prayers: {prayers}</div>) : "")}
					{(this.props.player.spell) ? <div>Active Spell: {this.props.player.spell}</div> : ""}
				</div>
				<AttackerTableDisplay player={this.props.player} />
			</div>
		);
	}

	componentDidMount(){
		const thirdab = {
			name:"3rd age bow",
			id:1923,
			slot:"2h",
			bonuses:[0,0,0,0,80,0,0,0,0,0,0,0,0,0],
			icon:"3rd_age_bow_detail.png",
			category: {
				name:"bow",
				speed:4,
				styles: [
					{"combatStyle":"Accurate","type":"Ranged","attackStyle":"Accurate"},
					{"combatStyle":"Rapid","type":"Ranged","attackStyle":"Rapid"},
					{"combatStyle":"Longrange","type":"Ranged","attackStyle":"Longrange"}
				]
			}
		}
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