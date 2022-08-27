import React, { Component } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer
} from 'recharts';

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

export class CalcOutputTtkChart extends Component{
	constructor(props){
		super(props)
	}

	render(){
		const useableData = []
		this.props.data[0].forEach((n, j) => {
			if(j % 10 !== 0){
				return
			}
			let dataPoint = {hitpoint: j}
			this.props.data.forEach((ttk, i) => {
				dataPoint["Set " + (i + 1)] = parseFloat(ttk[j].toFixed(2))
			})
			useableData.push(dataPoint)
		})
		console.log('use', useableData)
		return(
			<div width="100%" height="10em">
			<ResponsiveContainer width="100%" height={400}>
			<LineChart
			        width={500}
			        height={300}
			        data={useableData}
			        margin={{
			          top: 5, right: 30, left: 20, bottom: 5,
			        }}
			      >
			        <CartesianGrid strokeDasharray="3 3" />
			        <XAxis dataKey="hitpoint" name="Hitpoints">
			        	<Label value="Pages of my website" offset={0} position="insideBottom" />
			        </XAxis>
			        <YAxis />
			        <Tooltip />
			        <Legend />
			        <Line type="monotone" dot={false} dataKey="Set 1" stroke="#9eff74" strokeWidth={3}/>
			        <Line type="monotone" dot={false} dataKey="Set 2" stroke="#74c7ff" />
			        <Line type="monotone" dot={false} dataKey="Set 3" stroke="#ff8274" />
			        <Line type="monotone" dot={false} dataKey="Set 4" stroke="#eeeeee" />
			      </LineChart>
		      </ResponsiveContainer>
		      </div>
		)
	}
}