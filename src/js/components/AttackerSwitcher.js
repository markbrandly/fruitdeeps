import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Attacker } from './Attacker.js';

import Player from '../lib/Player.js';

class AttackerSwitcherInner extends Component {
    constructor(props) {
        super(props)
        this.state = { playerSelected: 0 }
    }

    buttons() {
        return this.props.playerList.map((player, i) => <button onClick={() => this.setState({playerSelected: i})}>Set {i + 1}</button>)
    }

    render() {
        let i = this.state.playerSelected
        const player = new Player(this.props.playerList[i])



        return (
            <div class="flex-container-vertical">
				<div class="flex-container-vertical">
					<h2 class="flex-valign">
						<img style={{height:"0.75em"}}src="/assets/svg/attack icon.svg" />
						<span class="space-left">Set {i+1}</span>
					</h2>

					<Attacker
						player={player}
						setPlayer={this.props.setPlayer(i)}
					/>
				</div>
				<div class='highlight-section'>
					{this.buttons()}
					{this.props.playerList.length < 4 ? <button onClick={this.props.addPlayer}>Add set</button> : null}
				</div>
			</div>
        );
    }
}

class AttackerSwitcher extends Component {
    render() {
        return (
            <AttackerSwitcherInner
				playerList = {this.props.playerList}
				setPlayer={this.props.setPlayer}
				addPlayer={this.props.addPlayer}
			/>
        )
    }
}

function mapStateToProps(state) {
    return {
        playerList: state.playerList
    }
}

function mapDispatchToProps(dispatch) {
    return {

        setPlayer: (i) => {
            return (player) => dispatch({ type: "SET_PLAYER", player: player, index: i })
        },

        addPlayer: () => {
            dispatch({ type: "ADD_NEW_PLAYER" })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttackerSwitcher)