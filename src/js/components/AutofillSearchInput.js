import React, { Component } from 'react';

//This component works well but I think some state could just be stored as class attributes
//A lot of stuff like shouldscroll should never trigger a rerender so can be stored as an attribute
//state.inputtext and shouldscroll should both be class attributes

export class AutofillSearchInput extends Component{
	constructor(props){
		super(props)
		this.state = {
			searchList: [],
			loading: false,
			isFocused: false,
			isItemFocused: false,
			highlightIndex: 0,
			inputText: "",
			shouldScroll: false
		}
		this.setFocus = this.setFocus.bind(this)
		this.setBlur = this.setBlur.bind(this)
		this.setItemFocus = this.setItemFocus.bind(this)
		this.setItemBlur = this.setItemBlur.bind(this)
		this.getList = this.getList.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.setHighlightIndex = this.setHighlightIndex.bind(this)
		this.keyaction = this.keyaction.bind(this)
		this.highlightRef = React.createRef();
	}

	componentDidMount(){
		document.addEventListener("keydown", this.keyaction)
	}

	componentDidUpdate(){
		if(this.highlightRef.current && this.state.shouldScroll){
			this.highlightRef.current.scrollIntoView({block: "center"})
			this.setState({shouldScroll: false})
		}
	}

	componentWillUnmount(){
		document.removeEventListener("keydown", this.keyaction)
	}

	keyaction(e){
		// console.log(e)
		if(!this.state.isFocused && !this.state.isItemFocused){
			return
		}
		var listLen = this.state.searchList.length
		if(this.state.isFocused){
			if(e.key == "ArrowDown" ){
				e.preventDefault()
				this.setState({highlightIndex: (this.state.highlightIndex + 1) % listLen, shouldScroll: true})
			}
			else if(e.key == "ArrowUp"){
				e.preventDefault()
				this.setState({highlightIndex: ((((this.state.highlightIndex -1) % listLen) + listLen) % listLen), shouldScroll: true})
			}
		}
		if(e.key == "Enter"){
			this.selectItem(this.state.searchList[this.state.highlightIndex]);
		}
	}

	setHighlightIndex(e){
		this.setState({highlightIndex: e.target.value})
	}

	setFocus(){
		// console.log('focusing')
		this.setState({isFocused:true})
		
	}

	setBlur(){
		// console.log('blurring')
		this.setState({isFocused:false})
	}

	setItemFocus(){
		this.setState({isItemFocused:true})
	}

	setItemBlur(){
		this.setState({isItemFocused:false})
	}

	getList(searchText, callback){
	    var xhr = new XMLHttpRequest();

	    xhr.onload = () => {
	      if (xhr.status >= 200 && xhr.status < 300 && searchText == this.state.inputText) {
	        callback(xhr.response)
	      } 
	    }
	    xhr.open('GET', this.url + "?like=" + searchText);
	    xhr.send();
	  }


	handleChange(e){
		var inputValue = e.target.value
		this.setState({inputText: inputValue})
		if(inputValue.length >= 3){
			this.setState({loading:true})
			this.getList(inputValue, (res)=>{
				if(inputValue == this.state.inputText){
					// console.log([...JSON.parse(res)])
					this.setState({
						searchList: [...JSON.parse(res)],
						highlightIndex: 0,
						loading:false
					})
				}
			})
		}
		else{
			this.setState({searchList:[], highlightIndex:0, loading:false})
		}
	}

	render(){
		var results = this.results();

		var ol = (
			<ol class={"auto-complete-results" + ((this.state.searchList.length > 0 && (this.state.isFocused || this.state.isItemFocused)) ? "": " input-hidden-hack")}>
				{results}
			</ol>
			);

		return (
			<div class="auto-complete-container" >
				<input className="auto-complete-input" onChange={this.handleChange} onFocus={this.setFocus} placeholder={this.placeholder} onBlur={this.setBlur} />
				{ol}
			</div>
		)
	}
}