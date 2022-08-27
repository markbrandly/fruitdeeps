import React, { Component } from 'react';
import {connect} from 'react-redux';
import {CalcOutputMultiple} from "./CalcOutputMultiple.js";



export class CalcOutputWrapper extends Component{

	render(){
		return <CalcOutputMultiple state={this.props.state} />
	}
}

function mapStateToProps(state){
	return {
		state: state
	}
}

export default connect(mapStateToProps)(CalcOutputWrapper)