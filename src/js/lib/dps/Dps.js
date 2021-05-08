import { Flags } from "./Flags.js";
import { MaxHit } from "./MaxHit.js";
import { Accuracy } from "./Accuracy.js";
import { AttackSpeed } from "./AttackSpeed.js";
import { SpecialWeapons } from "./SpecialWeapons.js";
import { HitDistribution } from "./HitDistribution.js";
import Player from "../Player.js";

import { Overhit } from "./overhit/Overhit.js";

export class Dps {
    constructor(stateObj) {
        this.state = {
            ...stateObj,
            player: new Player(stateObj.player)
        }
        console.log(this.state.player)
        this.calcs = {
            vertex: "Melee",
            flags: [],
            maxHit: 0,
            accuracy: 0,
            attackSpeed: 1,
            dps: 0,
            acc1plus: 0,
            overhit1: 0,
            overhit2: 0,
            hitpoints: this.state.monster.stats.hitpoints
        }
        this.setVertex();
        this.setFlags();
        this.setMaxHit();
        this.setAccuracy();
        this.setAttackSpeed();

        this.setHitDist();

        this.setDps();
        this.setAccOverOne();
    }

    setVertex() {
        const type = this.state.player.attackStyle.type
        const style = this.state.player.attackStyle.style
        const spell = this.state.player.spell

        if (spell != null || type == "Magic") {
            this.calcs.vertex = "Magic";
            this.calcs.attackType = "Magic"
            if (type == "Magic") {
                this.calcs.attackStyle = style
            } else if (spell) {
                this.calcs.attackStyle = "Spell"
            }
        } else if (type == "Ranged") {
            this.calcs.vertex = "Ranged"
            this.calcs.attackType = "Ranged"
            this.calcs.attackStyle = style
        } else {
            this.calcs.vertex = "Melee"
            this.calcs.attackType = type
            this.calcs.attackStyle = style
        }
    }

    setFlags() {
        var flags = new Flags(this.state, this.calcs);
        this.calcs.flags = flags.outputFlags()
    }

    setMaxHit() {
        var max = new MaxHit(this.state, this.calcs)


        this.calcs.maxHit = max.output()

        this.calcs.maxList = [this.calcs.maxHit]
        if (this.calcs.flags.includes("Dark bow")) {
            this.calcs.maxList.push(this.calcs.maxHit)
        } else if (this.calcs.flags.includes("Scythe of vitur")) {
            this.calcs.maxList.push(Math.trunc(this.calcs.maxHit / 2))
            this.calcs.maxList.push(Math.trunc(this.calcs.maxHit / 4));
        }

        let maxHit = 0;
        for (var i = 0; i < this.calcs.maxList.length; i++) {
            maxHit += this.calcs.maxList[i]
        }

        this.calcs.maxHit = maxHit
    }

    setAccuracy() {
        var acc = new Accuracy(this.state, this.calcs)
        this.calcs.accuracy = acc.output()
        this.calcs.rawAcc = this.calcs.accuracy
    }

    setAttackSpeed() {
        var speed = new AttackSpeed(this.state, this.calcs)
        this.calcs.attackSpeed = speed.output()
    }

    setHitDist() {
        const acc = this.calcs.accuracy
        const max = this.calcs.maxHit

        let hitDistList = []

        //Initiate an array of Hit distributions from an array of max hits
        for (var i = 0; i < this.calcs.maxList.length; i++) {
            hitDistList.push(HitDistribution(this.calcs.maxList[i], acc));
        }

        this.calcs.hitDistList = hitDistList;

        this.applySpecials();

        hitDistList = this.calcs.hitDistList;

        //Combine Hit distributions into one
        let hitDist = [1]
        hitDistList.forEach((dist) => {
            let newDist = Array(dist.length + hitDist.length - 1).fill(0);
            for (var i = 0; i < dist.length; i++) {
                for (var j = 0; j < hitDist.length; j++) {
                    newDist[i + j] += dist[i] * hitDist[j];
                }
            }
            hitDist = [...newDist];
        })

        let maxHit = 0;
        for (var i = 0; i < this.calcs.maxList.length; i++) {
            maxHit += this.calcs.maxList[i]
        }

        this.calcs.maxHit = maxHit

        this.calcs.hitDist = hitDist;

    }

    setDps() {
        const acc = this.calcs.accuracy
        const max = this.calcs.maxHit
        const speed = this.calcs.attackSpeed

        let hitDist = this.calcs.hitDist
        let dps = 0;

        for (let dmg = 0; dmg < hitDist.length; dmg++) {
            dps += dmg * hitDist[dmg] / speed / 0.6
        }

        this.calcs.dps = dps
    }

    setAccOverOne() {
        this.calcs.acc1plus = 1 - this.calcs.hitDist[0]
    }

    applySpecials() {
        const someBolts = [
            "Enchanted pearl bolts",
            "Enchanted opal bolts",
            "Enchanted jade bolts",
            "Enchanted pearl bolts fiery",
            "Enchanted dragonstone bolts"
        ]
        const specs = new SpecialWeapons(this.state, this.calcs)
        if (this.calcs.flags.includes("Enchanted diamond bolts")) {
            this.calcs = specs.diamondBolts()
        } else if (this.calcs.flags.includes("Enchanted onyx bolts")) {
            this.calcs = specs.onyxBolts()
        } else if (this.calcs.flags.includes("Keris")) {
            this.calcs = specs.keris()
        } else if (this.calcs.flags.includes("Verac's set")) {
            this.calcs = specs.veracs()
        } else if (this.calcs.flags.includes("Karil's set")) {
            this.calcs = specs.karils()
        } else if (this.calcs.flags.includes("Ahrim's set")) {
            this.calcs = specs.ahrims()
        } else if (this.calcs.flags.includes("Dharok's set")) {
            this.calcs = specs.dharoks()
        }

        someBolts.forEach((bolt) => {
            if (this.calcs.flags.includes(bolt)) {
                this.calcs = specs.generalBolt(bolt)
            }
        })



        if (this.calcs.flags.includes("Corporeal beast")) {
            this.calcs = specs.corporealBeast();
        }

        if (this.calcs.flags.includes("Enchanted ruby bolts")) {
            this.calcs = specs.rubyBolts()
        }

        if (this.calcs.flags.includes("Barbarian Assault")) {
            this.calcs = specs.barbarianAssault();
        }

        if (this.calcs.flags.includes("Zulrah")) {
            this.calcs = specs.zulrah();
        }


    }

    output() {
        console.log(this.calcs)
        return this.calcs
    }
}