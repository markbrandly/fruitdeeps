import React, { Component } from 'react';
import { connect } from 'react-redux';
import Image from "next/image";
import { Attacker } from './Attacker.js';

import Player from '../lib/Player.js';

class AttackerSwitcherInner extends Component {
    constructor(props) {
        super(props)
        this.state = { playerSelected: 0, editMode: null, saveSetName: null, selectingSavedSet: false, savedSets: [], selectedSavedSet: null }
        this.clone = this.clone.bind(this)
        this.save = this.save.bind(this)
    }

    componentDidMount() {
        this.setState({savedSets: JSON.parse(localStorage.getItem("savedPlayerList")) || []})
    }

    buttons() {
        return this.props.playerList.map((player, i) => <button key={i} className={this.state.playerSelected == i ? "selected" : ""} onClick={() => this.setState({playerSelected: i, deleteMode: false})}>
            { player.setName
            ?
                (<span>{player.setName}</span>)
            :
                (<span>Set {i + 1}</span>)
            }
        </button>)
    }

    savedSetOptions() {
        return this.state.savedSets.map((set, i) => <option key={i} value={i}>{set.setName}</option>)
    }
    
    clone() {
        this.props.addPlayer();
        this.props.setPlayer(this.props.playerList.length)(this.props.playerList[this.state.playerSelected]);
    }

    delete() {
        this.props.deletePlayer(this.state.playerSelected);
        this.setState({playerSelected: 0, editMode: null})
    }

    selectSavedSet() {
        this.props.addPlayer();
        this.props.setPlayer(this.props.playerList.length)(this.state.savedSets[this.state.selectedSavedSet]);
        this.setState({selectingSavedSet: false, playerSelected: this.props.playerList.length, selectedSavedSet: null})
    }

    deleteSavedSet() {
        this.state.savedSets.splice(this.state.selectedSavedSet, 1)
        localStorage.setItem("savedPlayerList", JSON.stringify(this.state.savedSets))
        this.setState({selectedSavedSet: null})
    }

    save() {
        let savedSet = {...this.props.playerList[this.state.playerSelected], setName: this.state.saveSetName}
        let existingSet = this.state.savedSets.find(set => set.setName == savedSet.setName)
        if (existingSet) {
            this.state.savedSets[this.state.savedSets.indexOf(existingSet)] = savedSet
        } else {
            this.state.savedSets.push(savedSet)
        }
        this.props.setPlayer(this.state.playerSelected)(savedSet)
        localStorage.setItem("savedPlayerList", JSON.stringify(this.state.savedSets))
        this.setState({saveSetName: "", editMode: null})
    }

    render() {
        let i = this.state.playerSelected
        const player = new Player(this.props.playerList[i])



        return (
            <div className="flex-container-vertical">
                <div className="flex-container-vertical">
                    <h2 className="flex-valign">
                        <img style={{height:"0.75em"}} src="/assets/svg/attack_icon.svg" />
                        <span className="space-left">{player.setName ? (<span>{player.setName}</span>) : (<span>Set {i + 1}</span>)}</span>
                    </h2>

                    <Attacker
                        player={player}
                        setPlayer={this.props.setPlayer(i)}
                    />
                </div>
                <div className='highlight-section'>
                { this.state.editMode
                ?   
                    this.state.editMode == "delete" 
                    ?
                    (<div style={{marginBottom:"0.5em"}}>
                        <span className="sub-text">Delete?</span> 
                        <button className="seamless" onClick={() => {this.delete()}}>yes</button>|
                        <button className="seamless" onClick={() => this.setState({editMode: null})}>no</button>
                    </div>)
                    :
                    (<div style={{marginBottom:"0.5em"}}>
                        <span className="sub-text">Set Name: </span> 
                        <input type="text" class="select-input" value={this.state.saveSetName} onChange={(e) => this.setState({saveSetName: e.target.value})} />
                        <button className="seamless" onClick={() => this.save()} disabled={this.state.saveSetName == null}>save</button>|
                        <button className="seamless" onClick={() => this.setState({editMode: null, saveSetName: ""})}>cancel</button>
                    </div>)
                :
                    (<div style={{marginBottom:"0.5em"}}>
                        {
                            this.props.playerList.length > 1 &&
                            <button className="seamless" onClick={() => this.setState({editMode: "delete"})}>Delete</button>
                        }{
                            this.props.playerList.length > 1 && this.props.playerList.length < 4 && "|"
                        }{
                            this.props.playerList.length < 4 && <button className="seamless" onClick={this.clone}>Clone</button>
                        }{
                            "|" 
                        }{   
                            <button className="seamless" onClick={() => this.setState({editMode: "save"})}>Save</button>
                        }
                    </div>)
                }
                { this.state.selectingSavedSet
                ?
                    (<div>
                        <select class="select-input" onChange={(e) => {this.setState({selectedSavedSet: e.target.value})}}>
                            <option disabled selected>Select a set</option>
                            {this.savedSetOptions()}
                        </select>
                        <button className="seamless" onClick={() => this.selectSavedSet()} disabled={this.state.selectedSavedSet == null}>load</button>|
                        <button className="seamless" onClick={() => this.deleteSavedSet()} disabled={this.state.selectedSavedSet == null}>remove</button>|
                        <button className="seamless" onClick={() => this.setState({selectingSavedSet: null})}>cancel</button>
                    </div>)
                :
                    (<div>
                        {this.buttons()}
                        {this.props.playerList.length < 4 ? <button className="seamless" onClick={this.props.addPlayer}>New set</button> : null}
                        {this.props.playerList.length < 4 && this.state.savedSets.length > 0 ? "|" : null}
                        {this.props.playerList.length < 4 && this.state.savedSets.length > 0 ? <button className="seamless" onClick={() => this.setState({selectingSavedSet: true})}>Saved sets</button> : null}
                    </div>)
                }
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