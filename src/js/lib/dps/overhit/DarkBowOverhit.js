import { Overhit } from "./Overhit.js";

export class DarkBowOverhit extends Overhit {
    timeToKill(hp) {

        const m1 = this.calcs.maxHit1
        const m2 = this.calcs.maxHit2

        const mSum = m1 + m2

        const accuracy = this.calcs.accuracy
        const speed = this.calcs.attackSpeed

        if (typeof this.generalMemory[hp - 1] === 'undefined') {
            this.fillMemory(hp)
        }

        //number of possible outcomes of a hit
        const mProduct = (m1 + 1) * (m2 + 1)

        const dist = Array(mSum + 1).fill(0) // [0, 0, 0, ... , 0].length == msum+1

        //populate hit distribution lookup table
        for (let h1 = 0; h1 <= m1; h1 += 1) {
            for (let h2 = 0; h2 <= m2; h2 += 1) {
                dist[h1 + h2] += 1
            }
        }

        let sum = 0
        var bigSum = 0
        for (let hit = 1; hit <= mSum; hit += 1) {
            sum += this.getStep(hp - hit) * dist[hit]
            bigSum += dist[hit]
        }

        const ttk = sum / (mProduct - 1) + mProduct / (mProduct - 1) * speed / accuracy
        this.generalMemory[hp] = ttk
        return ttk
    }
}