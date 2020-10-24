import {Overhit} from './Overhit.js'
import {ScytheOverhit} from './ScytheOverhit.js'
import {DarkBowOverhit} from './DarkBowOverhit.js'
import {KerisOverhit} from './KerisOverhit.js'
import {KarilsOverhit} from './KarilsOverhit.js'
import {AhrimsOverhit} from './AhrimsOverhit.js'
import {DiamondBoltsOverhit} from './DiamondBoltsOverhit.js'
import {RubyBoltsOverhit} from './RubyBoltsOverhit.js'
import {VeracsOverhit} from './VeracsOverhit.js'
import {GeneralBoltsOverhit} from './GeneralBoltsOverhit.js'
import {OnyxBoltsOverhit} from './OnyxBoltsOverhit.js'

export function OverhitSwitcher(state, calcs, continuous){
		let overhit = null

		const someBolts = [
			"Enchanted pearl bolts",
			"Enchanted opal bolts",
			"Enchanted jade bolts",
			"Enchanted pearl bolts fiery",
			"Enchanted dragonstone bolts"
		]

		someBolts.forEach((bolt) => {
			if(calcs.flags.includes(bolt)){
				overhit = new GeneralBoltsOverhit(state, calcs, continuous)
			}
		})

		if(calcs.flags.includes("Scythe of vitur")){
			overhit = new ScytheOverhit(state, calcs, continuous)
		}
		else if(calcs.flags.includes("Dark bow")){
			overhit = new DarkBowOverhit(state, calcs, continuous)
		}
		else if(calcs.flags.includes("Keris")){
			overhit = new KerisOverhit(state, calcs, continuous)
		}
		else if(calcs.flags.includes("Karil's set")){
			overhit = new KarilsOverhit(state, calcs, continuous)
		}
		else if(calcs.flags.includes("Ahrim's set")){
			overhit = new AhrimsOverhit(state, calcs, continuous)
		}
		else if(calcs.flags.includes("Enchanted diamond bolts")){
			console.log('diamong bolts overhit picked')
			overhit = new DiamondBoltsOverhit(state, calcs, continuous)
		}
		else if(calcs.flags.includes("Enchanted ruby bolts")){
			console.log('ruby bolts overhit picked')
			overhit = new RubyBoltsOverhit(state, calcs, continuous)
		}
		else if(calcs.flags.includes("Enchanted onyx bolts")){
			overhit = new OnyxBoltsOverhit(state, calcs, continuous)
		}
		else if(calcs.flags.includes("Verac's set")){
			overhit = new VeracsOverhit(state, calcs, continuous)
		}
		else if(overhit === null){
			overhit = new Overhit(state, calcs, continuous)
		}

		return overhit
}