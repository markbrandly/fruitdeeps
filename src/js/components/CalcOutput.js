import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Label } from 'recharts';
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
        this.state = { expand: false, spec: false }
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
        const calcs = this.state.spec ? this.props.calcs.specCalcs : this.props.calcs
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

        console.log(calcs)


        return (

            <div class='flex-container-vertical' style={{    padding: '1em', border: '1px dashed #666'}}>
                {
                    this.props.calcs.specCalcs !== null
                    &&
                    (<div>
                        <button className={this.state.spec ? "" : "selected"} onClick={()=>this.setState({spec: false})} >Standard</button>
                        <button className={this.state.spec ? "selected" : ""} onClick={()=>this.setState({spec: true})}>{this.props.calcs.specCalcs.specName}</button>
                    </div>)
                }            
                <CalcOutputNumbers calcs={calcs} ttk={this.props.ttk} spec={this.state.spec}/>
                <div>
                    <div class="color-grey" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                        Hit Distribution {this.state.expand ? "" : " (dmg > 0)"}
                        <span style={{display:"inline-flex"}}>
                            <span class="sub-text" style={{marginRight:"0.5em", display:"inline-block"}}>Expand</span>
                            <label class="toggle-control" style={{float:"right"}}>
                              <input type="checkbox" checked={this.state.expand} onClick={this.toggleExpand}/>
                              <span class="control"></span>
                            </label>
                        </span>

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
                              stackOffset="expand"

                            >
                              <CartesianGrid strokeDasharray="3 3" stroke="#666" />
                              <XAxis dataKey="damage" name="Damage" stroke="#ddd"/>
                              <YAxis stroke="#ddd" tickFormatter={toPercent} type="number" />
                              <Tooltip className="highlight-section" fill="#666"/>
                              <Bar dataKey="likelihood" fill="#9eff74" tickFormatter={toPercent} isAnimationActive={false} />
                              <ReferenceLine x={Math.trunc(calcs.eDmg)} stroke="#ff8274" style={{strokeDasharray: "15,10"}}>
                                <Label value="" angle="-90" dx={-14} dy={18} position="insideTop"  fill="#ff8274" style={{fontFamily: "Roboto Slab", fontSize:"0.75em"}}/>
                                </ReferenceLine>
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