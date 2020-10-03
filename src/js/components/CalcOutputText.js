import React, { Component } from 'react';
import {Flags} from "../lib/dps/flags.js";	

export class CalcOutputText extends Component{
	constructor(props){
		super(props)
	}

	render(){
		var flags = new Flags()
		const flagTable = this.props.calcs.flags.map((flag) => {
			return (
				<tr>
					<td>{flag}</td>
					<td>{flags.description(flag)}</td>
				</tr>
				)
		})
		return(
			<div class="flex-container-vertical">
				<div>
				<h3>Active effects</h3>
				<table class="bonus-table">
					{flagTable}
				</table>
				</div>
			</div>
			)
	}
}