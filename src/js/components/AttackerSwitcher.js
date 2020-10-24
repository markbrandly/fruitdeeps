import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Attacker} from './Attacker.js';

import Player from '../lib/Player.js';

class AttackerSwitcherInner extends Component {
	constructor(props){
		super(props)
		this.state = {playerSelected: 0}
	}

	buttons(){
		return this.props.playerList.map((player, i) => <button onClick={() => this.setState({playerSelected: i})}>Set {i + 1}</button>)
	}

	render(){
		let i = this.state.playerSelected
		const player = new Player(this.props.playerList[i])
		console.log("atacker switcher playadasder:", player)
		console.log("atacker switcher rendering !!!!!!!!")



		return (
			<div class="flex-container-vertical">
				<div class="flex-container-vertical">
					<h2 class="flex-valign">
						<img src="/assets/other_icons/attack_icon.png" />
						<span class="space-left">Set {i+1}</span>
					</h2>

					<Attacker
						player={player}

						equipItem={this.props.equipItem(i)}
						unequipItem={this.props.unequipItem(i)}
						setStat={this.props.setStat(i)}
						addBoost={this.props.addBoost(i)}
						removeBoost={this.props.removeBoost(i)}
						addPrayer={this.props.addPrayer(i)}
						removePrayer={this.props.removePrayer(i)}
						clearPrayers={this.props.clearPrayers(i)}
						setSpell={this.props.setSpell(i)}
						clearSpell={this.props.clearSpell(i)}
						toggleCharge={this.props.toggleCharge(i)}
						setMisc={this.props.setMisc(i)}
						setAttackStyle={this.props.setAttackStyle(i)}
						setBonusCustom={this.props.setBonusCustom(i)}
						clearBonusCustom={this.props.clearBonusCustom(i)}
						setPlayer={this.props.setPlayer(i)}
					/>
				</div>
				<div class='highlight-section'>
					{this.buttons()}
					{this.props.playerList.length < 4 ? <button onClick={this.props.addPlayer}>Add set</button> : null}
				</div>
			</div>
		);
	}
}

class AttackerSwitcher extends Component {
	render() {
		return (
			<AttackerSwitcherInner
				playerList = {this.props.playerList}

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
				setMisc={this.props.setMisc}
				setAttackStyle={this.props.setAttackStyle}
				setBonusCustom={this.props.setBonusCustom}
				clearBonusCustom={this.props.clearBonusCustom}
				setPlayer={this.props.setPlayer}

				addPlayer={this.props.addPlayer}
			/>
		)
	}
}

function mapStateToProps(state){
	return {
		playerList: state.playerList
	}
}

function mapDispatchToProps(dispatch){
	return {
		equipItem: (i) => {
			return (item) => dispatch({type: "PLAYER_EQUIP_ITEM", item: item, index: i})
		},

		unequipItem: (i) => {
			return (slot) => dispatch({type: "PLAYER_UNEQUIP_ITEM", slot: slot, index: i})
		},

		setStat: (i) => {
			return (stat, level) => dispatch({type: "PLAYER_SET_STAT", stat: stat, level: level, index: i})
		},

		addBoost: (i) => {
			return (boost) => dispatch({type: "PLAYER_ADD_BOOST", boost:boost, index: i})
		},

		removeBoost: (i) => {
			return(boost) => dispatch({type: "PLAYER_REMOVE_BOOST", boost: boost, index: i})
		},

		addPrayer: (i) => {
			return(prayer) => dispatch({type: "PLAYER_ADD_PRAYER", prayer: prayer, index: i})
		},

		removePrayer: (i) => {
			return (prayer) => dispatch({type: "PLAYER_REMOVE_PRAYER", prayer: prayer, index: i})
		},

		clearPrayers: (i) => {
			return () => dispatch({type:"PLAYER_CLEAR_PRAYERS", index: i})
		},

		setSpell: (i) => {
			return (spell) => dispatch({type: "PLAYER_SET_SPELL", spell:spell, index: i})
		},

		clearSpell: (i) => {
			return () => dispatch({type: "PLAYER_CLEAR_SPELL", index: i})
		},

		toggleCharge: (i) => {
			return () => dispatch({type: "PLAYER_TOGGLE_CHARGE", index: i})
		},

		setMisc: (i) => {
			return (attribute, value) => dispatch({type: "PLAYER_SET_MISC", attribute: attribute, value: value, index: i})
		},

		setAttackStyle: (i) => {
			return (style) => dispatch({type: "PLAYER_SET_ATTACKSTYLE", value: style, index: i})
		},

		setBonusCustom: (i) => {
			return (bonusIndex, value) => dispatch({type:"PLAYER_SET_BONUS", bonusIndex:bonusIndex, value:value, index: i})
		},

		clearBonusCustom: (i) => {
			return () => dispatch({type:"PLAYER_CLEAR_CUSTOM_BONUSES", index: i})
		},

		setPlayer: (i) => {
			return (player) => dispatch({type:"SET_PLAYER", player:player, index: i})
		},

		addPlayer: () => {
			dispatch({type:"ADD_NEW_PLAYER"})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AttackerSwitcher)