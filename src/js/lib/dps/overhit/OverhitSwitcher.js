import { Overhit } from './Overhit.js'
import { RubyBoltsOverhit } from './RubyBoltsOverhit.js'


export function OverhitSwitcher(state, calcs, continuous) {
    let overhit = null



    overhit = new Overhit(state, calcs, continuous)
    return overhit
}