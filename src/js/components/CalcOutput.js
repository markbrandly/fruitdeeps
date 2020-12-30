import React, { Component } from 'react';
import {connect} from 'react-redux';


import {CalcOutputNumbers} from "./CalcOutputNumbers.js";
import {CalcOutputText} from "./CalcOutputText.js";



//Calc output handles a webworker that calculates overhit dps in paralell to the main thread
export class CalcOutput extends Component{

	constructor(props){
		super(props)


		// this.handleWorker = this.handleWorker.bind(this)
		// this.generateId = this.generateId.bind(this)
	}



	render(){
		const calcs = this.props.calcs
		// if(this.state.id != this.generateId()){
		// 	this.handleWorker(calcs)
		// }
		

		return (

			<div class='flex-container-vertical' style={{    padding: '1em', border: '1px dashed #666'}}>
				<CalcOutputNumbers calcs={calcs} ttk={this.props.ttk}/>
				<CalcOutputText calcs={calcs} />
			</div>

			)
	}
}