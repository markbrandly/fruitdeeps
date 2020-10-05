import React, { Component } from 'react';

export class AttackerMisc extends Component{
	constructor(props){
		super(props)
		this.toggleTask = this.toggleTask.bind(this)
		this.toggleKandarin = this.toggleKandarin.bind(this)
		this.toggleWilderness = this.toggleWilderness.bind(this)
	}

	toggleTask(){
		const onTask = this.props.player.misc.onTask
		this.props.setMisc("onTask", !onTask)
	}

	toggleWilderness(){
		const wilderness = this.props.player.misc.wilderness
		this.props.setMisc("wilderness", !wilderness)
	}

	toggleKandarin(){
		const kandarinHard = this.props.player.misc.kandarinHard
		this.props.setMisc("kandarinHard", !kandarinHard)
	}

	render(){
		return(
			<div>
				<h3>Toggles</h3>
				<table class='bonus-table'>

					<tr>
						<td><label for="onTaskToggle">On Task</label></td>
						<td><input type="checkbox" id="onTaskToggle" checked={this.props.player.misc.onTask} onChange={this.toggleTask} /></td>
					</tr>
		
					<tr>
						<td><label for="wildernessToggle">In wilderness</label></td>
						<td><input type="checkbox" id="wildernessToggle" checked={this.props.player.misc.wilderness} onChange={this.toggleWilderness} /></td>
					</tr>
				
					<tr>
						<td><label for="kandarinHardToggle">Kandarin hard diary completed</label></td>
						<td><input type="checkbox" id="kandarinHardToggle" checked={this.props.player.misc.kandarinHard} onChange={this.toggleKandarin} /></td>
					</tr>
				
				</table>
			</div>
		)
	}
}