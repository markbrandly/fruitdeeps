import { OverhitSwitcher } from "../dps/overhit/OverhitSwitcher.js"

import { TtkOptimization } from '../dps/overhit/TtkOptimization.js'


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
    }

})