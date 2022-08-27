import React, { Component } from 'react';
import { connect } from 'react-redux';
import Image from "next/image";
import { Attacker } from './Attacker.js';

import Player from '../lib/Player.js';

class AttackerSwitcherInner extends Component {
    constructor(props) {
        super(props)
        this.state = { playerSelected: 0, deleteMode: false }
        this.clone = this.clone.bind(this)
    }

    buttons() {
        return this.props.playerList.map((player, i) => <button key={i} className={this.state.playerSelected == i ? "selected" : ""} onClick={() => this.setState({playerSelected: i, deleteMode: false})}>Set {i + 1}</button>)
    }

    clone() {
        this.props.addPlayer();
        this.props.setPlayer(this.props.playerList.length)(this.props.playerList[this.state.playerSelected]);
    }

    render() {
        let i = this.state.playerSelected
        const player = new Player(this.props.playerList[i])



        return (
            <div className="flex-container-vertical">
                <div className="flex-container-vertical">
                    <h2 className="flex-valign">
                        <img style={{height:"0.75em"}} src="/assets/svg/attack_icon.svg" />
                        <span className="space-left">Set {i+1}</span>
                    </h2>

                    <Attacker
                        player={player}
                        setPlayer={this.props.setPlayer(i)}
                    />
                </div>
                <div className='highlight-section'>
                { this.state.deleteMode
                ?
                    (<div style={{marginBottom:"0.5em"}}>
                        <span className="sub-text">Delete?</span> 
                        <button className="seamless" onClick={() => {this.props.deletePlayer(this.state.playerSelected); this.setState({deleteMode: false, playerSelected: 0})}}>yes</button>|<button className="seamless" onClick={() => this.setState({deleteMode: false})}>no</button>
                    </div>)
                :
                    (<div style={{marginBottom:"0.5em"}}>
                        {
                            this.props.playerList.length > 1 &&
                            <button className="seamless" onClick={() => this.setState({deleteMode: true})}>Delete</button>
                        }{
                            this.props.playerList.length > 1 && this.props.playerList.length < 4 && "|"
                        }{
                            this.props.playerList.length < 4 && <button className="seamless" onClick={this.clone}>Clone</button>
                        }   
                    </div>)
                }
                <div>
                    {this.buttons()}
                    {this.props.playerList.length < 4 ? <button className="seamless" onClick={this.props.addPlayer}>Add set</button> : null}
                    </div>
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
                deletePlayer = {this.props.deletePlayer}
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
        },

        deletePlayer: (i) => {
            dispatch({ type: "DELETE_PLAYER", index: i });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttackerSwitcher)