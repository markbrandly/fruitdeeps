import React, { Component } from 'react';

export class AttackerAttackStyles extends Component {
    constructor(props) {
        super(props)
        this.setStyle = this.setStyle.bind(this)
    }

    setStyle(e) {
        const player = this.props.player;
        player.setAttackStyle(parseInt(e.target.value));
        this.props.setPlayer(player.minimize());
    }

    attackStyles() {
        const styles = this.props.player.allAttackStyles

        return styles.map((style, i) =>
            <tr key={i}>
				<td>
					<label htmlFor={"attack-style-select-"+i}>
						{style.name}
						<div className='sub-text'>{style.type} - {style.style}</div>
					</label>

				</td>
				<td><input type="radio" onChange={this.setStyle} value={i} id={"attack-style-select-"+i} checked={i == this.props.player.attackStyleSelected}/></td>
			</tr>
        )
    }

    render() {
        return (
            <div>
				<h3>Attack Styles</h3>
				<table className="bonus-table">
					{this.attackStyles()}
				</table>
			</div>
        )
    }
}