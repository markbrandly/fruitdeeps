import React, { Component } from 'react';

export class AttackerAttackStyles extends Component{
	constructor(props){
		super(props)
		this.setStyle = this.setStyle.bind(this)
	}

	setStyle(e){
		this.props.setAttackStyle(parseInt(e.target.value))
	}

	attackStyles(){
		const styles = this.props.player.allAttackStyles

		return styles.map((style, i) => 
			<tr>
				<td><label for={"attack-style-select-"+i}>{style.name}</label></td>
				<td><input type="radio" onChange={this.setStyle} value={i} id={"attack-style-select-"+i} checked={i == this.props.player.attackStyleSelected}/></td>
			</tr>
		)
 	}

	render(){
		return (
			<div>
				<h3>Attack Styles</h3>
				<table class="bonus-table">
					{this.attackStyles()}
				</table>
			</div>
			)
	}
}