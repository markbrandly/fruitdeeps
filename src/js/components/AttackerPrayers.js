import React, { Component } from 'react';
import {PrayerBook} from '../lib/PrayerBook.js';


export class AttackerPrayers extends Component{
	constructor(props){
		super(props)
		this.handleTogglePrayer = this.handleTogglePrayer.bind(this)
		this.handleClearPrayer = this.handleClearPrayer.bind(this)
	}

	handleTogglePrayer(e){
		if(e.target.checked){
			this.props.addPrayer(e.target.value)
		}
	}

	handleClearPrayer(e){
		e.persist()
		console.log(e)
		if(e.target.checked){
			this.props.clearPrayers()
		}
	}

	render(){
		const prayerList = new PrayerBook().prayerList();
		var meleeList = [...prayerList.attack, ...prayerList.strength, ...prayerList.melee]
		console.log('asasdfds')


		//Clean this up. VERY REPETITIVE 
		var attack = prayerList.attack.map((prayer, i) => {
			return (
				<div>
					<input 
						type="radio" 
						name="attack" 
						id={"attack-" + i} 
						checked={this.props.player.prayers.includes(prayer)} 
						onChange={this.handleTogglePrayer}
						value={prayer}
					/>
					<label for={"attack-" + i}>{prayer}</label>
				</div>
			)
		})

		var strength = prayerList.strength.map((prayer, i) => {
			return (
				<div>
					<input
						type="radio"
						name="strength"
						id={"strength-" + i}
						checked={this.props.player.prayers.includes(prayer)}
						onChange={this.handleTogglePrayer}
						value={prayer}
					/>
					<label for={"strength-" + i}>{prayer}</label>
				</div>
				)
		})

		var melee = prayerList.melee.map((prayer, i) => {
			return (
				<div>
					<input
						type="radio"
						name="melee"
						id={"melee-" + i}
						checked={this.props.player.prayers.includes(prayer)}
						onChange={this.handleTogglePrayer}
						value={prayer}
					/>
					<label for={"melee-" + i}>{prayer}</label>
				</div>
				)
		})

		var ranged = prayerList.ranged.map((prayer, i) => {
			return (
				<div>
					<input
						type="radio"
						name="ranged"
						id={"ranged-" + i}
						checked={this.props.player.prayers.includes(prayer)}
						onChange={this.handleTogglePrayer}
						value={prayer}
					/>
					<label for={"ranged-" + i}>{prayer}</label>
				</div>
				)
		})

		var magic = prayerList.magic.map((prayer, i) => {
			return (
				<div>
					<input
						type="radio"
						name="magic"
						id={"magic-" + i}
						checked={this.props.player.prayers.includes(prayer)}
						onChange={this.handleTogglePrayer}
						value={prayer}
					/>
					<label for={"magic-" + i}>{prayer}</label>
				</div>
				)
		})


		console.log("hello ???")
		return (
			<div class="highlight-section flex-container-vertical">
				<div>
					<h3>Melee:</h3>
					{attack}
				</div>
				<div>
					{strength}
				</div>
				<div>
					{melee}
				</div>
				<div>
					<h3>Ranged:</h3>
					{ranged}
				</div>
				<div>
					<h3>Magic:</h3>
					{magic}
				</div>
				<div>
					<input type="radio" name="clear-prayers" id="clear-prayers" checked={this.props.player.prayers.length == 0} onChange={this.handleClearPrayer} /><label for="clear-prayers">No Prayer</label>
				</div>
			</div>
			)
	}
}
