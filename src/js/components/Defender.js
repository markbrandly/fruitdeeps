import React, { Component } from 'react';
import {connect} from 'react-redux';
import {DefenderTableDisplay} from './DefenderTableDisplay.js';
import {DefenderImageDisplay} from './DefenderImageDisplay.js';

class Defender extends Component{
	render(){
		return (
			<div class="flex-container">
				<div class='flex-child'>
					<DefenderImageDisplay monster={this.props.monster} setMonster={this.props.setMonster} />
				</div>
				<div class="flex-child">
					<DefenderTableDisplay monster={this.props.monster}/>
				</div>
			</div>
			)
	}
}

function mapStateToProps(state){
	return {
		monster: state.monster
	}
}

function mapDispatchToProps(dispatch){
	return {
		setMonster: (monster) => {
			dispatch({type: "SET_MONSTER", monster: monster})
		},

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Defender)