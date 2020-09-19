import React, { Component } from 'react';
import {AutofillSearchInput} from './AutofillSearchInput.js';

export class MonsterSelect extends AutofillSearchInput{
	constructor(props){
		super(props)
		this.url='/api/searchMonsterNames'
		this.placeholder="Select a monster..."
		this.selectItem = this.selectItem.bind(this)
		this.monsterUrl = '/api/getMonstersByName'
		this.monsterName = ""
	}

	getMonsterList(name, callback){
	    var xhr = new XMLHttpRequest();
	    xhr.onload = () => {
	      if (xhr.status >= 200 && xhr.status < 300) {
	        callback(xhr.response)
	      } 
	    }
	    xhr.open('GET', this.monsterUrl + "?name=" + name);
	    xhr.send();
	}

	selectItem(item){
		this.monsterName = item
		this.getMonsterList(item, (res) => {
			if(item != this.monsterName){
				return
			}
			this.props.setMonList(JSON.parse(res))
		})
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
					{item}
				</li>)
		});
	}
}