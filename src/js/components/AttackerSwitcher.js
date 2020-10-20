import React, { Component } from 'react';
import {connect} from 'react-redux';
import {AttackerTableDisplay} from './AttackerTableDisplay.js';
import {AttackerTabs} from './AttackerTabs.js';
import {AttackerMisc} from './AttackerMisc.js'
import {AttackerAttackStyles} from './AttackerAttackStyles.js';

import Player from '../lib/Player.js';

class Attacker extends Component {

	render() {
		const player = new Player(this.props.player)


		return (
			
		);
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
		equipItem: (i) => {
			return (item) => dispatch({type: "PLAYER_EQUIP_ITEM", item: item})
		},

		unequipItem: (i) => {
			return (slot) => dispatch({type: "PLAYER_UNEQUIP_ITEM", slot: slot})
		},

		setStat: (i) => {
			return (stat, level) => dispatch({type: "PLAYER_SET_STAT", stat: stat, level: level})
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
		},

		setMisc: (attribute, value) => {
			dispatch({type: "PLAYER_SET_MISC", attribute: attribute, value: value})
		},

		setAttackStyle: (i) => {
			dispatch({type: "PLAYER_SET_ATTACKSTYLE", value: i})
		},

		setBonusCustom: (bonusIndex, value) => {
			dispatch({type:"PLAYER_SET_BONUS", bonusIndex:bonusIndex, value:value})
		},

		clearBonusCustom: () => {
			dispatch({type:"PLAYER_CLEAR_CUSTOM_BONUSES"})
		},

		setPlayer: (player) => {
			dispatch({type:"SET_PLAYER", player:player})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Attacker)