import React, { Component } from "react";
import { BonusRow } from "./BonusRow.js";

const BonusSelectRow = (props) => {
    let customBonus = props.player.customBonuses[props.bonusIndex];
    let asterisk = null;
    if (customBonus !== 0) {
        asterisk = (
            <span
                className={customBonus < 0 ? "color-2" : "color-3"}
                title="Custom additive modifier active"
            >
                *
            </span>
        );
    }

    let colorClass = "color-grey";
    if (props.player.bonuses[props.bonusIndex] > 0) {
        colorClass = "color-3";
    } else if (props.player.bonuses[props.bonusIndex] < 0) {
        colorClass = "color-2";
    }

    let percent = <pre className="hidden"> %</pre>;
    if ("percent" in props && props.percent) {
        percent = <pre> %</pre>;
    }

    return (
        <tr>
            <td className="single-line">
                {props.bonusName}
                {asterisk}
            </td>
            <td className={colorClass}>
                <span className="stat-wrap">
                    <input
                        type="number"
                        onChange={props.onChange}
                        value={props.player.bonuses[props.bonusIndex]}
                        data-bonus={props.bonusIndex}
                        className="input-invisible align-right"
                    />
                    {percent}
                </span>
            </td>
        </tr>
    );
};

export class AttackerTableDisplay extends Component {
    constructor(props) {
        super(props);
        this.handleSetBonus = this.handleSetBonus.bind(this);
        this.handleClearBonus = this.handleClearBonus.bind(this);
        this.handleSetSpeed = this.handleSetSpeed.bind(this);
    }

    handleSetSpeed(e) {
        e.persist();
        const player = this.props.player;
        let newSpeed = parseFloat(e.target.value);
        if (newSpeed <= 0) {
            newSpeed = 0;
        }
        player.setMisc("manualSpeed", newSpeed);
        this.props.setPlayer(player.minimize());
    }

    handleSetBonus(e) {
        e.persist();
        console.log(e.target.value);
        const player = this.props.player;
        player.setBonusCustom(
            parseInt(e.target.getAttribute("data-bonus")),
            parseInt(e.target.value)
        );
        this.props.setPlayer(player.minimize());
    }

    handleClearBonus() {
        const player = this.props.player;
        player.clearCustomBonuses();
        player.setMisc("manualSpeed", 0);
        this.props.setPlayer(player.minimize());
    }

    render() {
        var player = this.props.player;
        let customSum = 0;
        for (let i = 0; i < this.props.player.customBonuses.length; i++) {
            customSum += Math.abs(this.props.player.customBonuses[i]);
        }

        let clearButton = null;
        if (customSum > 0 || player.misc.manualSpeed > 0) {
            clearButton = (
                <div>
                    <button onClick={this.handleClearBonus}>
                        Clear custom bonuses
                    </button>
                </div>
            );
        }

        return (
            <div className="flex-child flex-container-vertical">
                <div>
                    <h3>Attack bonus</h3>
                    <table className="bonus-table">
                        <BonusSelectRow
                            onChange={this.handleSetBonus}
                            bonusName="Stab"
                            bonusIndex="0"
                            player={player}
                        />
                        <BonusSelectRow
                            onChange={this.handleSetBonus}
                            bonusName="Slash"
                            bonusIndex="1"
                            player={player}
                        />
                        <BonusSelectRow
                            onChange={this.handleSetBonus}
                            bonusName="Crush"
                            bonusIndex="2"
                            player={player}
                        />
                        <BonusSelectRow
                            onChange={this.handleSetBonus}
                            bonusName="Magic"
                            bonusIndex="3"
                            player={player}
                        />
                        <BonusSelectRow
                            onChange={this.handleSetBonus}
                            bonusName="Range"
                            bonusIndex="4"
                            player={player}
                        />
                    </table>
                </div>
                <div>
                    <h3>Other bonuses</h3>
                    <table className="bonus-table">
                        <BonusSelectRow
                            onChange={this.handleSetBonus}
                            bonusName="Melee Strength"
                            bonusIndex="10"
                            player={player}
                        />
                        <BonusSelectRow
                            onChange={this.handleSetBonus}
                            bonusName="Ranged Strength"
                            bonusIndex="11"
                            player={player}
                        />
                        <BonusSelectRow
                            onChange={this.handleSetBonus}
                            bonusName="Magic Damage"
                            bonusIndex="12"
                            player={player}
                            percent={true}
                        />
                        <BonusSelectRow
                            onChange={this.handleSetBonus}
                            bonusName="Prayer"
                            bonusIndex="13"
                            player={player}
                        />
                    </table>
                </div>
                <div>
                    <h3>Weapon</h3>
                    <table className="bonus-table">
                        {player.equipment.weapon.name ? (
                            <tr>
                                <td>Name:</td>
                                <td className="color-grey">
                                    {player.equipment.weapon.name}
                                </td>
                            </tr>
                        ) : (
                            ""
                        )}

                        <tr>
                            <td>Category</td>
                            <td className="color-grey">
                                {player.equipment.weapon.category}
                            </td>
                        </tr>
                        <tr>
                            <td>Base speed</td>
                            <td className="color-grey">
                                {player.equipment.weapon.speed}
                            </td>
                        </tr>
                        <tr>
                            <td className="single-line">
                                Manual speed
                                {player.misc.manualSpeed > 0 ? (
                                    <span className="color-grey">*</span>
                                ) : (
                                    ""
                                )}
                            </td>
                            <td
                                className="color-grey"
                                onChange={this.handleSetSpeed}
                            >
                                <input
                                    type="number"
                                    value={player.misc.manualSpeed}
                                    className="input-invisible align-right"
                                />
                            </td>
                        </tr>
                    </table>
                </div>
                {clearButton}
            </div>
        );
    }
}
