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
		//<!--span class={this.props.bonusValue > 0 ? "" : "hidden"}>+</span-->
		return (
			<tr>
				<td>{this.props.bonusName}:</td>
				<td class={colorClass}>
					
					{this.props.bonusValue}<span class={this.props.percent ? "" : "hidden"}>%</span>
				</td>
			</tr>
		)
	}
}