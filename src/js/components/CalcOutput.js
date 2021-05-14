import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CalcOutputNumbers } from "./CalcOutputNumbers.js";
import { CalcOutputText } from "./CalcOutputText.js";
import { Flags } from "../lib/dps/Flags.js";

const toPercent = (decimal, fixed = 2) => {
    return `${(decimal * 100).toFixed(fixed)}%`;
};


//Calc output handles a webworker that calculates overhit dps in paralell to the main thread
export class CalcOutput extends Component {

    constructor(props) {
        super(props)


        // this.handleWorker = this.handleWorker.bind(this)
        // this.generateId = this.generateId.bind(this)
        this.state = { expand: false }
        this.toggleExpand = this.toggleExpand.bind(this)
    }

    toggleExpand() {
        if (this.state.expand) {
            this.setState({ expand: false })
        } else {
            this.setState({ expand: true })
        }
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



        console.log('dataasdadadas', data, this.state.expand)

        var flags = new Flags()

        const badges = calcs.flags.map((flag) => {
            return (<span class='info-badge' data-tooltip={flags.description(flag)}>
                {flag}
            </span>)
        })

        let marginSides = 5;
        let graphHeight = 400;
        if (!this.state.expand) {
            marginSides = 7;
            graphHeight = 100;
            data.shift()
        }


        return (

            <div class='flex-container-vertical' style={{    padding: '1em', border: '1px dashed #666'}}>
                <CalcOutputNumbers calcs={calcs} ttk={this.props.ttk}/>
                <div>
                    <div class="center">
                        Hit Distribution {this.state.expand ? "" : " (dmg > 0)"}
                        <label class="toggle-control" style={{float:"right"}} data-tooltip={this.state.expand ? "Shrink" : "Expand"} >
                          <input type="checkbox" checked={this.state.expand} onClick={this.toggleExpand}/>
                          <span class="control"></span>
                        </label>

                    </div>
                    <div width="100%" height="10em" style={{position: "relative"}}>
                          <ResponsiveContainer width="100%" height={graphHeight}>
                            <BarChart
                              width={500}
                              
                              data={data}
                              margin={{
                                top: 5,
                                right: marginSides,
                                left: marginSides + 3,
                                bottom: 5,
                              }}

                            >
                              <CartesianGrid strokeDasharray="3 3" stroke="#666" />
                              <XAxis dataKey="damage" name="Damage" stroke="#ddd" />
                              <YAxis stroke="#ddd" tickFormatter={toPercent}/>
                              <Tooltip className="highlight-section" fill="#666"/>
                              <Bar dataKey="likelihood" fill="#9eff74" tickFormatter={toPercent} isAnimationActive={false} />
                            </BarChart>
                          </ResponsiveContainer>
                    </div>
                </div>
                { calcs.flags.length > 0 &&
                (<div class='info-badge-holder'>
                  {badges}
                </div>)
              }
            </div>

        )
    }
}