import {Overhit} from '../dps/overhit/Overhit.js'
import {ScytheOverhit} from '../dps/overhit/ScytheOverhit.js'
import {DarkBowOverhit} from '../dps/overhit/DarkBowOverhit.js'
import {KerisOverhit} from '../dps/overhit/KerisOverhit.js'
import {KarilsOverhit} from '../dps/overhit/KarilsOverhit.js'
import {AhrimsOverhit} from '../dps/overhit/AhrimsOverhit.js'
import {DiamondBoltsOverhit} from '../dps/overhit/DiamondBoltsOverhit.js'
import {RubyBoltsOverhit} from '../dps/overhit/RubyBoltsOverhit.js'
import {VeracsOverhit} from '../dps/overhit/VeracsOverhit.js'
import {GeneralBoltsOverhit} from '../dps/overhit/GeneralBoltsOverhit.js'
import {OnyxBoltsOverhit} from '../dps/overhit/OnyxBoltsOverhit.js'


self.addEventListener('message', function(e) {
	let calcs = e.data.calcs
	let state = e.data.state
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
			overhit = new GeneralBoltsOverhit(state, calcs)
		}
	})

	if(calcs.flags.includes("Scythe of vitur")){
		overhit = new ScytheOverhit(state, calcs)
	}
	else if(calcs.flags.includes("Dark bow")){
		overhit = new DarkBowOverhit(state, calcs)
	}
	else if(calcs.flags.includes("Keris")){
		overhit = new KerisOverhit(state, calcs)
	}
	else if(calcs.flags.includes("Karil's set")){
		overhit = new KarilsOverhit(state, calcs)
	}
	else if(calcs.flags.includes("Ahrim's set")){
		overhit = new AhrimsOverhit(state, calcs)
	}
	else if(calcs.flags.includes("Enchanted diamond bolts")){
		overhit = new DiamondBoltsOverhit(state, calcs)
	}
	else if(calcs.flags.includes("Enchanted ruby bolts")){
		overhit = new RubyBoltsOverhit(state, calcs)
	}
	else if(calcs.flags.includes("Enchanted onyx bolts")){
		overhit = new OnyxBoltsOverhit(state, calcs)
	}
	else if(calcs.flags.includes("Verac's set")){
		overhit = new VeracsOverhit(state, calcs)
	}
	else if(overhit === null){
		overhit = new Overhit(state, calcs)
	}
	
	self.postMessage({overhit: overhit.output()})
})