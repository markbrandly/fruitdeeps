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
			var listLen = this.state.searchList.length
			let ref = 0
			if(i == this.state.highlightIndex){
				ref = this.highlightRef;
			}
			else if(i == (this.state.highlightIndex + 1) % listLen){
				ref = this.downRef;
			}
			else if(i == ((((this.state.highlightIndex -1) % listLen) + listLen) % listLen)){
				ref = this.upRef;
			}
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
					onMouseOver={this.handleHover}
					class={this.state.highlightIndex == i ? "auto-complete-selected" : ""}
					ref={ref}
					tabIndex="0"
				>
					{item.name}
				</li>)
		});
	}
}