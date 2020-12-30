import React, { Component } from 'react';
import {BonusRow} from "./BonusRow.js";

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = (d % 3600 % 60).toFixed(decimals);

    var hDisplay = h > 0 ? h + 'h ' : "";
    var mDisplay = m > 0 ? m + 'm ' : "";
    var sDisplay = s > 0 ? s + 's ' : "";
    return hDisplay + mDisplay + sDisplay; 
}

const decimals = 3

class OutputTable extends Component{
	constructor(props){
		super(props)
	}

	render(){
		return (
			<div>
				<span class='color-grey'>{this.props.name}</span>
				<table class="bonus-table">
					{this.props.rows}
				</table>
			</div>
			)
	}
}

export class CalcOutputNumbers extends Component{
	constructor(props){
		super(props)
		this.attack = this.attack.bind(this)
		this.damage = this.damage.bind(this)
		this.accuracy = this.accuracy.bind(this)
		this.dps = this.dps.bind(this)
	}

	attack(){
		const vertex = this.props.calcs.vertex
		let color = ""
		switch(vertex){
			case "Magic":
				color = "color-1"
				break
			case "Ranged":
				color = "color-3"
				break;
			case "Melee":
				color = "color-2"
				break;
		}

		const rows = []
		rows.push(
			<tr>
				<td>Type</td>
				<td class={color}>{this.props.calcs.attackType}</td>
			</tr>
		)
		rows.push(
			<tr>
				<td>Style</td>
				<td>{this.props.calcs.attackStyle}</td>
			</tr>
		)
		rows.push(
			<tr>
				<td>Speed</td>
				<td>{this.props.calcs.attackSpeed}</td>
			</tr>
		)
		return <OutputTable name="Attack" rows={rows} />
	}

	damage(){
		const rows = []
		rows.push(
			<tr>
				<td>Max hit</td>
				<td>{this.props.calcs.maxHit}</td>
			</tr>
		)

		//for scythe and darkbow
		for(let i = 1; i <= 3; i++){		
			if("maxHit" + i in this.props.calcs){
				rows.push(
					<tr>
						<td>Max hit <span class='sub-text'>(hit {i})</span></td>
						<td>{this.props.calcs["maxHit" + i]}</td>
					</tr>
				)
			}
		}

		if("maxHitSpec" in this.props.calcs){
			rows.push(
				<tr>
					<td>Max hit <span class='sub-text'>(proc)</span></td>
					<td>{this.props.calcs.maxHitSpec}</td>
				</tr>
			)
		}

		return <OutputTable name="Damage" rows={rows} />

	}

	accuracy(){
		const rows = []
		rows.push(
			<tr>
				<td>Raw</td>
				<td>{(this.props.calcs.rawAcc * 100).toFixed(decimals-1) + "%"}</td>
			</tr>
		)

		if("specAcc" in this.props.calcs){
			rows.push(
				<tr>
					<td><span class='sub-text'>(with proc)</span></td>
					<td>{(this.props.calcs.specAcc * 100).toFixed(decimals-1) + "%"}</td>
				</tr>
				)
		}

		rows.push(
			<tr>
				<td>p(dmg {">"} 0)</td>
				<td  class="color-1">{(this.props.calcs.acc1plus * 100).toFixed(decimals-1)+ "%"}</td>
			</tr>
			)

		return <OutputTable name="Accuracy" rows={rows} />
	}

	dps(){
		const rows = []
		const momentary = (<span class="sub-text">(momentary)</span>)
		const hp = this.props.calcs.hitpoints

		const contTtk = this.props.ttk
		const ttk = this.props.ttk - this.props.calcs.attackSpeed

		const overhitDps = hp / ttk / 0.6
		const overhitCont = hp / contTtk / 0.6

		rows.push(
			<tr>
				<td>Raw {this.props.calcs.flags.includes("Enchanted ruby bolts") ? momentary : null}</td>
				<td>{this.props.calcs.dps.toFixed(decimals)}</td>
			</tr>
		)

		if("overhit" in this.props){
			console.log(this.props.overhit)
		}

		rows.push(
			<tr>
				<td>Overhit</td>
				<td class="color-1">{this.props.ttk !== null ? overhitDps.toFixed(decimals) : "..."}</td>
			</tr>
		)

		rows.push(
			<tr>
				<td>Overhit <span class='sub-text'>(cont.)</span></td>
				<td class="color-1">{this.props.ttk !== null ? overhitCont.toFixed(decimals) : "..."}</td>
			</tr>
		)

		return <OutputTable name="Dps" rows={rows} />
	}

	ttk(){
		const contTtk = this.props.ttk
		const ttk = this.props.ttk - this.props.calcs.attackSpeed

		const rows = []

		rows.push(
			<tr>
				<td>Seconds</td>
				<td>{this.props.ttk !== null ? secondsToHms(ttk * 0.6) : '...'}</td>
			</tr>
		)

		rows.push(
			<tr>
				<td>Seconds <span class='sub-text'>(cont.)</span></td>
				<td>{this.props.ttk !== null ? secondsToHms(contTtk * 0.6) : '...'}</td>
			</tr>
		)


		rows.push(
			<tr>
				<td>Ticks</td>
				<td class='color-1'>{this.props.ttk !== null ? ttk.toFixed(decimals) : '...'}</td>
			</tr>
		)

		rows.push(
			<tr>
				<td>Ticks <span class='sub-text'>(cont.)</span></td>
				<td class='color-1'>{this.props.ttk !== null ? contTtk.toFixed(decimals) : '...'}</td>
			</tr>
		)

		return <OutputTable name="Time to kill" rows={rows} />
	}

	render(){
		return(
			<div class="flex-container flex-child">
				<div class='flex-child flex-container-vertical'>
					{this.attack()}
					{this.damage()}
					{this.accuracy()}
				</div>
				<div class='highlight-section flex-child flex-container-vertical'>
					{this.dps()}
					{this.ttk()}
				</div>
			</div>
			)
	}
}