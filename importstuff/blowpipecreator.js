const dartStrength = {
	"Bronze":1,
	"Iron":3,
	"Steel":4,
	"Black": 6,
	"Mithril":7,
	"Adamant":10,
	"Rune":14,
	"Dragon":20
}

const db = require('../server/database.js')

const bonusTable = [
	'stabAttack',
	'slashAttack',
	'crushAttack',
	'magicAttack',
	'rangedAttack',
	'stabDefence',
	'slashDefence',
	'crushDefence',
	'magicDefence',
	'rangedDefence',
	'strength',
	'rangedStrength',
	'magicStrength',
	'prayer'
]

const blowp = [0,0,0,0,60, 0,0,0,0,0, 0,40,0,0]

for(let key in dartStrength){
	let name = "Toxic Blowpipe (" + key + ")";
	db.con.query("Insert into rsitems.items (itemName, itemType) values (?,?)", [name, "weapon"], (err, res) => {
		for(let i = 0; i < blowp.length; i++){
			let value = (i === 11 ? blowp[i] + dartStrength[key] : blowp[i])
			db.con.query("insert into rsitems.stat (itemId, category, value) values ((select itemId from rsitems.items where itemName = ?),?,?)", [name, bonusTable[i], value], console.log)
			db.con.query("insert into rsitems.weapon_info (itemId, weaponType, attackSpeed) values ((select itemId from rsitems.items where itemName = ?),?,3)", [name, "Thrown"], console.log)
		}
		
	})
}