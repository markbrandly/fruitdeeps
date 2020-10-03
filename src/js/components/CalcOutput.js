import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Dps} from "../lib/dps/Dps.js";

import {CalcOutputNumbers} from "./CalcOutputNumbers.js";
import {CalcOutputText} from "./CalcOutputText.js";


class CalcOutput extends Component{
	render(){
		var dps = new Dps(this.props.state);
		const calcs = dps.output()
		return (
			<div class="flex-container">
				<div class='flex-child'>
					<CalcOutputNumbers calcs={calcs} />
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