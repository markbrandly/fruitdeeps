
const https = require('https');

const ImageDataURI = require('image-data-uri');
const db = require('../server/database.js')
const categoryTable = {
	"chinchompas": "chinchompas",
	"slashing_swords": "Slash Sword",
	"stabbing_swords": "Stab Sword",
	"thrown_weapons": "Thrown",
	"crossbows": "Crossbow",
	"staves": "Staff",
	"pickaxes": "Pickaxe",
	"blunt_weapons": "Blunt",
	"axes": "Axe",
	"spiked_weapons": "Spiked",
	"unarmed": "Unarmed",
	"banners": "Banner",
	"whips": "Whip",
	"spears": "Spear",
	"claws": "Claws",
	"polestaves": "Polestaff",
	"chinchompas": "Chincompas",
	"bladed_staves": "Bladed Staff",
	"trident-class_weapons": "Powered Staff",
	"two-handed_swords": "2h Sword",
	"scythes": "Scythe",
	"bows": "Bow",
	"bulwarks": "Bulwark",
	"guns": "Gun",
	"halberds": "Halberd",
	"salamanders": "Salamander"
}


const bonusTable = {
	'attack_stab':'stabAttack',
	'attack_slash':'slashAttack',
	'attack_crush':'crushAttack',
	'attack_magic':'magicAttack',
	'attack_ranged':'rangedAttack',
	'defence_stab':'stabDefence',
	'defence_slash':'slashDefence',
	'defence_crush':'crushDefence',
	'defence_magic':'magicDefence',
	'defence_ranged':'rangedDefence',
	'melee_strength':'strength',
	'ranged_strength':'rangedStrength',
	'magic_damage':'magicStrength',
	'prayer':'prayer'
}

const slot = "weapon"

const nameList = []

https.get('https://www.osrsbox.com/osrsbox-db/items-json-slot/items-' + slot +'.json', (resp) => {

  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    const wObj = JSON.parse(data, false, 2)
    const nameList = []
    console.log(wObj.length)
    for(const [key, value] of Object.entries(wObj)){
    	// db.con.query("Insert into rsitems.items (itemName, itemType) VALUES (?,?)", [value.wiki_name, slot], (e, r) => {

    	// 	for(const [key2, value2] of Object.entries(bonusTable)){
    	// 		db.con.query("insert into rsitems.stat (itemId, category, value) values ((select itemId from rsitems.items where itemName = ?), ?,?)", [value.wiki_name, value2, value.equipment[key2]], () =>{})
    	// 	}

    	// 	if(slot == "weapon" || slot == "2h"){
    	// 		db.con.query("insert into rsitems.weapon_info (itemId, weaponType, attackSpeed) values ((select itemId from rsitems.items where itemName = ?), ?,?)", [value.wiki_name, categoryTable[value.weapon.weapon_type], value.weapon.attack_speed], ()=>{})
    	// 	}

    	// 	ImageDataURI.outputFile("data:image/png;base64," + value.icon, "../assets/item_images/" + value.wiki_name + ".png")

    	// })
    	if(nameList.includes(value.name)){
    		console.log(value.name)
    	}
    	nameList.push(value.name)
    }
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});