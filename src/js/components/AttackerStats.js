import React, { Component } from 'react';
import {PotionDrinker} from '../lib/PotionDrinker.js';

class StatPicker extends Component{
	constructor(props){
		super(props)
	}

	render(){
		return (
			<td>
				<div class="stat-wrap">
					<img style={{width:"1em"}} src={this.props.imgSrc} />
					<span>{this.props.player.boostedStats[this.props.stat]}/</span>
					<input class="input-invisible" type="number" min="0" max="99" value={this.props.player.stats[this.props.stat]} onChange={(e) => {this.props.setStat(this.props.stat, e.target.value)}}/>
				</div>
			</td>
		)
	}
}

class HpPicker extends Component{
	constructor(props){
		super(props)
	}

	render(){
		return (
			<td colspan="2">
				<div class="stat-wrap">
					<img style={{width:"1em"}} src={this.props.imgSrc} />
					<input class="input-invisible" type="number" min="0" max="99" value={this.props.player.misc.currentHitpoints} onChange={(e) => {this.props.setMisc('currentHitpoints', e.target.value)}} />
					<pre> / </pre>
					<input class="input-invisible" type="number" min="10" max="99" value={this.props.player.stats.hitpoints} onChange={(e) => {this.props.setStat('hitpoints', e.target.value)}} />
				</div>
			</td>
		)
	}
}

export class AttackerStats extends Component{
	constructor(props){
		super(props)
		this.checkboxChange = this.checkboxChange.bind(this)
		this.checkList = props.bonusList
	}

	checkboxChange(e){
		console.log(e.target.checked, e.target.value)
		if (e.target.checked) {
			this.props.addBoost(e.target.value)
		}
		else {
			this.props.removeBoost(e.target.value)
		}
	}

	render(){
		
		const boosts = (new PotionDrinker()).boostList();
		const potionInput = boosts.map((boost, i) => {
			return (<div><input type="checkbox" value={boost} id={"stat-boost-" + i} onChange={this.checkboxChange} checked={this.props.player.boostList.includes(boost)} /> <label for={"stat-boost-" + i}>{boost}</label> </div>)
		})
		return (
			<div class='highlight-section flex-container-vertical'>
				<table class="stats-table">
					<tr>
						<StatPicker stat="attack" imgSrc="./assets/other_icons/attack_icon.webp" player={this.props.player} setStat={this.props.setStat} />
						<StatPicker stat="strength" imgSrc="./assets/other_icons/strength_icon.webp" player={this.props.player} setStat={this.props.setStat} />
					</tr>
					<tr>
						<StatPicker stat="defence" imgSrc="./assets/other_icons/defence_icon.webp" player={this.props.player} setStat={this.props.setStat} />
						<StatPicker stat="ranged" imgSrc="./assets/other_icons/ranged_icon.webp" player={this.props.player} setStat={this.props.setStat} />
					</tr>
					<tr>
						<StatPicker stat="prayer" imgSrc="./assets/other_icons/prayer_icon.png" player={this.props.player} setStat={this.props.setStat} />
						<StatPicker stat="magic" imgSrc="./assets/other_icons/magic_icon.webp" player={this.props.player} setStat={this.props.setStat} />
					</tr>
					<tr>
						<HpPicker imgSrc="./assets/other_icons/hitpoints_icon.webp" player={this.props.player} setStat={this.props.setStat} setMisc={this.props.setMisc} />
					</tr>
					<tr class="center">
						<td>Current</td>
						<td>Base</td>
					</tr>
				</table>
				<div class="center stat-wrap">
					<img src="assets/other_icons/combat_icon.webp" />
					{this.props.player.combat}
				</div>
				<div>
					<h3>Boosts:</h3>
					{potionInput}
				</div>
			</div>
		)
	}
}