import Player from '../lib/Player.js';

var Newtroost = {"name":"Sotetseg","image":"./assets/monster_images/Sotetseg.png","version":"","combat":995,"stats":{"amagic":0,"arange":0,"att":250,"attbns":0,"dcrush":70,"def":200,"dmagic":30,"drange":150,"dslash":70,"dstab":70,"hitpoints":4000,"mage":250,"mbns":0,"range":0,"rngbns":0,"str":250,"strbns":48},"attributes":[]}

const defaultState = {
	playerList: [],
	monster: Newtroost
}

for(let i = 0; i < 2; i++){
	defaultState.playerList.push({})
}


function reducer(state = defaultState, action){
	let newState = {...state}
	var player = {}
	if("index" in action){
		player = new Player(newState.playerList[action.index])
	}
	console.log(action, state, player)
	switch(action.type){
		case "PLAYER_EQUIP_ITEM":
			player.equip(action.item)
			newState.playerList = [...newState.playerList]
			newState.playerList[action.index] = player.minimize()
			return newState

		case "SET_PLAYER":
			newState.playerList = [...newState.playerList]
			newState.playerList[action.index] = new Player(action.player).minimize()
			return newState

		case "PLAYER_UNEQUIP_ITEM":
			player.unequip(action.slot)
			newState.playerList = [...newState.playerList]
			newState.playerList[action.index] = player.minimize()
			return newState

		case "PLAYER_SET_STAT":
			player.setStat(action.stat, action.level)
			newState.playerList = [...newState.playerList]
			newState.playerList[action.index] = player.minimize()
			return newState

		case "PLAYER_ADD_BOOST":
			player.addBoost(action.boost)
			newState.playerList = [...newState.playerList]
			newState.playerList[action.index] = player.minimize()
			return newState

		case "PLAYER_REMOVE_BOOST":
			player.removeBoost(action.boost)
			newState.playerList = [...newState.playerList]
			newState.playerList[action.index] = player.minimize()
			return newState


		case "PLAYER_ADD_PRAYER":
			player.selectPrayer(action.prayer)
			newState.playerList = [...newState.playerList]
			newState.playerList[action.index] = player.minimize()
			return newState


		case "PLAYER_REMOVE_PRAYER":
			player.deselectPrayer(action.prayer)
			newState.playerList = [...newState.playerList]
			newState.playerList[action.index] = player.minimize()
			return newState


		case "PLAYER_CLEAR_PRAYERS":
			player.clearPrayers()
			newState.playerList = [...newState.playerList]
			newState.playerList[action.index] = player.minimize()
			return newState


		case "PLAYER_SET_SPELL":
			player.setSpell(action.spell)
			newState.playerList = [...newState.playerList]
			newState.playerList[action.index] = player.minimize()
			return newState


		case "PLAYER_SET_BONUS":
			player.setBonusCustom(action.bonusIndex, action.value)
			newState.playerList = [...newState.playerList]
			newState.playerList[action.index] = player.minimize()
			return newState


		case "PLAYER_CLEAR_CUSTOM_BONUSES":
			player.clearCustomBonuses()
			newState.playerList = [...newState.playerList]
			newState.playerList[action.index] = player.minimize()
			return newState


		case "PLAYER_CLEAR_SPELL":
			player.clearSpell()
			newState.playerList = [...newState.playerList]
			newState.playerList[action.index] = player.minimize()
			return newState


		case "PLAYER_TOGGLE_CHARGE":
			player.toggleCharge()
			newState.playerList = [...newState.playerList]
			newState.playerList[action.index] = player.minimize()
			return newState


		case "PLAYER_SET_MISC":
			player.misc[action.attribute] = action.value
			newState.playerList = [...newState.playerList]
			newState.playerList[action.index] = player.minimize()
			return newState

		case "PLAYER_SET_ATTACKSTYLE":
			player.attackStyleSelected = parseInt(action.value)
			newState.playerList = [...newState.playerList]
			newState.playerList[action.index] = player.minimize()
			return newState

		case "ADD_NEW_PLAYER":
			console.log('new plae')
			newState.playerList = [...newState.playerList]
			newState.playerList.push({})
			return newState


		case "SET_MONSTER":
			return {
				...state,
				monster: action.monster
			}

		case "MONSTER_SET_STAT":
			const monster = {...state.monster}
			monster.stats[action.stat] = parseInt(action.value)
			console.log('monster set stat', monster)
			return {
				...state,
				monster: monster
			}
		default: return state
	}
}

export default reducer