import Player from '../Player.js';

var Newtroost = {"defence":0,"magic":0,"name":"Newtroost","image":"./assets/monster_images/Newtroost.png","version":"none","slayer":null,"hitpoints":18,"cb":19,"bonuses":{"crushDefence":0,"magicDefence":0,"rangedDefence":0,"slashDefence":0,"stabDefence":0}}

const defaultState = {
	player: new Player().serialize(),
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
				player: player.serialize()
			}

		case "PLAYER_UNEQUIP_ITEM":
			player.unequip(action.slot)
			return {
				...state,
				player: player.serialize()
			}

		case "PLAYER_SET_STAT":
			player.setStat(action.stat, action.level)
			return {
				...state,
				player: player.serialize()
			}

		case "PLAYER_ADD_BOOST":
			player.addBoost(action.boost)
			return {
				...state,
				player: player.serialize()
			}

		case "PLAYER_REMOVE_BOOST":
			player.removeBoost(action.boost)
			return {
				...state,
				player: player.serialize()
			}

		case "PLAYER_ADD_PRAYER":
			player.selectPrayer(action.prayer)
			return {
				...state,
				player: player.serialize()
			}

		case "PLAYER_REMOVE_PRAYER":
			player.deselectPrayer(action.prayer)
			return {
				...state,
				player: player.serialize()
			}

		case "PLAYER_CLEAR_PRAYERS":
			player.clearPrayers()
			return {
				...state,
				player: player.serialize()
			}

		case "PLAYER_SET_SPELL":
			player.setSpell(action.spell)
			return {
				...state,
				player: player.serialize()
			}

		case "PLAYER_CLEAR_SPELL":
			player.clearSpell()
			return {
				...state,
				player: player.serialize()
			}

		case "PLAYER_TOGGLE_CHARGE":
			player.toggleCharge()
			return {
				...state,
				player: player.serialize()
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