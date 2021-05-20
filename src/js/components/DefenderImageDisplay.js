import React, { Component } from 'react';
import { MonsterSelect } from './MonsterSelect.js';
import { DefenderVersionSelect } from './DefenderVersionSelect.js';

export class DefenderImageDisplay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            monList: [],
            monSelected: 0
        }

        this.setMonList = this.setMonList.bind(this)
    }

    setMonList(monList) {
        this.setState({ monList: monList, monSelected: 0 })
        this.props.setMonster(monList[0])
    }

    render() {

        return (
            <div class="highlight-section flex-container-vertical">
				<h3 class='center'>{this.props.monster.name}</h3>
				
				{this.state.monList.length > 1 ? 
					(<DefenderVersionSelect monList={this.state.monList} monster={this.props.monster} setMonster={this.props.setMonster} />) 
					:""
				}

				<div class='center'>
					<img class="monster-image" src={this.props.monster.image} />
				</div>
				<MonsterSelect setMonList={this.setMonList} />
			</div>
        )
    }
}