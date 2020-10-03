import Player from '../lib/Player.js';

var Newtroost = {"name":"Newtroost","image":"./assets/monster_images/Newtroost.png","version":"","combat":19,"stats":{"amagic":null,"arange":null,"att":18,"attbns":null,"dcrush":null,"def":17,"dmagic":null,"drange":null,"dslash":null,"dstab":null,"hitpoints":18,"mage":1,"mbns":null,"range":1,"rngbns":null,"str":16,"strbns":null},"attributes":[]}

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

		case "SET_MONSTER":
			return {
				...state,
				monster: action.monster
			}
		default: return state
	}
}

export default reducer