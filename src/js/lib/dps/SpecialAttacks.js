import { Accuracy } from "./Accuracy.js";

export class SpecialAttacks {
    constructor(state, calcs) {
        this.state = state
        this.calcs = calcs
    }

    applySpec(specName) {
        switch (specName) {
            case "Slice and Dice":
                return this.dclaws();
        }
        return this.calcs
    }

    dclaws() {
        let accCalc = new Accuracy(this.state, this.calcs)
        const dps = this.calcs
        let max = this.calcs.maxList[0]
        let npcRoll = accCalc.generalFormula(this.state.monster.stats.def + 9, this.state.monster.stats.dslash)
        let acc = accCalc.compareRolls(this.calcs.playerRoll, npcRoll)
        let trueMax = (max - 1) + Math.trunc((max - 1) / 2) + 2 * Math.trunc((max - 1) / 4) + 1
        let newDist = Array(trueMax + 1).fill(0)


        //distribution of first successful roll
        let max1 = max - 1
        let min1 = Math.trunc(max / 2)
        for (let dmg = min1; dmg <= max1; dmg++) {
            let dmgAll = dmg + Math.trunc(dmg / 2) + 2 * Math.trunc(dmg / 4)
            newDist[dmgAll] += acc / (max1 - min1 + 1) / 2
            newDist[dmgAll + 1] += acc / (max1 - min1 + 1) / 2
        }
        let scalingAcc = (1 - acc)

        //distribution of second successful roll
        let max2 = Math.trunc(max * 7 / 8)
        let min2 = Math.trunc(max * 3 / 8)
        for (let dmg = min2; dmg <= max2; dmg++) {
            let dmgAll = dmg + 2 * Math.trunc(dmg / 2)
            newDist[dmgAll] += (acc * scalingAcc) / (max2 - min2 + 1) / 2
            newDist[dmgAll + 1] += (acc * scalingAcc) / (max2 - min2 + 1) / 2
        }
        scalingAcc = (1 - acc) * (1 - acc)


        //distribution of third successful roll
        let max3 = Math.trunc(max * 3 / 4)
        let min3 = Math.trunc(max * 1 / 4)
        for (let dmg = min3; dmg <= max3; dmg++) {
            let dmgAll = 2 * dmg
            newDist[dmgAll] += (acc * scalingAcc) / (max3 - min3 + 1) / 2
            newDist[dmgAll + 1] += (acc * scalingAcc) / (max3 - min3 + 1) / 2
        }
        scalingAcc = scalingAcc * (1 - acc)


        //distribution of fourth successful roll
        let max4 = Math.trunc(max * 5 / 4)
        let min4 = Math.trunc(max * 1 / 4)
        for (let dmg = min4; dmg <= max4; dmg++) {
            let dmgAll = dmg
            newDist[dmgAll] += (acc * scalingAcc) / (max4 - min4 + 1)
        }
        scalingAcc = scalingAcc * (1 - acc)
        newDist[0] += scalingAcc / 2
        newDist[2] += scalingAcc / 2

        dps.hitDistList[0] = newDist;
        dps.maxList = [max1, Math.trunc(max1 / 2), Math.trunc(max1 / 4), Math.trunc(max1 / 4) + 1]
        dps.accuracy = acc
        dps.rawAcc = acc
        return dps


    }
}