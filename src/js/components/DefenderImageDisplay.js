import React, { Component } from 'react';
import {MonsterSelect} from './MonsterSelect.js';

export class DefenderImageDisplay extends Component{
	constructor(props){
		super(props)
		this.state = {
			monList: [],
			monSelected: 0
		}

		this.setMonList = this.setMonList.bind(this)
	}

	setMonList(monList){
		this.setState({monList: monList, monSelected:0})
		this.props.setMonster(monList[0])
	}

	render(){

		var listButtons = this.state.monList.map((item, i) => {
			return (
				<button class="monsterVersion">
					{item.version || (i+1)}
				</button>
				)
		})

		return (
			<div class="highlight-section flex-container-vertical">
				<h3 class='center'>{this.props.monster.name}</h3>
				<div class={"versions-holder" + (this.state.monList.length <= 1 ? " hidden" : "")}>
					{listButtons}
				</div>
				<div class='center'>
					<img class="item-icon monster-image" src={this.props.monster.image} />
				</div>
				<MonsterSelect setMonList={this.setMonList} />
			</div>
		)
	}
}