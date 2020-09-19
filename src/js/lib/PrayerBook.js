/* PrayerBook.js 
 * Manages a list of prayers and their effects
 * Applies prayer effects to a stat object
 */


const combatPrayers = {
	attack: [
		'Clarity of Thought',
		'Improved Reflexes',
		'Incredible Reflexes',
		],
	strength: [
		'Burst of Strength',
		'Superhuman Strength',
		'Ultimate Strength',
		],
	melee: [
		'Chivalry',
		'Piety'
		],
	magic: [
		'Mystic Will',
		'Mystic Lore',
		'Mystic Might',
		'Augury'
		],
	ranged: [
		'Sharp Eye',
		'Hawk Eye',
		'Eagle Eye',
		'Rigour'
		]
};

export class PrayerBook{
	constructor(){

	}
	prayerList(){
		return combatPrayers;
	}
}