import React, { Component } from 'react';
import {BonusRow} from './BonusRow.js';

const MonsterStat = (props) => {
	return (
		<input type="number" class="input-invisible border-bottom-dashed" min="1" value={props.value} data-stat={props.stat} onChange={props.onChange} />
		)
}

export class DefenderTableDisplay extends Component {
	constructor(props){
		super(props)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(e){
		e.persist()
		let stat = e.target.getAttribute("data-stat")
		let value = e.target.value
		this.props.setMonsterStat(stat, value)
	}

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
									
									<MonsterStat value={this.props.monster.stats.hitpoints} stat="hitpoints" onChange={this.handleChange} />
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<div class='stat-wrap'>
									<img src="https://oldschool.runescape.wiki/images/b/b7/Defence_icon.png?ca0cd" />
									<MonsterStat value={this.props.monster.stats.def} stat="def" onChange={this.handleChange} />
								</div>
							</td>
							<td>
								<div class='stat-wrap'>
									<img src="https://oldschool.runescape.wiki/images/5/5c/Magic_icon.png?334cf"/>
									<MonsterStat value={this.props.monster.stats.mage} stat="mage" onChange={this.handleChange} />
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