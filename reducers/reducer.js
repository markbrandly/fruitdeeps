import Player from '../lib/Player.js';

var Newtroost = { "name": "Sotetseg", "image": "Sotetseg.png", "version": "", "combat": 995, "stats": { "amagic": 0, "arange": 0, "att": 250, "attbns": 0, "dcrush": 70, "def": 200, "dmagic": 30, "drange": 150, "dslash": 70, "dstab": 70, "hitpoints": 4000, "mage": 250, "mbns": 0, "range": 0, "rngbns": 0, "str": 250, "strbns": 48 }, "attributes": [] }
const toaNpcs = [
    'Akkha',"Ba-Ba", "Kephri", "Zebak", "Tumeken's Warden",
    "Baboon Brawler", "Baboon Mage", "Baboon Shaman", "Baboon Thrall", "Baboon Thrower", "Cursed Baboon", "Volatile Baboon",
    "Agile Scarab", "Arcane Scarab", "Scarab Swarm", "Soldier Scarab", "Spitting Scarab",
    "Blood Cloud", "Zebak's Tail",
    "Elidinis' Warden",
    "Obelisk", "Akkha's Shadow"
]


const defaultState = {
    playerList: [],
    monster: Newtroost
}

for (let i = 0; i < 2; i++) {
    defaultState.playerList.push({})
}



function reducer(state = defaultState, action) {
    let newState = { ...state }
    var player = {}
    if ("index" in action) {
        player = new Player(newState.playerList[action.index])
    }
    switch (action.type) {
        case "SET_PLAYER":
            newState.playerList = [...newState.playerList]
            newState.playerList[action.index] = new Player(action.player).minimize()
            return newState

        case "ADD_NEW_PLAYER":
            newState.playerList = [...newState.playerList]
            newState.playerList.push({})
            return newState

        case "DELETE_PLAYER":
            newState.playerList = [...newState.playerList]
            newState.playerList.splice(action.index, 1);
            return newState

        case "SET_MONSTER":
            let oldMonster = state.monster
            let newMonster = action.monster
            if("invocation" in newMonster){
                return {
                    ...state,
                    monster: newMonster
                }
            }
            if(toaNpcs.includes(newMonster.name) && toaNpcs.includes(oldMonster.name)){
                newMonster.invocation = oldMonster.invocation
            }
            else if(toaNpcs.includes(newMonster.name)){
                newMonster.invocation = 0
            }
            return {
                ...state,
                monster: newMonster
            }

        case "MONSTER_SET_STAT":
            const monster = { ...state.monster }
            let value = parseInt(action.value)
            if (action.stat === 'hitpoints' && value === 0) {
                value = 1
            }
            monster.stats[action.stat] = value
            console.log('monster set stat', monster)
            return {
                ...state,
                monster: monster
            }
        default:
            return state
    }
}

export default reducer