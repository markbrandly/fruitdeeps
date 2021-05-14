import React, { Component } from 'react';
import { BonusRow } from "./BonusRow.js";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Label,
    ResponsiveContainer
} from 'recharts';

import Worker from 'worker-loader!../lib/workers/Worker.js';

const colors = ['#9eff74', '#74c7ff', "#ff8274", "#eeeeee"]

export class CalcOutputOptimizationGraph extends Component {
    constructor(props) {
        super(props)

        this.optWorker = new Worker()
        this.state = { data: [], id: null, continuous: true }

        this.handleWorker = this.handleWorker.bind(this)
        this.generateId = this.generateId.bind(this)
        this.toggleContinuous = this.toggleContinuous.bind(this)
    }

    toggleContinuous() {
        this.setState({ continuous: !this.state.continuous })
        console.log(this.state)
    }

    generateId() {
        return JSON.stringify({ calcsList: this.props.calcsList, state: this.props.state })
    }

    handleWorker() {
        this.optWorker.terminate()
        this.optWorker = new Worker()

        this.optWorker.onmessage = function(event) {};

        this.optWorker.addEventListener('message', (event) => {
            if ("graphData" in event.data) {
                this.setState({ data: event.data.graphData, id: this.generateId() })
            }
        });
        this.optWorker.postMessage({ state: this.props.state, calcsList: this.props.calcsList, type: "Optimization" });
    }

    render() {
        if (this.state.id !== this.generateId()) {
            this.handleWorker()
        }
        const lines = this.props.calcsList.map((calcs, i) => <Line type="monotone" dot={false} dataKey={"Set " + (i + 1)} stroke={colors[i % 4]} strokeWidth={3}/>)
        return (
            <div>
                    <h2 class="flex-valign">
                        <img style={{height:"0.75em"}}src="/assets/svg/stats_icon.svg" />
                        <span class="space-left">Set Comparison Graphs</span>
                    </h2>

                <div style={{padding:"1em", border:'1px dashed #666'}}>
                    <h3>Optimal Switching @ {this.props.state.monster.name} ({this.state.continuous ? "Continuous" : "Discontinuous"})

                    <span style={{float:"right", display:"inline-flex"}} data-tooltip="Continuous attacking assumes the player immediately switches to a new monster after killing the current one">
                        <label class="sub-text" for="continuousToggle" style={{marginRight:"0.5em", display:"inline-block"}}>Continuous</label>
                        <label class="toggle-control" for="continuousToggle">
                          <input type="checkbox" id="continuousToggle"checked={this.state.continuous} onClick={this.toggleContinuous} />
                          <span class="control"></span>
                        </label>
                    </span>
                    </h3>
                    <div class='highlight-section flex-container-vertical'>
                        <div width="100%" height="10em" style={{position: "relative"}}>
                            <ResponsiveContainer width="100%" height={200}>
                                <LineChart
                                    data={this.state.data[this.state.continuous ? 1 : 0]}
                                    margin={{
                                    top: 0, right: 30, left: 20, bottom: 20,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#666" />
                                    <XAxis dataKey="hitpoint" name="Hitpoints" stroke="#ddd">
                                        <Label value="Hitpoints" offset={0} position="insideBottom" margin={5}  dy={10} fill="#eeeeee" style={{fontFamily: "Roboto Slab"}}/>
                                    </XAxis>
                                    <YAxis stroke="#ddd">
                                     <Label value="TtK" offset={0} position="insideLeft" angle="-90" margin={5}  dy={10} fill="#eeeeee" style={{fontFamily: "Roboto Slab"}}/>
                                    </YAxis>
                                    <Tooltip className="highlight-section" />
                                    <Legend verticalAlign="top" />
                                {lines}
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div> <
            /div>
        )
        //<Label value="Pages of my website" offset={0} position="insideBottom" />
    }
}