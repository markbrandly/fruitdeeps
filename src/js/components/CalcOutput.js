import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CalcOutputNumbers } from "./CalcOutputNumbers.js";
import { CalcOutputText } from "./CalcOutputText.js";

// const data = [{
//         name: 'Page A',
//         uv: 4000,
//         pv: 2400,
//         amt: 2400,
//     },
//     {
//         name: 'Page B',
//         uv: 3000,
//         pv: 1398,
//         amt: 2210,
//     },
//     {
//         name: 'Page C',
//         uv: 2000,
//         pv: 9800,
//         amt: 2290,
//     },
//     {
//         name: 'Page D',
//         uv: 2780,
//         pv: 3908,
//         amt: 2000,
//     },
//     {
//         name: 'Page E',
//         uv: 1890,
//         pv: 4800,
//         amt: 2181,
//     },
//     {
//         name: 'Page F',
//         uv: 2390,
//         pv: 3800,
//         amt: 2500,
//     },
//     {
//         name: 'Page G',
//         uv: 3490,
//         pv: 4300,
//         amt: 2100,
//     },
// ];

const toPercent = (decimal, fixed = 2) => {
    return `${(decimal * 100).toFixed(fixed)}%`;
};


//Calc output handles a webworker that calculates overhit dps in paralell to the main thread
export class CalcOutput extends Component {

    constructor(props) {
        super(props)


        // this.handleWorker = this.handleWorker.bind(this)
        // this.generateId = this.generateId.bind(this)
    }



    render() {
        const calcs = this.props.calcs
        const hitDist = calcs.hitDist
        const data = hitDist.map((likelihood, dmg) => {
            return {
                damage: dmg,
                likelihood: likelihood.toFixed(4)
            }
        })

        data.shift()

        console.log('dataasdadadas', data)


        return (

            <div class='flex-container-vertical' style={{    padding: '1em', border: '1px dashed #666'}}>
                <CalcOutputNumbers calcs={calcs} ttk={this.props.ttk}/>
                <CalcOutputText calcs={calcs} />
                <div class='highlight-section'>
                    <div class="center">
                        Hit Distribution (dmg > 0)
                    </div>
                    <div width="100%" height="10em" style={{position: "relative"}}>
                          <ResponsiveContainer width="100%" height={75}>
                            <BarChart
                              width={500}
                              height={100}
                              data={data}
                              margin={{
                                top: 5,
                                right: 5,
                                left: 5,
                                bottom: 5,
                              }}
                            >
                              <CartesianGrid strokeDasharray="3 3" stroke="#666" />
                              <XAxis dataKey="damage" name="Damage" stroke="#ddd" />
                              <YAxis stroke="#ddd" tickFormatter={toPercent}/>
                              <Tooltip className="highligh-section"/>
                              <Bar dataKey="likelihood" fill="#9eff74" />
                            </BarChart>
                          </ResponsiveContainer>
                    </div>
                </div>
            </div>

        )
    }
}