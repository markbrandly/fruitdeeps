import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CalcOutput } from "./CalcOutput.js";
import { CalcOutputTtkChart } from "./CalcOutputTtkChart.js";
import { CalcOutputOptimizationGraph } from "./CalcOutputOptimizationGraph.js";
import { DpsOverDefenceGraph } from "./DpsOverDefenceGraph.js";
import { Dps } from "../lib/dps/Dps.js";
import Worker from 'worker-loader!../lib/workers/Worker.js';


export class CalcOutputMultiple extends Component {
    constructor(props) {
        super(props)
        const playerList = this.props.state.playerList

        const ttkManager = playerList.map(() => { return { id: null, ttk: { ttk: null } } });

        this.workerList = playerList.map(() => new Worker());

        this.stateInputs = []

        this.state = { ttkManager: ttkManager }

        this.handleWorker = this.handleWorker.bind(this)
    }


    generateId(stateInput) {
        return JSON.stringify(stateInput)
    }

    handleWorker(calcs, i) {
        const id = this.generateId(this.stateInputs[i])

        if (typeof this.workerList[i] !== 'undefined') {
            this.workerList[i].terminate()
        }

        this.workerList[i] = new Worker()

        this.workerList[i].onmessage = function(event) {};

        this.workerList[i].addEventListener('message', (event) => {
            if (id == this.generateId(this.stateInputs[i])) {
                const ttkManager = [...this.state.ttkManager]
                ttkManager[i] = { id, ttk: event.data.overhit }
                this.setState({ ttkManager: ttkManager })
            }

        });

        this.workerList[i].postMessage({ state: this.stateInputs[i], calcs: calcs, type: "Overhit" });
    }
    render() {
        const playerList = this.props.state.playerList

        this.stateInputs = playerList.map((player) => {
            return { player: player, monster: this.props.state.monster }
        })

        const calcsList = playerList.map((player, i) => {
            return new Dps(this.stateInputs[i]).output();
        })

        const outputBlocks = []

        var showChart = true
        this.stateInputs.map((stateInput, i) => {
            if (typeof this.state.ttkManager[i] === 'undefined' || this.generateId(stateInput) !== this.state.ttkManager[i].id) {
                this.handleWorker(calcsList[i], i)
                showChart = false
            }
        })

        console.log(this.ttkManager)

        var dps = playerList.map((player, i) => {
            let nottk = (typeof this.state.ttkManager[i] !== 'undefined') && (this.generateId(this.stateInputs[i]) == this.state.ttkManager[i].id)
            return (
                <div class="flex-child">
                    <h2>Set {i+1}</h2>
                    <CalcOutput calcs={calcsList[i]} ttk={nottk ? this.state.ttkManager[i].ttk.ttk : null}/>
                </div>
            )
        })

        for (let i = 0; i < playerList.length; i++) {
            if (!(i % 2)) {
                outputBlocks.push(<div class='flex-container top-level'>{dps[i]} {i < dps.length ? dps[i+1] : null}</div>)
            }
        }

        return (
            <div class="flex-container-vertical">
                {outputBlocks}
                {false ? <CalcOutputTtkChart data={this.state.ttkManager.map((ttk) => ttk.ttk.ttkList)}/> : null}
                <div>
                    <h2 class="flex-valign">
                        <img style={{height:"0.75em"}}src="/assets/svg/stats_icon.svg" />
                        <span class="space-left">Set Comparison Graphs</span>
                    </h2>
                    <div class='flex-container-vertical'  style={{padding:"1em", border:'1px dashed #666'}}>
                        <CalcOutputOptimizationGraph calcsList={calcsList} state={this.props.state} />
                            <DpsOverDefenceGraph calcsList={calcsList} state={this.props.state} />
                    </div>
                </div> <
            /div>
        )
    }
}