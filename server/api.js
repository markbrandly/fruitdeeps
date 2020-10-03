const db = require('./database.js')
const bonusList = ['stabAttack', 'slashAttack', 'crushAttack', 'magicAttack', 'rangedAttack', 'stabDefence', 'slashDefence', 'crushDefence', 'magicDefence', 'rangedDefence', 'strength', 'rangedStrength', 'magicStrength', 'prayer']
const monBonusList = ['hitpoints', 'att', 'str', 'def', 'mage', 'range', 'attbns', 'strbns', 'amagic', 'mbns', 'arange', 'rngbns', 'dstab', 'dslash', 'dcrush', 'dmagic', 'drange']


//this code sucks
exports.searchItems = function(str, limit, fn){
	str = "%".concat(str).concat("%")
	const sql = `SELECT a.itemId as itemId, a.itemName as itemName,
		a.itemType as itemType, c.weaponType as category, c.attackSpeed as speed
		FROM rsitems.items a 
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
			itemObj.slot = itemRow.itemType
			itemObj.bonuses = Array(bonusList.length).fill(0) // [0, 0, ... ,0]
			db.con.query(statSql, itemRow.itemId, function(error, res){
				res.forEach(function(stat){
					itemObj.bonuses[bonusList.indexOf(stat.category)] = stat.value;
				})

				if(itemRow.category){
					itemObj.category = itemRow.category
				}
				if(itemRow.speed){
					itemObj.speed = itemRow.speed
				}
				items.push(itemObj)
				if(items.length == resLen && !fnCalled){
					fnCalled = true
					fn(items);
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
	const sql=`
		select a.idmonster, a.name, a.version, a.combat, b.localPath, a.version_number
		from rsitems.monster as a
		left join rsitems.image as b 
    	on a.imageId = b.imageId 
		where a.name = ?
		order by a.version
		`

	const statsql = "select * from rsitems.monster_stat where monsterId = ?"

	const wknsSql = "select * from rsitems.monster_attributes where monsterId = ?"

	db.con.query(sql, [str], (e, res) => {
		e && console.log(e)
		var monsList = []
		res.forEach((mon) => {
			var monObj = {}
			monObj.name = mon.name
			monObj.image = mon.localPath
			monObj.version = mon.version
			monObj.combat = mon.combat
			monObj.stats = {}
			monObj.attributes = []
			db.con.query(statsql, [mon.idmonster], (e, res2) => {
				e && console.log(e)
				console.log(statsql, mon.idmonster)
				res2.forEach((stat) =>{
					if (monBonusList.includes(stat.category)){
						monObj.stats[stat.category] = stat.value
					}
				})

				db.con.query(wknsSql, [mon.idmonster], (e, res3)=>{
					e && console.log(e)
					res3.forEach((wkns) => {
						monObj.attributes.push(wkns.attribute)
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