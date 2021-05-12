import React, { Component } from 'react';
import { AutofillSearchInput } from './AutofillSearchInput.js';

export class MonsterSelect extends AutofillSearchInput {
    constructor(props) {
        super(props)
        this.url = '/api/searchMonsterNames'
        this.placeholder = "Select a monster..."
        this.selectItem = this.selectItem.bind(this)
        this.monsterUrl = '/api/getMonstersByName'
        this.monsterName = ""
    }

    getMonsterList(name, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                callback(xhr.response)
            }
        }
        xhr.open('GET', this.monsterUrl + "?name=" + name);
        xhr.send();
    }

    selectItem(item) {
        this.monsterName = item
        this.getMonsterList(item, (res) => {
            if (item != this.monsterName) {
                return
            }
            this.props.setMonList(JSON.parse(res))
        })
    }

    results() {
        return this.state.searchList.map((item, i) => {
            var listLen = this.state.searchList.length
            let ref = 0
            if (i == this.state.highlightIndex) {
                ref = this.highlightRef;
            } else if (i == (this.state.highlightIndex + 1) % listLen) {
                ref = this.downRef;
            } else if (i == ((((this.state.highlightIndex - 1) % listLen) + listLen) % listLen)) {
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
					{item}
					                    <span class={this.state.highlightIndex == i ? "" : "hidden"}> ↵</span>
				</li>)
        });
    }
}