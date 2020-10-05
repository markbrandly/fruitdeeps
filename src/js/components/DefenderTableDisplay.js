import React, { Component } from 'react';
import {BonusRow} from './BonusRow.js';


export class DefenderTableDisplay extends Component {
	render(){
		return (
			<div class='flex-container-vertical'>
				<div>
					<h3>Stats</h3>
					<table class='stats-table'>
						<tr>
							<td>
								<div class='stat-wrap'>
									<img src="https://oldschool.runescape.wiki/images/8/8f/Combat_icon.png?93d63" />
									{this.props.monster.combat}
								</div>
							</td>
							<td>
								<div class='stat-wrap'>
									<img src="https://oldschool.runescape.wiki/images/9/96/Hitpoints_icon.png?a4819" />
									{this.props.monster.stats.hitpoints}
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<div class='stat-wrap'>
									<img src="https://oldschool.runescape.wiki/images/b/b7/Defence_icon.png?ca0cd" />
									{this.props.monster.stats.def}
								</div>
							</td>
							<td>
								<div class='stat-wrap'>
									<img src="https://oldschool.runescape.wiki/images/5/5c/Magic_icon.png?334cf" />
									{this.props.monster.stats.mage}
								</div>
							</td>
						</tr>
					</table>
				</div>
				<div>
					<h3>Attack Bonus</h3>
					<table class="bonus-table">
						<BonusRow bonusName="Magic" bonusValue={this.props.monster.stats.amagic} />
					</table>
				</div>
				<div>
					<h3>Defence bonus</h3>
					<table class='bonus-table'>
						<BonusRow bonusName="Stab" bonusValue={this.props.monster.stats.dstab} />
						<BonusRow bonusName="Slash" bonusValue={this.props.monster.stats.dslash} />
						<BonusRow bonusName="Crush" bonusValue={this.props.monster.stats.dcrush} />
						<BonusRow bonusName="Magic" bonusValue={this.props.monster.stats.dmagic} />
						<BonusRow bonusName="Range" bonusValue={this.props.monster.stats.drange} />
					</table>
				</div>
			</div>
		)
	}
}