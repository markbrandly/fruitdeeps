import React, { Component } from 'react';
import {connect} from 'react-redux';
import {AttackerTableDisplay} from './AttackerTableDisplay.js';
import {AttackerTabs} from './AttackerTabs.js';
import {AttackerMisc} from './AttackerMisc.js'
import {AttackerAttackStyles} from './AttackerAttackStyles.js';

import Player from '../lib/Player.js';

export class Attacker extends Component {

	render() {
		const player = this.props.player
		console.log('attacker', player)
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

						setMisc={this.props.setMisc}
						setPlayer={this.props.setPlayer}

						/>
					<AttackerAttackStyles player={player} setAttackStyle={this.props.setAttackStyle}/>

				</div>
				<AttackerTableDisplay player={player} setBonusCustom={this.props.setBonusCustom} clearBonusCustom={this.props.clearBonusCustom} />

			</div>
		);
	}
}