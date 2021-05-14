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
        let tab = this.state.tabSelected
        var displayBox = (
            <div>
                    <div style={{display: tab == 0 ? "block" : "none"}}><AttackerEquipment player={this.props.player} setPlayer={this.props.setPlayer} /></div> <
                    div style = { { display: tab == 1 ? "block" : "none" } } > <AttackerStats player={this.props.player} setPlayer={this.props.setPlayer} /> < /div> <
                        div style = { { display: tab == 2 ? "block" : "none" } } > <AttackerPrayers player={this.props.player} setPlayer={this.props.setPlayer} /> < /div> <
                        div style = { { display: tab == 3 ? "block" : "none" } } > <AttackerSpells player={this.props.player} setPlayer={this.props.setPlayer} /> < /div> <
                        div style = { { display: tab == 4 ? "block" : "none" } } > <AttackerRelics player={this.props.player} setPlayer={this.props.setPlayer} /> < /div> <
                        div style = { { display: tab == 5 ? "block" : "none" } } > <AttackerImport player={this.props.player} setPlayer={this.props.setPlayer} /> < /div> <
                        /div>

        )
        return (
            <div>
                <div class='tabs'>
                    <Tab tab="0" tabSelected={this.state.tabSelected} setTab={this.setTab} imgSrc="/assets/svg/equipment_icon.svg"></Tab>
                    <Tab tab="1" tabSelected={this.state.tabSelected} setTab={this.setTab} imgSrc="/assets/svg/stats_icon.svg"></Tab>
                    <Tab tab="2" tabSelected={this.state.tabSelected} setTab={this.setTab} imgSrc="/assets/svg/prayer_icon.svg"></Tab>
                    <Tab tab="3" tabSelected={this.state.tabSelected} setTab={this.setTab} imgSrc="/assets/svg/spellbook_icon.svg"></Tab>
                    <Tab tab="4" tabSelected={this.state.tabSelected} setTab={this.setTab} imgSrc="/assets/svg/toggles_icon.svg"></Tab>
                    <Tab tab="5" tabSelected={this.state.tabSelected} setTab={this.setTab} imgSrc="/assets/svg/export_icon.svg"></Tab>
                </div>
                {displayBox}
            </div>
        )
    }

}