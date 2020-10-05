import React, { Component } from 'react';
import {AttackerEquipment} from './AttackerEquipment.js';
import {AttackerStats} from './AttackerStats.js';
import {AttackerPrayers} from './AttackerPrayers.js';
import {AttackerSpells} from './AttackerSpells.js';

class Tab extends Component{
	constructor(props){
		super(props)
	}

	render(){
		return(
			<span class={"tab" + (this.props.tabSelected == this.props.tab ? " tab-selected":"")} onClick={() => {this.props.setTab(this.props.tab)}}>
				<img class='attacker-tab-icon' src={this.props.imgSrc} />
			</span>
		)
		
	}
}

export class AttackerTabs extends Component{
	constructor(props){
		super(props)

		this.state = {tabSelected:0}

		this.setTab = this.setTab.bind(this)
	}

	setTab(tab){
		this.setState({tabSelected:tab})
	}

	render(){
		var displayBox;
		if(this.state.tabSelected == 0){
			displayBox = <AttackerEquipment player={this.props.player} equipItem={this.props.equipItem} unequipItem={this.props.unequipItem} />
		}
		else if(this.state.tabSelected == 1){
			displayBox = <AttackerStats player={this.props.player} setStat={this.props.setStat} removeBoost={this.props.removeBoost} addBoost={this.props.addBoost} setMisc={this.props.setMisc}/>
		}
		else if(this.state.tabSelected == 2){
			displayBox = <AttackerPrayers player={this.props.player} addPrayer={this.props.addPrayer} removePrayer={this.props.removePrayer} clearPrayers={this.props.clearPrayers} />
		}
		else if(this.state.tabSelected == 3){
			displayBox = <AttackerSpells player={this.props.player} setSpell={this.props.setSpell} clearSpell={this.props.clearSpell} toggleCharge={this.props.toggleCharge}/>
		}
		return (
			<div>
				<div class='tabs'>
					<Tab tab="0" tabSelected={this.state.tabSelected} setTab={this.setTab} imgSrc="/assets/other_icons/worn_equipment.webp"></Tab>
					<Tab tab="1" tabSelected={this.state.tabSelected} setTab={this.setTab} imgSrc="/assets/other_icons/skills_icon.webp"></Tab>
					<Tab tab="2" tabSelected={this.state.tabSelected} setTab={this.setTab} imgSrc="/assets/other_icons/prayer_icon.png"></Tab>
					<Tab tab="3" tabSelected={this.state.tabSelected} setTab={this.setTab} imgSrc="/assets/other_icons/spellbook.png"></Tab>
				</div>
				{displayBox}
			</div>
		)
	}

}