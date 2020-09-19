const db = require('./database.js')
const bonusList = ['stabAttack', 'slashAttack', 'crushAttack', 'magicAttack', 'rangedAttack', 'stabDefence', 'slashDefence', 'crushDefence', 'magicDefence', 'rangedDefence', 'strength', 'rangedStrength', 'magicStrength', 'prayer']
const monBonusList = ['stabDefence', 'slashDefence', 'crushDefence', 'magicDefence', 'rangedDefence']


//this code sucks
exports.searchItems = function(str, limit, fn){
	str = "%".concat(str).concat("%")
	const sql = `SELECT a.itemId as itemId, a.itemName as itemName,
		a.itemType as itemType, b.imageName as icon, c.weaponType as category, c.attackSpeed as speed
		FROM rsitems.items a 
		left join rsitems.image b 
		on a.imageFull = b.imageId 
        left join rsitems.weapon_info c
        on a.itemId = c.itemId
		WHERE a.itemName  
		like ?
		ORDER BY a.itemName 
		LIMIT ?`;
	const statSql = "SELECT * FROM rsitems.stat s WHERE s.itemId = ?";
	var fnCalled = false;
	db.con.query(sql, [str,limit], function(error, results){
		var items = []
		const resLen = results.length
		if(resLen == 0){
			fn([])
		}
		results.forEach(function(itemRow){
			var itemObj = {}
			itemObj.name = itemRow.itemName
			itemObj.id = itemRow.itemId
			itemObj.slot = itemRow.itemType
			itemObj.bonuses = Array(bonusList.length).fill(0) // [0, 0, ... ,0]
			itemObj.icon = encodeURI(itemRow.icon)
			db.con.query(statSql, itemObj.id, function(error, res){
				res.forEach(function(stat){
					itemObj.bonuses[bonusList.indexOf(stat.category)] = stat.value;
				})

				if(itemRow.category){
					itemObj.category = {name:itemRow.category, speed:itemRow.speed}
					db.con.query("Select combatStyle, type, attackStyle from rsitems.attack_style where weaponType = ?", itemRow.category, function(err, res2){
						itemObj.category.styles = res2
						items.push(itemObj)
						if(items.length == resLen && !fnCalled){
							fnCalled = true;
							fn(items);
						}
					})
				}
				else {
					items.push(itemObj)
					if(items.length == resLen && !fnCalled){
						fnCalled = true
						fn(items);
					}
				}

			})
		});
	});
}

exports.searchMonsterNames = function(str, limit, fn){
	str = "%".concat(str).concat("%")
	const sql = "select name from rsitems.monster \
		where name is not null and name like ? \
		group by name \
		limit ?";

	db.con.query(sql, [str,limit], (error,results) => {
		var nameList = results.map((result)=>{return result.name})
		fn(nameList)
	})
}

exports.getMonstersByName = function(str, fn){
	const sql="\
		select a.idmonster, a.name, a.wikiVersion, a.hitpoints, a.slayer, a.cbLvl, \
		a.examine, b.localPath, c.value as mage, d.value as defence \
		from rsitems.monster as a\
		left join rsitems.image as b \
    	on a.imageId = b.imageId \
        left join rsitems.monster_stat as c \
        on a.idmonster = c.monsterId \
        and c.category = 'mage' \
        left join rsitems.monster_stat as d \
        on a.idmonster = d.monsterId \
        and d.category = 'defence' \
		where name = ? \
		order by a.wikiVersion\
		"

	const statsql = "select * from rsitems.monster_stat where monsterId = ?"

	const wknsSql = "select * from rsitems.monster_wkns where monsterId = ?"

	db.con.query(sql, [str], (err, res) => {
		var monsList = []
		res.forEach((mon) => {
			var monObj = {}
			monObj.defence = mon.defence
			monObj.magic = mon.mage
			monObj.name = mon.name
			monObj.image = mon.localPath
			monObj.version = mon.wikiVersion
			monObj.slayer = mon.slayer
			monObj.hitpoints = mon.hitpoints
			monObj.cb = mon.cbLvl
			monObj.bonuses = {}
			monObj.weakness = []
			db.con.query(statsql, [mon.idmonster], (err, res2) => {
				res2.forEach((stat) =>{
					if (monBonusList.includes(stat.category)){
						monObj.bonuses[stat.category] = stat.value
					}
				})

				db.con.query(wknsSql, [mon.idmonster], (err, res3)=>{
					res3.forEach((wkns) => {
						monObj.weakness.push(wkns.weakness)
					})
					monsList.push(monObj)
					if(monsList.length == res.length){
						fn(monsList)
					}
				})


			})


		})

	})
}