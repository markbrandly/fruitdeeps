import React, { Component } from 'react';
import {BonusRow} from "./BonusRow.js";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer
} from 'recharts';

import Worker from 'worker-loader!../lib/workers/Worker.js';

const colors = ['#9eff74', '#74c7ff', "#ff8274", "#eeeeee"]

export class CalcOutputOptimizationGraph extends Component{
	constructor(props){
		super(props)

		this.optWorker = new Worker()
		this.state = {data: {}, id: null, continuous: true}

		this.handleWorker = this.handleWorker.bind(this)
		this.generateId = this.generateId.bind(this)
		this.toggleContinuous = this.toggleContinuous.bind(this)
	}

	toggleContinuous(){
		this.setState({data: {}, id: null, continuous: !this.state.continuous})
		console.log(this.state)
	}

	generateId(){
		return JSON.stringify({calcsList: this.props.calcsList, state: this.props.state})
	}

	handleWorker(){
		this.optWorker.terminate()
		this.optWorker = new Worker()

		this.optWorker.onmessage = function (event) {};

		this.optWorker.addEventListener('message', (event) => {
			if("graphData" in event.data){
				this.setState({data: event.data.graphData, id: this.generateId()})
			}
		});
		this.optWorker.postMessage({state: this.props.state, calcsList: this.props.calcsList, type: "Optimization", continuous: this.state.continuous});
	}

	render(){
		if(this.state.id !== this.generateId()){
			this.handleWorker()
		}
		const lines = this.props.calcsList.map((calcs,i) => <Line type="monotone" dot={false} dataKey={"Set " + (i + 1)} stroke={colors[i % 4]} strokeWidth={3}/>)
		return (
			<div>
				<h2>Optimal Switching @ {this.props.state.monster.name}</h2>
				<div style={{padding:"1em", border:'1px dashed #666'}}>
					<div class='highlight-section flex-container-vertical'>
						<div width="100%" height="10em" style={{position: "relative"}}>
							<div class='yAxis-label'>T
								Time to Kill (ticks)
							</div>
							<ResponsiveContainer width="100%" height={400}>
								<LineChart
									width={500}
									height={300}
									data={this.state.data}
									margin={{
									top: 5, right: 30, left: 20, bottom: 5,
									}}
								>
									<CartesianGrid strokeDasharray="3 3" stroke="#666" />
									<XAxis dataKey="hitpoint" name="Hitpoints" stroke="#ddd">
									</XAxis>
									<YAxis stroke="#ddd"/>
									<Tooltip className="highlight-sectisson" />
									<Legend />
								{lines}
								</LineChart>
							</ResponsiveContainer>
						</div>
						<div>
							<input type='radio' checked={this.state.continuous} id="optimizationContinuous" onChange={this.toggleContinuous} /> <label for="optimizationContinuous"> Continuous kills</label>
						</div>
						<div>
							<input type='radio' checked={!this.state.continuous} id="optimizationDiscontinuous" onChange={this.toggleContinuous} /> <label for="optimizationDiscontinuous"> Discontinuous kills</label>
						</div>
					</div>
				</div>
			</div>
	      )
		//<Label value="Pages of my website" offset={0} position="insideBottom" />
	}
}