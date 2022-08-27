import React, { Component } from 'react';
import { BonusRow } from "./BonusRow.js";

function hpLimit(dmg, hp) {
    if (dmg <= hp) {
        return dmg;
    } else {
        return <span>{hp}<span className="sub-text"> {"(" + dmg + ")"}</span></span>
    }
}

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = (d % 3600 % 60).toFixed(1);

    var hDisplay = h > 0 ? h + 'h ' : "";
    var mDisplay = m > 0 ? m + 'm ' : "";
    var sDisplay = s > 0 ? s + 's' : "";
    return hDisplay + mDisplay + sDisplay;
}

const decimals = 3

class OutputTable extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <span className='color-grey'>{this.props.name}</span>
                <table className="bonus-table">
                    {this.props.rows}
                </table>
            </div>
        )
    }
}

export class CalcOutputNumbers extends Component {
    constructor(props) {
        super(props)
        this.attack = this.attack.bind(this)
        this.damage = this.damage.bind(this)
        this.accuracy = this.accuracy.bind(this)
        this.special = this.special.bind(this)
        this.dps = this.dps.bind(this)
    }

    attack() {
        const vertex = this.props.calcs.vertex
        let color = ""
        switch (vertex) {
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
                <td className={color}>{this.props.calcs.attackType}</td>
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

    damage() {
        const rows = []
        const hp = this.props.calcs.npcHp

        rows.push(
            <tr>
                <td>Max hit</td>
                <td>{hpLimit(this.props.calcs.maxHit, hp)}</td>
            </tr>
        )

        //for scythe and darkbow
        if (this.props.calcs.maxList.length > 1) {
            for (let i = 0; i < this.props.calcs.maxList.length; i++) {
                let maxOutput = this
                rows.push(
                    <tr>
                        <td>Max hit <span className='sub-text'>(hit {i + 1})</span></td>
                        <td>{hpLimit(this.props.calcs.maxList[i], hp)}</td>
                    </tr>
                )
            }
        }

        if ("maxHitSpec" in this.props.calcs) {
            rows.push(
                <tr>
                    <td>Max hit <span className='sub-text'>(proc)</span></td>
                    <td>{hpLimit(this.props.calcs.maxHitSpec, hp)}</td>
                </tr>
            )
        }

        rows.push(
            <tr>
                <td>Expected</td>
                <td>{this.props.calcs.eDmg.toFixed(2)}</td>
            </tr>
        )

        return <OutputTable name="Damage" rows={rows} />

    }

    accuracy() {
        const rows = []
        rows.push(
            <tr>
                <td>Raw</td>
                <td>{(this.props.calcs.rawAcc * 100).toFixed(decimals-1) + "%"}</td>
            </tr>
        )

        if ("specAcc" in this.props.calcs) {
            rows.push(
                <tr>
                    <td><span className='sub-text'>(with proc)</span></td>
                    <td>{(this.props.calcs.specAcc * 100).toFixed(decimals-1) + "%"}</td>
                </tr>
            )
        }

        rows.push(
            <tr>
                <td>p(dmg {">"} 0)</td>
                <td  className="color-1">{(this.props.calcs.acc1plus * 100).toFixed(decimals-1)+ "%"}</td>
            </tr>
        )

        return <OutputTable name="Accuracy" rows={rows} />
    }

    dps() {
        const rows = []
        const momentary = (<span className="sub-text">(momentary)</span>)
        const hp = this.props.calcs.hitpoints

        const contTtk = this.props.ttk
        const ttk = this.props.ttk - this.props.calcs.attackSpeed


        const overhitDps = hp / ttk / 0.6
        const overhitCont = hp / contTtk / 0.6

        console.log('ttk output', ttk, hp, this.props.calcs.attackSpeed, overhitDps, overhitCont)

        rows.push(
            <tr>
                <td>Raw {this.props.calcs.flags.includes("Enchanted ruby bolts") ? momentary : null}</td>
                <td>{this.props.calcs.dps.toFixed(decimals)}</td>
            </tr>
        )

        if ("overhit" in this.props) {
            console.log(this.props.overhit)
        }

        if (!this.props.spec) {
            rows.push(
                <tr>
                <td>Overhit</td>
                <td className="color-1">{this.props.ttk !== null ? overhitDps.toFixed(decimals) : "..."}</td>
            </tr>
            )

            rows.push(
                <tr>
                <td>Overhit <span className='sub-text'>(cont.)</span></td>
                <td className="color-1">{this.props.ttk !== null ? overhitCont.toFixed(decimals) : "..."}</td>
            </tr>
            )
        }

        return <OutputTable name="Dps" rows={rows} />
    }

    ttk() {
        const contTtk = this.props.ttk
        const ttk = this.props.ttk - this.props.calcs.attackSpeed

        const rows = []

        rows.push(
            <tr>
                <td>Seconds</td>
                <td>{this.props.ttk !== null ? <span>{secondsToHms(ttk * 0.6)} <span className='sub-text'> (+{secondsToHms(this.props.calcs.attackSpeed * 0.6)})</span></span> : '...'}</td>
            </tr>
        )

        // rows.push(
        //     <tr>
        //         <td>Seconds <span className='sub-text'>(cont.)</span></td>
        //         <td>{this.props.ttk !== null ? secondsToHms(contTtk * 0.6) : '...'}</td>
        //     </tr>
        // )


        rows.push(
            <tr>
                <td>Ticks</td>
                <td className='color-1'>{this.props.ttk !== null ? (<span>{ttk.toFixed(2)} <span className='sub-text'> (+{this.props.calcs.attackSpeed})</span></span>) : '...'}</td>
            </tr>
        )

        // rows.push(
        //     <tr>
        //         <td>Ticks <span className='sub-text'>(cont.)</span></td>
        //         <td className='color-1'>{this.props.ttk !== null ? contTtk.toFixed(decimals) : '...'}</td>
        //     </tr>
        // )

        return <OutputTable name="Time to kill" rows={rows} />
    }

    special() {
        let calcs = this.props.calcs
        if (!(calcs.eHealing > 0 || calcs.eDefReduction > 0 || calcs.ePrayer > 0)) {
            return null
        }
        return (
            <div>
                <span className='color-grey'>Special</span>
                <table className='bonus-table'>
                   {calcs.eHealing > 0 && <tr><td>Expected healing</td><td>{calcs.eHealing.toFixed(3)}</td></tr>}
                  {(calcs.ePrayer > 0) && <tr><td>Expected prayer regeneration</td><td>{calcs.ePrayer.toFixed(3)}</td></tr>}
                   {(calcs.eDefReduction > 0) && <tr><td>Expected def reduction</td><td>{calcs.eDefReduction.toFixed(3)}</td></tr>}

                </table>
            </div>
        )
    }

    render() {
        return (
            <div className="flex-container flex-child">
                <div className='flex-child flex-container-vertical'>
                    {this.attack()}
                    {this.damage()}
                    {this.accuracy()}
                </div>
                <div className='flex-child'>
                    <div className='highlight-section flex-container-vertical'>
                        {this.dps()}
                        {this.props.spec || this.ttk()}
                        {this.special()}
                    </div>
                </div>
            </div>
        )
    }
}