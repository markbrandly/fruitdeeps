import React, { Component } from 'react';
import {BonusRow} from './BonusRow.js';

export class AttackerTableDisplay extends Component {
	constructor(props){
		super(props)
	}

	render(){
		var player = this.props.player
		return (
			<div class='flex-child flex-container-vertical'>
				<div>
					<h3>Attack bonus</h3>
					<table class='bonus-table'>
						<BonusRow bonusName="Stab" bonusValue={player.bonuses[0]} />
						<BonusRow bonusName="Slash" bonusValue={player.bonuses[1]} />
						<BonusRow bonusName="Crush" bonusValue={player.bonuses[2]} />
						<BonusRow bonusName="Magic" bonusValue={player.bonuses[3]} />
						<BonusRow bonusName="Range" bonusValue={player.bonuses[4]} />
					</table>
				</div>
				<div>
					<h3>Other bonuses</h3>
					<table class='bonus-table'>
						<BonusRow bonusName="Melee Strength" bonusValue={player.bonuses[10]} />
						<BonusRow bonusName="Ranged Strength" bonusValue={player.bonuses[11]} />
						<BonusRow bonusName="Magic Damage" bonusValue={player.bonuses[12]} percent={true} />
						<BonusRow bonusName="Prayer" bonusValue={player.bonuses[13]} />
					</table>
				</div>
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