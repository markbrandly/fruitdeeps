import React, { Component } from 'react';
import { AutofillSearchInput } from './AutofillSearchInput.js';
import npcFilter from '../lib/npcFilter.js';
import npcFinder from '../lib/npcSpecificFinder.js';

export class MonsterSelect extends AutofillSearchInput {
    constructor(props) {
        super(props)
        this.url = '/api/searchMonsterNames'
        this.placeholder = "Select a monster..."
        this.selectItem = this.selectItem.bind(this)
        this.monsterUrl = '/api/getMonstersByName'
        this.monsterName = ""
    }


    componentDidMount(){
        super.componentDidMount();
        if(!this.state.data.initialLoad){
            this.setState({
                data: {
                    initialLoad: true,
                    loading: true,
                    list: []
                }
            })
            fetch('/assets/npcs.json')
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                this.setState({
                    data: {
                        initialLoad: true,
                        loading: false,
                        list: data
                    }
                })
            });
        }
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
        npcFinder(item, this.state.data.list)
        .then(({query, list}) =>{
            if (item != query) {
                return
            }
            this.props.setMonList(list)
        })
        // this.getMonsterList(item, (res) => {
        //     if (item != this.monsterName) {
        //         return
        //     }
            // this.props.setMonList(JSON.parse(res))
        // })
    }

    handleChange(e) {
        var inputValue = e.target.value
        this.setState({ inputText: inputValue })
        if (inputValue.length >= 3) {
            npcFilter(inputValue, this.state.data.list)
            .then(({query, list}) => {
                console.log(query, list)
                if(query === inputValue){
                    console.log('list', list)
                    this.setState({
                        searchList: list,
                        highlightIndex: 0,
                        loading: false
                    })
                }
            })
        } else {
            this.setState({ searchList: [], highlightIndex: 0, loading: false })
        }
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
                    key={i}
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
					className={this.state.highlightIndex == i ? "auto-complete-selected" : ""}
					ref={ref}
					tabIndex="0"
				>
					{item}
					                    <span className={this.state.highlightIndex == i ? "" : "hidden"}> ↵</span>
				</li>)
        });
    }
}