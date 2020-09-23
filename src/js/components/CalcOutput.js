import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Dps} from "../lib/dps/Dps.js";

class CalcOutput extends Component{
	render(){
		var dps = new Dps(this.props.state);
		console.log(dps.output())
		return (
			<div class="flex-container">
				<div class='flex-child'>

				</div>
				<div class="flex-child">

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