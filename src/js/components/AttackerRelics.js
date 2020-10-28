import React, { Component } from 'react';

const Tier3relic = (props) => { 
	return (
		<div>
			<input
				type="checkbox"
				id={props.relicName + "-select"}
				checked={props.player.misc.tier3relic == props.relicName}
				value={props.relicName}
				onChange={props.setRelic}
			/>
			<label for={props.relicName + "-select"}>{props.relicName}</label>
		</div>
	)
}

export class AttackerRelics extends Component{
	constructor(props){
		super(props)
		this.importRef = React.createRef();

		this.setT3Relic = this.setT3Relic.bind(this)
		this.toggleT6Relic = this.toggleT6Relic.bind(this)
	}

	setT3Relic(e){
		if(e.target.checked){
			this.props.setMisc('tier3relic', e.target.value)
		}
		else{
			this.props.setMisc('tier3relic', null)
		}
		
	}

	toggleT6Relic(e){
		if(e.target.checked){
			this.props.setMisc('tier6relic', true)
		}
		else{
			this.props.setMisc('tier6relic', false)
		}
	}

	render(){
		return (
			<div class="highlight-section flex-container-vertical">
				<h3>Relics</h3>
				<div>
					<Tier3relic player={this.props.player} relicName="Quick Shot" setRelic={this.setT3Relic} />
					<Tier3relic player={this.props.player} relicName="Fluid Strike" setRelic={this.setT3Relic} />
					<Tier3relic player={this.props.player} relicName="Double Cast" setRelic={this.setT3Relic} />
				</div>
				<div>
					<input
						type="checkbox"
						id={"t6-select"}
						checked={this.props.player.misc.tier6relic}
						onChange={this.toggleT6Relic}
					/>
					<label for={"t6-select"}>Tier 6</label>
				</div>
			</div>
		)
	}
}