import React, { Component } from 'react';
import {BonusRow} from "./BonusRow.js";

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
						<td>Max hit (hit {i})</td>
						<td>{this.props.calcs["maxHit" + i]}</td>
					</tr>
				)
			}
		}

		if("maxHitSpec" in this.props.calcs){
			rows.push(
				<tr>
					<td>Max hit (spec)</td>
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

		if("accSpec" in this.props.calcs){
			rows.push(
				<tr>
					<td>Accuracy (spec)</td>
					<td>{(this.props.calcs.accSpec * 100).toFixed(decimals-1) + "%"}</td>
				</tr>
				)
		}

		rows.push(
			<tr>
				<td>P(dmg {">"}= 1)</td>
				<td  class="color-1">{(this.props.calcs.acc1plus * 100).toFixed(decimals-1)+ "%"}</td>
			</tr>
			)

		return <OutputTable name="Accuracy" rows={rows} />
	}

	dps(){
		const rows = []

		rows.push(
			<tr>
				<td>Raw</td>
				<td>{this.props.calcs.dps.toFixed(decimals)}</td>
			</tr>
		)

		if("overhit" in this.props){
			console.log(this.props.overhit)
		}

		rows.push(
			<tr>
				<td>Overhit</td>
				<td class="color-1">{"overhit" in this.props ? this.props.overhit.toFixed(decimals) : "Loading..."}</td>
			</tr>
		)

		return <OutputTable name="Dps" rows={rows} />
	}

	render(){
		return(
			<div class="flex-container-vertical">
				{this.attack()}
				{this.damage()}
				{this.accuracy()}
				{this.dps()}
			</div>
			)
	}
}