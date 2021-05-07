import { Overhit } from './Overhit.js'
import { ScytheOverhit } from './ScytheOverhit.js'
import { DarkBowOverhit } from './DarkBowOverhit.js'
import { KerisOverhit } from './KerisOverhit.js'
import { KarilsOverhit } from './KarilsOverhit.js'
import { AhrimsOverhit } from './AhrimsOverhit.js'
import { DiamondBoltsOverhit } from './DiamondBoltsOverhit.js'
import { RubyBoltsOverhit } from './RubyBoltsOverhit.js'
import { VeracsOverhit } from './VeracsOverhit.js'
import { DharoksOverhit } from './DharoksOverhit.js'
import { GeneralBoltsOverhit } from './GeneralBoltsOverhit.js'
import { OnyxBoltsOverhit } from './OnyxBoltsOverhit.js'

export function OverhitSwitcher(state, calcs, continuous) {
    let overhit = null

    if (calcs.flags.includes("Enchanted ruby bolts")) {
        console.log('ruby bolts overhit picked')
        overhit = new RubyBoltsOverhit(state, calcs, continuous)
    } else if (overhit === null) {
        overhit = new Overhit(state, calcs, continuous)
    }
    return overhit
}