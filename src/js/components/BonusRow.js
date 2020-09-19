import React, { Component } from 'react';


export class BonusRow extends Component{
	constructor(props){
		if(!('percent' in props)){
			props.percent = false;
		}
		super(props)
	}
	render(){
		var colorClass;
		if (this.props.bonusValue < 0){
			colorClass = "color-2";
		}
		else if (this.props.bonusValue == 0){
			colorClass = "color-grey";
		}
		else{
			colorClass = "color-3";
		}
		return (
			<tr>
				<td>{this.props.bonusName}:</td>
				<td class={colorClass}>
					<span class={this.props.bonusValue > 0 ? "" : "hidden"}>+</span>{this.props.bonusValue}<span class={this.props.percent ? "" : "hidden"}>%</span>
				</td>
			</tr>
		)
	}
}