import React, { Component } from 'react';
import {AutofillSearchInput} from './AutofillSearchInput.js';

export class EquipmentSelect extends AutofillSearchInput{
	constructor(props){
		super(props)
		this.url='/api/searchItems'
		this.placeholder="Equip an item..."
		this.results = this.results.bind(this)
		this.selectItem = this.selectItem.bind(this)
	}

	selectItem(item){
		this.props.equipItem(item)
	}

	results(){
		return this.state.searchList.map((item, i) => {
			return (
				<li
					value={i}
					onClick={(e) => {
						this.selectItem(this.state.searchList[e.target.value])
					}}
					onBlur={this.setItemBlur}
					onFocus={(e) => {
						this.setHighlightIndex(e);
						this.setItemFocus();
					}}
					class={this.state.highlightIndex == i ? "auto-complete-selected" : ""}
					ref={this.state.highlightIndex == i ? this.highlightRef : 0}
					tabIndex="0"
				>
					{item.name}
				</li>)
		});
	}
}