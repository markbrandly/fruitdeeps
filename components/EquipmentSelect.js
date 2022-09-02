import React, { Component } from 'react';
import { AutofillSearchInput } from './AutofillSearchInput.js';
import SearchFilter from '../lib/itemFinder.js';
import Image from "next/image";

export class EquipmentSelect extends AutofillSearchInput {
    constructor(props) {
        super(props)
        this.url = '/api/searchItems'
        this.placeholder = "Equip an item..."
        this.results = this.results.bind(this)
        this.selectItem = this.selectItem.bind(this)
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
            fetch('/assets/items.json')
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

    handleChange(e) {
        var inputValue = e.target.value
        this.setState({ inputText: inputValue })
        if (inputValue.length >= 3) {
            SearchFilter(inputValue, this.state.data.list)
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

    selectItem(item) {
        let player = this.props.player
        player.equip(item)
        this.props.setPlayer(player.minimize())
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
					{item.name}

                    <span className={this.state.highlightIndex == i ? "" : "hidden"}> ↵</span>
                    <span style={{float:"right", color:"#aaa"}}>
                        
                        <img alt="" style={{maxHeight:"1em"}} src={'/assets/item_images/' + item.id + '.png'} />

                    </span>
				</li>)
        });
    }
}