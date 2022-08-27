import React, { Component } from "react";
import { EquipmentSelect } from "./EquipmentSelect.js";
import Image from "next/image";

class LoadoutCell extends Component {
    constructor(props) {
        super(props);
    }

    unequipItem(slot) {
        let player = this.props.player;
        player.unequip(slot);
        this.props.setPlayer(player.minimize());
    }

    render() {
        var img = "";
        if (this.props.player.equipment[this.props.slotname].name) {
            img = (
                <img
                    className="item-icon"
                    src={
                        "./assets/item_images/" +
                        this.props.player.equipment[this.props.slotname].id +
                        ".png"
                    }
                />
            );
        }
        if (this.props.player.equipment[this.props.slotname].name != "") {
            return (
                <div
                    className="loadout-cell"
                    onClick={() => {
                        this.unequipItem(this.props.slotname);
                    }}
                    data-tooltip={
                        "unequip " +
                        this.props.player.equipment[this.props.slotname].name
                    }
                >
                    {img}
                </div>
            );
        } else {
            return <div className="loadout-cell"></div>;
        }
    }
}

export class AttackerEquipment extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const player = this.props.player;

        return (
            <div className="highlight-section flex-container-vertical">
                <div className="loadout-container">
                    <div className="loadout-row">
                        <LoadoutCell
                            slotname="head"
                            player={player}
                            setPlayer={this.props.setPlayer}
                        />
                    </div>
                    <div className="loadout-row">
                        <LoadoutCell
                            slotname="cape"
                            player={player}
                            setPlayer={this.props.setPlayer}
                        />
                        <LoadoutCell
                            slotname="neck"
                            player={player}
                            setPlayer={this.props.setPlayer}
                        />
                        <LoadoutCell
                            slotname="ammo"
                            player={player}
                            setPlayer={this.props.setPlayer}
                        />
                    </div>
                    <div className="loadout-row">
                        <LoadoutCell
                            slotname="weapon"
                            player={player}
                            setPlayer={this.props.setPlayer}
                        />
                        <LoadoutCell
                            slotname="body"
                            player={player}
                            setPlayer={this.props.setPlayer}
                        />
                        <LoadoutCell
                            slotname="shield"
                            player={player}
                            setPlayer={this.props.setPlayer}
                        />
                    </div>
                    <div className="loadout-row">
                        <LoadoutCell
                            slotname="legs"
                            player={player}
                            setPlayer={this.props.setPlayer}
                        />
                    </div>
                    <div className="loadout-row">
                        <LoadoutCell
                            slotname="hands"
                            player={player}
                            setPlayer={this.props.setPlayer}
                        />
                        <LoadoutCell
                            slotname="feet"
                            player={player}
                            setPlayer={this.props.setPlayer}
                        />
                        <LoadoutCell
                            slotname="ring"
                            player={player}
                            setPlayer={this.props.setPlayer}
                        />
                    </div>
                </div>
                <EquipmentSelect
                    player={player}
                    setPlayer={this.props.setPlayer}
                />
            </div>
        );
    }
}
