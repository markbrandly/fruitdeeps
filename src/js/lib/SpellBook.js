const standardElements = ['Wind', 'Water', 'Earth', 'Fire']
const standardTiers = ['Strike', 'Bolt', 'Blast', 'Wave', 'Surge']
const ancientElements = ['Ice', 'Smoke', 'Shadow', 'Blood']
const ancientTiers = ['Rush', 'Burst', 'Blitz', 'Barrage']

var spellList = {
	standard: [],
	ancient: [],
	special: [
		'Iban Blast',
		'Magic Dart',
		'Saradomin Strike',
		'Flames of Zamorak',
		'Claws of Guthix'
	]
}

standardElements.forEach((element) => {
	standardTiers.forEach((tier) => {
		spellList.standard.push(element + ' ' + tier)
	})
})

ancientElements.forEach((element) => {
	ancientTiers.forEach((tier) => {
		spellList.ancient.push(element + ' ' + tier)
	})
})


export class SpellBook{

	tierObject(spellName){
		//Takes in a spellName and returns an object that breaks down specifics of the spell.
		var spellObj = {
				spellBook: 'standard',
				special: null,
				element: null,
				tier: null,
			}

		if (spellName == null){
			return spellObj
		}

		spellList.special.forEach((spell) => {
			if(spellName == spell){
				spellObj.spellBook = 'special';
				spellObj.special = spell;
				return spellObj;
			}
		})

		standardElements.forEach((element) => {
			if (spellName.includes(element)){
				spellObj.element = element;
			}
		})

		standardTiers.forEach((tier) => {
			if (spellName.includes(tier)){
				spellObj.tier = tier;
			}
		})

		ancientElements.forEach((element) => {
			if (spellName.includes(element)){
				spellObj.element = element;
				spellObj.spellBook = 'ancient';
			}
		})

		ancientTiers.forEach((tier) => {
			if (spellName.includes(tier)){
				spellObj.tier = tier;
				spellObj.spellBook = 'ancient';
			}
		})

		return spellObj
	}
}