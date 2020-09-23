//Player.js defines the player model that is used for all calculations
//The Player constructor accepts a serialized version of the Player object
//Player.serialize() exports a serialized version of the object
//Notes:
//  Player.bonuses and Player.boostedStats may both be getters.
//  I think that boostedStats should be a getter and bonuses should not be, to allow bonuses to be custom defined

import {PotionDrinker} from "./lib/PotionDrinker.js";
import {PrayerBook} from "./lib/PrayerBook.js";




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
  id: 0,
  name: "",
  slot: null,
  bonuses: Array(14).fill(0)
};

const unarmed = {
  id: 0,
  name: "Unarmed",
  slot: "weapon",
  bonuses: Array(14).fill(0),
  category: {
    name:"unarmed",
    speed:4,
    styles:
      [
        {combatStyle:"Punch", type:"Crush", attackStyle:"Accurate"},
        {combatStyle:"Kick", type:"Crush", attackStyle:"Aggressive"},
        {combatStyle:"Block", type:"Crush", attackStyle:"Defensive"}
      ]
  }
}

export default class Player{
	constructor(attributes = {}){
		this.attackStyle = 0
		this.equipment = {};
		this.slots.forEach((slot) => {
      if(slot !== '2h'){
        this.equipment[slot] = {...nullItem, slot:slot};
        // console.log(this.equipment[slot])
      }
		}); 

    this.equipment['weapon'] = unarmed

		this.boostList = [];

		this.bonuses = Array(14).fill(0);
		this.stats = {};
		stats.forEach(stat => {
			this.stats[stat] = 99
		});

		this.prayers = [];
		this.spell = null;
		this.charge = false;

		Object.assign(this, attributes)

		this.stats = {
			...this.stats,
			get combat(){
				var base = 0.25 * (this.defence + this.hitpoints + Math.floor(this.prayer / 2))
				var melee = 0.325 * (this.attack + this.strength)
				var range = 0.325 * Math.floor(3 * this.ranged / 2)
				var mage = 0.325 * Math.floor(3 * this.magic / 2)
				return Math.floor(base + Math.max(melee, range, mage))
			}
		}

		this.boostStats()
	}

  equip(item){
    if(slots.indexOf(item.slot) === -1){
      return false;
    }

    if(item.slot == "weapon" || item.slot == "2h"){
      this.attackStyle = 0 //reset attack style selection on weapon switch
    }

    if(item.slot === "2h"){
      this.equipment.weapon = item;
      this.unequip("shield");
    }
    else if(item.slot === "shield" && this.equipment.weapon.slot === "2h"){
      this.equipment[item.slot] = item;
      this.equip(unarmed)
    }
    else{
      this.equipment[item.slot] = item;
      this.update();
    }
  }

  boostStats(){
  	var potionDrinker = new PotionDrinker();
  	// console.log('boosting stats', this.stats, this.boostList)
  	this.boostedStats = potionDrinker.boostStats(this.stats, this.boostList)
  }

  addBoost(boost){
  	if(new PotionDrinker().boostList().includes(boost)){
	  	this.boostList = [... new Set(this.boostList).add(boost)]
  	}
  	this.boostStats()
  }

  removeBoost(boost){
  	var boostList = new Set(this.boostList)
  	boostList.delete(boost)
  	this.boostList = [...boostList]
  	this.boostStats()
  }

  unequip(slot){
    if(slots.includes(slot)){
      this.equipment[slot] = {...nullItem, slot:slot};
      this.update(); 
    }
  }

  setStat(stat, level){
  	this.stats[stat] = parseInt(level);
  	this.boostStats()
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

  toggleCharge(){
  	this.charge = (this.charge ? false : true)
  }

  update(){
    // console.log(this)
    var player = this;
    for (var i = 0; i < bonusList.length; i++) {
      var bonus = 0;
      slots.forEach(function(slot){
        if(slot !== '2h'){
          // console.log(player.equipment[slot])
          bonus += player.equipment[slot].bonuses[i];
        }
      });
      player.bonuses[i] = bonus;
    }
  }

  get attackType(){
    return this.equipment.weapon.category.styles[this.attackStyle]
  }

  get slots(){
  	return slots
  }
  get bonusList(){
  	return bonusList
  }

  bonus(bonusName){
    return this.bonuses[bonusList.indexOf(bonusName)]
  }

  serialize(){
  	return JSON.parse(JSON.stringify(this))
  }
}
