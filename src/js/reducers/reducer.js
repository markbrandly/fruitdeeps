import Player from '../lib/Player.js';

var Newtroost = {"name":"Sotetseg","image":"./assets/monster_images/Sotetseg.png","version":"","combat":995,"stats":{"amagic":0,"arange":0,"att":250,"attbns":0,"dcrush":70,"def":200,"dmagic":30,"drange":150,"dslash":70,"dstab":70,"hitpoints":4000,"mage":250,"mbns":0,"range":0,"rngbns":0,"str":250,"strbns":48},"attributes":[]}

const defaultState = {
	player: {},
	monster: Newtroost,
	settings: {}
}

function reducer(state = defaultState, action){
	console.log(state.player)
	var player = new Player(state.player)
	switch(action.type){

		case "PLAYER_EQUIP_ITEM":
			player.equip(action.item)
			return {
				...state,
				player: player.minimize()
			}

		case "PLAYER_UNEQUIP_ITEM":
			player.unequip(action.slot)
			return {
				...state,
				player: player.minimize()
			}

		case "PLAYER_SET_STAT":
			player.setStat(action.stat, action.level)
			return {
				...state,
				player: player.minimize()
			}

		case "PLAYER_ADD_BOOST":
			player.addBoost(action.boost)
			return {
				...state,
				player: player.minimize()
			}

		case "PLAYER_REMOVE_BOOST":
			player.removeBoost(action.boost)
			return {
				...state,
				player: player.minimize()
			}

		case "PLAYER_ADD_PRAYER":
			player.selectPrayer(action.prayer)
			return {
				...state,
				player: player.minimize()
			}

		case "PLAYER_REMOVE_PRAYER":
			player.deselectPrayer(action.prayer)
			return {
				...state,
				player: player.minimize()
			}

		case "PLAYER_CLEAR_PRAYERS":
			player.clearPrayers()
			return {
				...state,
				player: player.minimize()
			}

		case "PLAYER_SET_SPELL":
			player.setSpell(action.spell)
			return {
				...state,
				player: player.minimize()
			}

		case "PLAYER_CLEAR_SPELL":
			player.clearSpell()
			return {
				...state,
				player: player.minimize()
			}

		case "PLAYER_TOGGLE_CHARGE":
			player.toggleCharge()
			return {
				...state,
				player: player.minimize()
			}

		case "PLAYER_SET_MISC":
			player.misc[action.attribute] = action.value
			return {
				...state,
				player: player.minimize()
			}

		case "SET_MONSTER":
			return {
				...state,
				monster: action.monster
			}

		case "PLAYER_SET_ATTACKSTYLE":
			player.attackStyleSelected = parseInt(action.value)
			return {
				...state,
				player: player.minimize()
			}
		default: return state
	}
}

export default reducer