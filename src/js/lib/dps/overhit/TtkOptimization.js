import { OverhitSwitcher } from './OverhitSwitcher.js';


export class TtkOptimization {
    constructor(state, calcsList, continuous = true) {
        this.calcsList = calcsList
        this.state = state
        this.continuous = continuous
    }

    output() {
        const maxHp = this.state.monster.stats.hitpoints
        const overhitList = this.calcsList.map((calcs, i) => OverhitSwitcher({ monster: this.state.monster, player: this.state.playerList[i] }, calcs, this.continuous))
        const memory = [0]
        const graphData = [{ hitpoints: 0 }]
        this.calcsList.forEach((calc, i) => {
            graphData[0]["Set " + (i + 1)] = 0
        })
        for (var hp = 1; hp <= Math.min(maxHp, 400); hp++) {
            let ttkList = overhitList.map((overhit) => overhit.timeToKill(hp))
            memory[hp] = Math.min(...ttkList)

            if (hp < 401) {
                graphData.push({ hitpoint: hp })
                ttkList.forEach((ttk, i) => {
                    if (ttk === memory[hp] && hp <= 401) {
                        graphData[hp]['Set ' + (i + 1)] = parseFloat(ttk.toFixed(2))
                    }
                })
            }

            overhitList.forEach((overhit) => overhit.setMemory([...memory]))
        }
        return { graphData: graphData, memory: memory }
    }
}