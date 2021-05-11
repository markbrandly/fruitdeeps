import React, { Component } from 'react';
import { PotionDrinker } from '../lib/PotionDrinker.js';

class StatPicker extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const player = this.props.player
        return (
            <td>
				<div class="stat-wrap">
					<img style={{width:"1em"}} src={this.props.imgSrc} />
					<span>{this.props.player.boostedStats[this.props.stat]}/</span>
					<input class="input-invisible" type="number" min="0" max="99" value={this.props.player.stats[this.props.stat]} onChange={(e) => {
						player.setStat(this.props.stat, e.target.value);
						this.props.setPlayer(player.minimize());
					}}/>
				</div>
			</td>
        )
    }
}

class HpPicker extends Component {
    constructor(props) {
        super(props)
    }

    setMisc(attribute, value) {
        const player = this.props.player
        player.setMisc(attribute, value)
        this.props.setPlayer(player.minimize())
    }

    render() {
        const player = this.props.player
        return (
            <td colspan="2">
				<div class="stat-wrap">
					<img style={{width:"1em"}} src={this.props.imgSrc} />
					<input class="input-invisible" type="number" min="0" max="99" value={this.props.player.misc.currentHitpoints} onChange={(e) => {this.setMisc('currentHitpoints', e.target.value)}} />
					<pre> / </pre>
					<input class="input-invisible" type="number" min="10" max="99" value={this.props.player.stats.hitpoints} onChange={(e) => {
						player.setStat('hitpoints', e.target.value);
						this.props.setPlayer(player.minimize());
					}} />
				</div>
			</td>
        )
    }
}

export class AttackerStats extends Component {
    constructor(props) {
        super(props)
        this.checkboxChange = this.checkboxChange.bind(this)
        this.checkList = props.bonusList
    }

    checkboxChange(e) {
        console.log(e.target.checked, e.target.value)
        const player = this.props.player
        if (e.target.checked) {
            player.addBoost(e.target.value)
        } else {
            player.removeBoost(e.target.value)
        }
        this.props.setPlayer(player.minimize())
    }

    render() {

        const boosts = (new PotionDrinker()).boostList();
        const potionInput = boosts.map((boost, i) => {
            return (<div><input type="checkbox" value={boost} id={"stat-boost-" + i} onChange={this.checkboxChange} checked={this.props.player.boostList.includes(boost)} /> <label for={"stat-boost-" + i}>{boost}</label> </div>)
        })
        return (
            <div class='highlight-section flex-container-vertical'>
				<table class="stats-table">
					<tr>
						<StatPicker stat="attack" imgSrc="./assets/svg/attack icon.svg" player={this.props.player} setPlayer={this.props.setPlayer} />
						<StatPicker stat="strength" imgSrc="./assets/svg/strength icon.svg" player={this.props.player} setPlayer={this.props.setPlayer} />
					</tr>
					<tr>
						<StatPicker stat="defence" imgSrc="./assets/svg/defence icon.svg" player={this.props.player} setPlayer={this.props.setPlayer} />
						<StatPicker stat="ranged" imgSrc="./assets/svg/ranged icon.svg" player={this.props.player} setPlayer={this.props.setPlayer} />
					</tr>
					<tr>
						<StatPicker stat="prayer" imgSrc="./assets/svg/prayer icon.svg" player={this.props.player} setPlayer={this.props.setPlayer} />
						<StatPicker stat="magic" imgSrc="./assets/svg/magic icon.svg" player={this.props.player} setPlayer={this.props.setPlayer} />
					</tr>
					<tr>
						<HpPicker imgSrc="./assets/svg/hitpoints icon.svg" player={this.props.player} setPlayer={this.props.setPlayer} />
					</tr>
					<tr class="center">
						<td>Current</td>
						<td>Base</td>
					</tr>
				</table>
				<div class="center stat-wrap">
					<img src="./assets/svg/combat icon.svg" />
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