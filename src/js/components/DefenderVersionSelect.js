import React, { Component } from 'react';

export class DefenderVersionSelect extends Component{
	constructor(props){
		super(props)
		this.clickHandler = this.clickHandler.bind(this)
	}

	clickHandler(e){
		this.props.setMonster(this.props.monList[parseInt(e.target.value)])
	}

	render(){

		const versions = this.props.monList.map((listItem, i) =>
			<option value={i}>{listItem.version || (i+1)}</option>
		)

		return (
			<div>
				<select onChange={this.clickHandler}>
					{versions}
				</select>
			</div>
		)
	}
}