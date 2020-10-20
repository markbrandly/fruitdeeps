import React, { Component } from 'react';

//state.inputtext can prbably be class attribute

export class AutofillSearchInput extends Component{
	constructor(props){
		super(props)
		this.state = {
			searchList: [],
			loading: false,
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
		this.handleHover = this.handleHover.bind(this)
		this.highlightRef = React.createRef();
		this.upRef = React.createRef();
		this.downRef = React.createRef();
		this.inputRef = React.createRef();
	}

	componentDidMount(){
		document.addEventListener("keydown", this.keyaction)
	}

	componentWillUnmount(){
		document.removeEventListener("keydown", this.keyaction)
	}

	keyaction(e){
		if(!this.state.isFocused && !this.state.isItemFocused){
			return
		}
		var listLen = this.state.searchList.length
		if(e.key == "ArrowDown"){
			e.preventDefault()
			this.downRef.current.focus()
		}
		else if(e.key == "ArrowUp"){
			e.preventDefault()
			this.upRef.current.focus()
		}
		else if(e.key == "Enter" || e.key =="ArrowRight"){
			this.inputRef.current.focus()
			this.selectItem(this.state.searchList[this.state.highlightIndex]);
		}
		else if(e.key == "Tab" && this.state.isFocused){
			e.preventDefault();
			this.highlightRef.current.focus()
		}
	}

	setHighlightIndex(e){
		this.setState({highlightIndex: e.target.value})
	}

	setFocus(){
		this.setState({isFocused:true})
		
	}

	setBlur(){
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

	handleHover(e){
		let inputValue = e.target.value
		this.inputRef.current.focus()
		this.setState({highlightIndex: inputValue})
	}

	render(){
		var results = this.results();
		console.log("rendering autobox")
		var ol = (
			<ol class={"auto-complete-results" + ((this.state.searchList.length > 0 && (this.state.isFocused || this.state.isItemFocused)) ? "": " input-hidden-hack")}>
				{results}
			</ol>
			);

		return (
			<div class="auto-complete-container" >
				<input className="auto-complete-input" onChange={this.handleChange} onFocus={this.setFocus} placeholder={this.placeholder} onBlur={this.setBlur} ref={this.inputRef}/>
				{ol}
			</div>
		)
	}
}