import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Dps} from "../lib/dps/Dps.js";

import {CalcOutputNumbers} from "./CalcOutputNumbers.js";
import {CalcOutputText} from "./CalcOutputText.js";

import OverhitWorker from 'worker-loader!../lib/workers/OverhitWorker.js';

//Calc output handles a webworker that calculates overhit dps in paralell to the main thread
class CalcOutput extends Component{

	constructor(props){
		super(props)
		this.state = {id: null, overhit: null}
		this.generateId = this.generateId.bind(this)

		this.worker = new OverhitWorker() 

		this.handleWorker = this.handleWorker.bind(this)
		this.generateId = this.generateId.bind(this)
	}

	generateId(){
		return JSON.stringify(this.props.state)
	}

	handleWorker(calcs){
		const id = this.generateId()

		this.worker.terminate()
		this.worker = new OverhitWorker()

		this.worker.onmessage = function (event) {};

		this.worker.addEventListener('message', (event) => {
			console.log(event)
			if(id == this.generateId()){
				this.setState({id: id, overhit: event.data.overhit})
			}
			
		});

		this.worker.postMessage({state: this.props.state, calcs: calcs});
	}

	render(){
		var dps = new Dps(this.props.state);
		const calcs = dps.output()
		if(this.state.id != this.generateId()){
			this.handleWorker(calcs)
		}
		

		return (
			<div class="flex-container">
				<div class='flex-child highlight-section'>
					{
						this.state.id == this.generateId() ?
						<CalcOutputNumbers calcs={calcs} overhit={this.state.overhit} />
						: <CalcOutputNumbers calcs={calcs} />
					}
				</div>
				<div class="flex-child">
					<CalcOutputText calcs={calcs} />
				</div>
			</div>
			)
	}
}

function mapStateToProps(state){
	return {
		state: state
	}
}

export default connect(mapStateToProps)(CalcOutput)