import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AttackerTableDisplay } from './AttackerTableDisplay.js';
import { AttackerTabs } from './AttackerTabs.js';
import { AttackerMisc } from './AttackerMisc.js'
import { AttackerAttackStyles } from './AttackerAttackStyles.js';

import Player from '../lib/Player.js';

export class Attacker extends Component {

    render() {
        const player = this.props.player
        console.log('attacker', player)
        return (
            <div className="flex-container">
				<div className="flex-child flex-container-vertical">
					<AttackerTabs player={player} setPlayer={this.props.setPlayer} />
					<AttackerAttackStyles player={player} setPlayer={this.props.setPlayer} />
				</div>
				<AttackerTableDisplay player={player} setPlayer={this.props.setPlayer} />
			</div>
        );
    }
}