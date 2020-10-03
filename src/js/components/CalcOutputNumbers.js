import React, { Component } from 'react';
import {BonusRow} from "./BonusRow.js";

export class CalcOutputNumbers extends Component{
	constructor(props){
		super(props)
	}

	render(){
		return(
			<div class="flex-container-vertical">
				<div>
					<h3>Calculations</h3>
					<table class="bonus-table">
						<BonusRow bonusName="DPS" bonusValue={this.props.calcs.dps.toFixed(2)}/>
						<BonusRow bonusName="Accuracy" bonusValue={(this.props.calcs.accuracy * 100).toFixed(2)} percent={true}/>
						<tr>
							<td>Max Hit</td><td>{this.props.calcs.maxHit}</td>
						</tr>
						<tr>
							<td>Attack Speed</td><td>{this.props.calcs.attackSpeed}</td>
						</tr>
						<tr>
							<td>Vertex</td><td>{this.props.calcs.vertex}</td>
						</tr>
						<tr>
							<td>Accuracy > 0</td><td>{this.props.calcs.acc1plus}</td>
						</tr>
					</table>
				</div>
			</div>
			)
	}
}