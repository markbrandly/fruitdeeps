import React, { Component } from 'react';

export class AttackerImport extends Component{
	constructor(props){
		super(props)
		this.importRef = React.createRef();

		this.doImport = this.doImport.bind(this)
	}

	doImport(){
		this.props.setPlayer(JSON.parse(this.importRef.current.value))
	}

	render(){
		return (
			<div class="highlight-section flex-container-vertical">
				<textarea class="input-invisible" style={{resize: 'vertical', minHeight:'10em'}} ref={this.importRef}>
					{JSON.stringify(this.props.player.minimize())}
				</textarea>
				<button onClick={this.doImport}  >Import</button>
			</div>
		)
	}
}