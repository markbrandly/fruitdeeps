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
					<td class='color-grey'>{flags.description(flag)}</td>
				</tr> 
				)
		})
		return(
			<div class="flex-container-vertical flex-child">
				<h3>Active effects</h3>
				{flagTable.length === 0 ? <span class='mono-font'>No active effects</span> : null}
				<table class="bonus-table">
					{flagTable}
				</table>
			</div>
			)
	}
}