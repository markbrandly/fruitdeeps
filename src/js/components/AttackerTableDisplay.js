import React, { Component } from 'react';
import {BonusRow} from './BonusRow.js';

const BonusSelectRow = (props) => {
	let customBonus = props.player.customBonuses[props.bonusIndex]
	let asterisk = null
	if(customBonus !== 0){
		asterisk = <span class={customBonus < 0 ? "color-2" : "color-3"} title="Custom additive modifier active">*</span>
	}

	let colorClass = "color-grey"
	if(props.player.bonuses[props.bonusIndex] > 0){
		colorClass = "color-3"
	}
	else if(props.player.bonuses[props.bonusIndex] < 0){
		colorClass = "color-2"
	}

	let percent = <pre class="hidden"> %</pre>
	if("percent" in props && props.percent){
		percent = <pre> %</pre>
	}

	return (
		<tr>
			<td class='single-line'>{props.bonusName}{asterisk}</td>
			<td class={colorClass}>
				<span class="stat-wrap">
					<input type="number" onChange={props.onChange} value={props.player.bonuses[props.bonusIndex]} data-bonus={props.bonusIndex} 
					class="input-invisible align-right" />{percent}
				</span>
			</td>
		</tr>
	)
}

export class AttackerTableDisplay extends Component {
	constructor(props){
		super(props)
		this.handleSetBonus = this.handleSetBonus.bind(this)
	}

	handleSetBonus(e){
		e.persist()
		console.log(e.target.value)
		this.props.setBonusCustom(parseInt(e.target.getAttribute('data-bonus')), parseInt(e.target.value))
	}

	render(){
		var player = this.props.player
		let customSum = 0
		for(let i = 0; i < this.props.player.customBonuses.length; i++){
			customSum += Math.abs(this.props.player.customBonuses[i])
		}

		let clearButton = null
		if(customSum > 0){
			clearButton = (
				<div>
					<button onClick={this.props.clearBonusCustom}>Clear custom bonuses</button>
				</div>
			)
		}


		return (
			<div class='flex-child flex-container-vertical'>
				<div>
					<h3>Attack bonus</h3>
					<table class='bonus-table'>
						<BonusSelectRow onChange={this.handleSetBonus} bonusName="Stab" bonusIndex="0" player={player} />
						<BonusSelectRow onChange={this.handleSetBonus} bonusName="Slash" bonusIndex="1" player={player} />
						<BonusSelectRow onChange={this.handleSetBonus} bonusName="Crush" bonusIndex="2" player={player} />
						<BonusSelectRow onChange={this.handleSetBonus} bonusName="Magic" bonusIndex="3" player={player} />
						<BonusSelectRow onChange={this.handleSetBonus} bonusName="Range" bonusIndex="4" player={player} />
					</table>
				</div>
				<div>
					<h3>Other bonuses</h3>
					<table class='bonus-table'>
						<BonusSelectRow onChange={this.handleSetBonus} bonusName="Melee Strength" bonusIndex="10" player={player} />
						<BonusSelectRow onChange={this.handleSetBonus} bonusName="Ranged Strength" bonusIndex="11" player={player} />
						<BonusSelectRow onChange={this.handleSetBonus} bonusName="Magic Damage" bonusIndex="12" player={player} percent={true} />
						<BonusSelectRow onChange={this.handleSetBonus} bonusName="Prayer" bonusIndex="13" player={player} />
					</table>
				</div>
				{clearButton}

				<div>
					<h3>Weapon</h3>
					<table class="bonus-table">
					{(
						player.equipment.weapon.name ? (
							<tr>
								<td>Name:</td>
								<td class="color-grey">{player.equipment.weapon.name}</td>
							</tr>
						)
						: ""

					)}

					<tr>
						<td>Category:</td>
						<td class="color-grey">{player.equipment.weapon.category}</td>
					</tr>
					<tr>
						<td>Speed:</td>
						<td class='color-grey'>{player.equipment.weapon.speed}</td>
					</tr>
					</table>
				</div>
			</div>

		)
	}
}