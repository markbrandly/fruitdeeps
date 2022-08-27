import { OverhitSwitcher } from "../lib/dps/overhit/OverhitSwitcher.js"

import { TtkOptimization } from '../lib/dps/overhit/TtkOptimization.js'

import { DpsDefence } from '../lib/dps/overhit/DpsDefence.js'

self.addEventListener('message', function(e) {
    if (e.data.type === "Overhit") {
        let calcs = e.data.calcs
        let state = e.data.state
        let overhit = OverhitSwitcher(state, calcs)

        self.postMessage({ overhit: overhit.output() })
    } else if (e.data.type === "Optimization") {
        let calcsList = e.data.calcsList
        let state = e.data.state
        console.log('opt data', e)
        var ttkOpt = new TtkOptimization(state, calcsList)
        const output = ttkOpt.output()
        console.log(output)
        self.postMessage(output)
    } else if (e.data.type === "DpsDefence") {
        let calcsList = e.data.calcsList
        let state = e.data.state
        var dpsDef = new DpsDefence(state, calcsList)
        self.postMessage(dpsDef.output())
    }

})