import React, { Component } from 'react';
import { AttackerEquipment } from './AttackerEquipment.js';
import { AttackerStats } from './AttackerStats.js';
import { AttackerPrayers } from './AttackerPrayers.js';
import { AttackerSpells } from './AttackerSpells.js';
import { AttackerImport } from './AttackerImport.js';
import { AttackerRelics } from './AttackerRelics.js';

class Tab extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <span class={"tab" + (this.props.tabSelected == this.props.tab ? " tab-selected":"")} onClick={() => {this.props.setTab(this.props.tab)}}>
				<img class='attacker-tab-icon' src={this.props.imgSrc} />
			</span>
        )

    }
}

export class AttackerTabs extends Component {
    constructor(props) {
        super(props)

        this.state = { tabSelected: 0 }

        this.setTab = this.setTab.bind(this)
    }

    setTab(tab) {
        this.setState({ tabSelected: tab })
    }

    render() {
        var displayBox;
        if (this.state.tabSelected == 0) {
            displayBox = <AttackerEquipment player={this.props.player} setPlayer={this.props.setPlayer} />
        } else if (this.state.tabSelected == 1) {
            displayBox = <AttackerStats player={this.props.player} setPlayer={this.props.setPlayer} />
        } else if (this.state.tabSelected == 2) {
            displayBox = <AttackerPrayers player={this.props.player} setPlayer={this.props.setPlayer} />
        } else if (this.state.tabSelected == 3) {
            displayBox = <AttackerSpells player={this.props.player} setPlayer={this.props.setPlayer} />
        } else if (this.state.tabSelected == 4) {
            displayBox = <AttackerRelics player={this.props.player} setPlayer={this.props.setPlayer} />
        } else if (this.state.tabSelected == 5) {
            displayBox = <AttackerImport player={this.props.player} setPlayer={this.props.setPlayer} />
        }
        return (
            <div>
				<div class='tabs'>
					<Tab tab="0" tabSelected={this.state.tabSelected} setTab={this.setTab} imgSrc="/assets/svg/equipment icon.svg"></Tab>
					<Tab tab="1" tabSelected={this.state.tabSelected} setTab={this.setTab} imgSrc="/assets/svg/stats icon.svg"></Tab>
					<Tab tab="2" tabSelected={this.state.tabSelected} setTab={this.setTab} imgSrc="/assets/svg/prayer icon.svg"></Tab>
					<Tab tab="3" tabSelected={this.state.tabSelected} setTab={this.setTab} imgSrc="/assets/svg/spellbook icon.svg"></Tab>
					<Tab tab="4" tabSelected={this.state.tabSelected} setTab={this.setTab} imgSrc="/assets/svg/toggles icon.svg"></Tab>
					<Tab tab="5" tabSelected={this.state.tabSelected} setTab={this.setTab} imgSrc="/assets/svg/export icon.svg"></Tab>
				</div>
				{displayBox}
			</div>
        )
    }

}