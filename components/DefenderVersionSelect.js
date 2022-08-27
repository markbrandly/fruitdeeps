import React, { Component } from 'react';

export class DefenderVersionSelect extends Component {
    constructor(props) {
        super(props)
        this.clickHandler = this.clickHandler.bind(this)
    }

    clickHandler(e) {
        this.props.setMonster(this.props.monList[parseInt(e.target.value)])
    }

    render() {

        const versions = this.props.monList.map((listItem, i) =>
            <option key={i} value={i}>{listItem.version || (i+1)}</option>
        )

        if (this.props.monList.length < 5) {
            return (
                <div>
						{this.props.monList.map((listItem, i)=>
						<button key={i} value={i} onClick={this.clickHandler} className={listItem.version == this.props.monster.version && listItem.version_number === this.props.monster.version_number && listItem.combat === this.props.monster.combat ? "selected" : ""}>{listItem.version || (i+1)}</button>
						)}
					</div>
            )
        }

        return (
            <div>
				<select onChange={this.clickHandler}>
					{versions}
				</select>
			</div>
        )
    }
}