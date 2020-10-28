//Player.js defines the player model that is used for all calculations
//The Player constructor accepts a serialized version of the Player object
//Player.serialize() exports a serialized version of the object
//Notes:
//  Player.bonuses and Player.boostedStats may both be getters.
//  I think that boostedStats should be a getter and bonuses should not be, to allow bonuses to be custom defined

import {PotionDrinker} from "./PotionDrinker.js";
import {PrayerBook} from "./PrayerBook.js";
import {AttackStyles} from "./AttackStyles.js";




const slots = [
  "cape","head","neck","ammo",
  "weapon","shield","body","legs",
  "hands","feet","ring","2h"
];
const bonusList = [
  "stabAttack", "slashAttack",
  "crushAttack", "magicAttack", "rangedAttack", "stabDefence",
  "slashDefence", "crushDefence","magicDefence", "rangedDefence",
  "strength", "rangedStrength", "magicStrength", "prayer"
];

const stats = ['attack', 'strength', 'ranged', 'magic', 'hitpoints', 'prayer', 'defence']

const nullItem = {
  name: "",
  slot: null,
  bonuses: Array(14).fill(0)
};

const unarmed = {
  name: "",
  slot: "weapon",
  bonuses: Array(14).fill(0),
  category: "Unarmed",
  speed:4
}

export default class Player{
	constructor(attributes = {}){
		this.attackStyleSelected = 0
    this.boostList = [];
    this.prayers = [];
		this.equipment = {};
    this.spell = null;
    this.customBonuses = new Array(14).fill(0)

    Object.assign(this, attributes)


    this.equipment = {}

		slots.forEach((slot) => {
      if(slot !== '2h'){
        this.equipment[slot] = {...nullItem, slot:slot};
      }
		}); 

    this.equipment['weapon'] = unarmed

    this.equipment = {
      ...this.equipment,
      ...attributes.equipment
    }

		this.stats = {};
		stats.forEach(stat => {
			this.stats[stat] = 99
		});

    this.stats = {
      ...this.stats,
      ...attributes.stats
    }

    this.misc = {
      onTask: true,
      wilderness: true,
      currentHitpoints: 99,
      kandarinHard: true,
      charge: false,
      tier3relic: null,
      tier6relic: false,
      ...attributes.misc
    }
	}

  equip(item){
    if(slots.indexOf(item.slot) === -1){
      return false;
    }

    if(item.slot == "weapon" || item.slot == "2h"){
      this.attackStyleSelected = 0 //reset attack style selection on weapon switch
    }

    if(item.slot === "2h"){
      this.equipment.weapon = item;
      this.unequip("shield");
    }
    else if(item.slot === "shield" && this.equipment.weapon.slot === "2h"){
      this.equipment[item.slot] = item;
      delete this.equipment[item.slot].slot
      this.equip(unarmed)
    }
    else{
      // delete item.slot
      this.equipment[item.slot] = item;
      delete this.equipment[item.slot].slots
    }

    this.customBonuses = new Array(14).fill(0)
  }

  unequip(slot){
    if(slots.includes(slot)){
      this.equipment[slot] = {...nullItem, slot:slot};
    }
    this.customBonuses = new Array(14).fill(0)
  }

  addBoost(boost){
  	if(new PotionDrinker().boostList().includes(boost)){
	  	this.boostList = [... new Set(this.boostList).add(boost)]
  	}
  }

  removeBoost(boost){
  	var boostList = new Set(this.boostList)
  	boostList.delete(boost)
  	this.boostList = [...boostList]
  }

  setBonusCustom(bonusIndex, value){
    let i = parseInt(bonusIndex)
    let bonusRaw = this.bonusesRaw[i]
    this.customBonuses[i] = parseInt(value) - bonusRaw
  }

  setStat(stat, level){
  	this.stats[stat] = parseInt(level);
  }

  selectPrayer(prayer){
  	var prayerList = new PrayerBook().prayerList();

  	if(prayerList.ranged.includes(prayer) || prayerList.magic.includes(prayer) || prayerList.melee.includes(prayer)){
  		this.clearPrayers()
  		this.prayers.push(prayer)
  	}
  	else if(prayerList.attack.includes(prayer)){
  		[...prayerList.melee, ...prayerList.ranged, ...prayerList.attack, ...prayerList.magic].forEach((oldprayer) => {
  			this.deselectPrayer(oldprayer)
  			this.prayers.push(prayer)
  		})
  	}
  	else if(prayerList.strength.includes(prayer)){
  		[...prayerList.melee, ...prayerList.ranged, ...prayerList.strength, ...prayerList.magic].forEach((oldprayer) => {
  			this.deselectPrayer(oldprayer)
  			this.prayers.push(prayer)
  		})
  	}
  }

  deselectPrayer(prayer){
  	var prayers = new Set(this.prayers)
  	prayers.delete(prayer)
  	this.prayers = [...prayers]
  }

  clearPrayers(){
  	this.prayers = []
  }

  setSpell(spell){
  	this.spell = spell
  }

  clearSpell(){
  	this.spell = null;
  }

  clearCustomBonuses(){
    this.customBonuses = new Array(14).fill(0)
  }

  toggleCharge(){
  	this.charge = (this.charge ? false : true)
  }

  get bonusesRaw(){
    const bonuses = Array(14).fill(0);
    for (var i = 0; i < bonusList.length; i++) {
      var bonus = 0;
      slots.forEach((slot) => {
        if(slot !== '2h'){
          bonus += this.equipment[slot].bonuses[i];
        }
      });
      bonuses[i] = bonus;
    }

    //Don't include ammo ranged strength for self-sufficient weapons
    if(this.equipment.weapon.name.includes("Crystal bow") || this.equipment.weapon.name.includes("Craw's bow") || this.equipment.weapon.category === "Thrown" || this.equipment.weapon.category === "Chinchompas"){
      bonuses[11] = bonuses[11] - this.equipment.ammo.bonuses[11]
    }

    return bonuses
  }

  get bonuses(){
    return this.bonusesRaw.map((value, i) => {
      return value + this.customBonuses[i]
    })
  }

  get boostedStats(){
    const potionDrinker = new PotionDrinker();
    return potionDrinker.boostStats(this.stats, this.boostList)
  }

  get combat(){
    var base = 0.25 * (this.stats.defence + this.stats.hitpoints + Math.floor(this.stats.prayer / 2))
    var melee = 0.325 * (this.stats.attack + this.stats.strength)
    var range = 0.325 * Math.floor(3 * this.stats.ranged / 2)
    var mage = 0.325 * Math.floor(3 * this.stats.magic / 2)
    return Math.floor(base + Math.max(melee, range, mage))
  }

  get allAttackStyles(){
    return AttackStyles(this.equipment.weapon.category)
  }

  get attackStyle(){
    return this.allAttackStyles[this.attackStyleSelected]
  }

  serialize(){
  	return JSON.parse(JSON.stringify(this))
  }

  //minify returns a manual diff of this.serialize() and an empty player
  //This allows a serialized player state to be stored as concisely as possible
  minimize(){
    const fullObj = this.serialize()
    const emptyObj = new Player().serialize()
    const minObj = {}

    
    let sumCustom = 0

    for(let i = 0; i <= 13; i++){
      sumCustom += Math.abs(this.customBonuses[i])
    }

    if(sumCustom > 0){
      minObj.customBonuses = this.customBonuses
    }
    

    if(fullObj.attackStyleSelected !== 0){
      minObj.attackStyleSelected = fullObj.attackStyleSelected
    }

    if(fullObj.spell !== null){
      minObj.spell = fullObj.spell
    }

    if(fullObj.boostList.length > 0){
      minObj.boostList = fullObj.boostList
    }

    if(fullObj.prayers.length > 0){
      minObj.prayers = fullObj.prayers
    }

    stats.forEach((stat) => {
      if(fullObj.stats[stat] != emptyObj.stats[stat]){
        if(!("stats" in minObj)){
          minObj.stats = {}
        }
        minObj.stats.[stat] = fullObj.stats[stat]
      }
    })

    for(const attribute in fullObj.misc){
      if(fullObj.misc[attribute] != emptyObj.misc[attribute]){
        if(!("misc" in minObj)){
          minObj.misc = {}
        }
        minObj.misc[attribute] = fullObj.misc[attribute]
      }
    }

    for(const slot in fullObj.equipment){
      if(fullObj.equipment[slot].name){
        if(!("equipment" in minObj)){
          minObj.equipment = {}
        }
        minObj.equipment[slot] = fullObj.equipment[slot]
      }
    }

    return minObj
  }
}
