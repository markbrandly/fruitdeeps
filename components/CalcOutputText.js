import React, { Component } from 'react';
import {Flags} from "../lib/dps/Flags.js";	

export class CalcOutputText extends Component{
	constructor(props){
		super(props)
	}

	render(){
		var flags = new Flags()
		const flagTable = this.props.calcs.flags.map((flag, i) => {
			return (
				<tr key={i}>
					<td>{flag}</td>
					<td className='color-grey'>{flags.description(flag)}</td>
				</tr> 
				)
		})
		if(flagTable.length > 0){
			return (
				<div>
					<h3>Active effects</h3>
					<table className="bonus-table">
						{flagTable}
					</table>
				</div>
			)
		}
		return null
	}
}