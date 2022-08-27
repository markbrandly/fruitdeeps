// const db = require("./database.js");
import db from "../database.js";
import con from "../database/connection.js"

// const db = {};
const bonusList = [
    "stabAttack",
    "slashAttack",
    "crushAttack",
    "magicAttack",
    "rangedAttack",
    "stabDefence",
    "slashDefence",
    "crushDefence",
    "magicDefence",
    "rangedDefence",
    "strength",
    "rangedStrength",
    "magicStrength",
    "prayer",
];
const monBonusList = [
    "hitpoints",
    "att",
    "str",
    "def",
    "mage",
    "range",
    "attbns",
    "strbns",
    "amagic",
    "mbns",
    "arange",
    "rngbns",
    "dstab",
    "dslash",
    "dcrush",
    "dmagic",
    "drange",
];

const blackList = [
    "(Locked)",
    "(0)",
    "(25)",
    "(50)",
    "(75)",
    "(100)",
    "(1)",
    "(2)",
    "(3)",
    "(4)",
    "(5)",
    "(6)",
    "(7)",
    "(8)",
    "(9)",
    "(10)",
    "Craw's bow (Uncharged)",
    "Tome of fire (Empty)",
    "Tome of fire (Empty)",
    "(Nightmare Zone)",
    "(New)",
];

var searchItemSql = `SELECT a.itemId as itemId, a.itemRsId as itemRsId, a.itemName as itemName,
        a.itemType as itemType, c.weaponType as category, c.attackSpeed as speed
        FROM rsitems.items a 
        left join rsitems.weapon_info c
        on a.itemId = c.itemId
        WHERE a.itemName  
        like ?`;

blackList.forEach((item) => {
    searchItemSql += `\n and a.itemName not like "%` + item + `%"`;
});

searchItemSql = searchItemSql + `\nORDER BY a.itemName LIMIT ?`;

//this code sucks pissing me off
const searchItems = function (str, limit, fn) {
    str = "%".concat(str).concat("%");
    const sql = searchItemSql;
    const statSql = "SELECT * FROM rsitems.stat s WHERE s.itemId = ?";
    var fnCalled = false;
    db.query(sql, [str, limit], function (error, results) {
        console.log(error, results);
        var items = [];
        const resLen = results.length;
        if (resLen == 0) {
            fn([]);
        }
        results.forEach(function (itemRow) {
            var itemObj = {};
            itemObj.name = itemRow.itemName
                .replace(" (Normal)", "")
                .replace(" (Regular)", "");
            itemObj.slot = itemRow.itemType;
            itemObj.bonuses = Array(bonusList.length).fill(0); // [0, 0, ... ,0]
            db.query(statSql, itemRow.itemId, function (error, res) {
                res.forEach(function (stat) {
                    itemObj.bonuses[bonusList.indexOf(stat.category)] =
                        stat.value;
                });

                itemObj.id = itemRow.itemRsId
                if (itemRow.category) {
                    itemObj.category = itemRow.category;
                }
                if (itemRow.speed) {
                    itemObj.speed = itemRow.speed;
                }
                items.push(itemObj);
                if (items.length == resLen && !fnCalled) {
                    items.sort((a, b) => {
                        let aSum = 0;
                        a.bonuses.forEach((bonus) => {
                            aSum += bonus;
                        });
                        let bSum = 0;
                        b.bonuses.forEach((bonus) => {
                            bSum += bonus;
                        });

                        if (bSum < aSum) {
                            return -1;
                        } else if (bSum > aSum) {
                            return 1;
                        }
                        return 0;
                    });
                    fnCalled = true;
                    fn(items);
                }
            });
        });
    });
};

//flyff does not get an annotation
const searchMonsterNames = function (str, limit, fn) {
    str = "%".concat(str).concat("%");
    const sql =
        "select name from rsitems.monster \
        where name is not null and name like ? \
        group by name \
        limit ?";

    db.query(sql, [str, limit], (error, results) => {
        var nameList = results.map((result) => {
            return result.name;
        });
        fn(nameList);
    });
};

const getMonstersByName = function (str, fn) {
    const sql = `
        select a.idmonster, a.name, a.version, a.combat, a.version_number, a.imageName
        from rsitems.monster as a
        where a.name = ?
        order by a.version
        `;

    const statsql = "select * from rsitems.monster_stat where monsterId = ?";

    const wknsSql =
        "select * from rsitems.monster_attributes where monsterId = ?";

    db.query(sql, [str], (e, res) => {
        e && console.log(e);
        var monsList = [];
        res.forEach((mon) => {
            var monObj = {};
            monObj.name = mon.name;
            monObj.version = mon.version;
            monObj.combat = mon.combat;
            monObj.stats = {};
            monObj.image = mon.imageName
            monObj.attributes = [];
            db.query(statsql, [mon.idmonster], (e, res2) => {
                e && console.log(e);
                console.log(statsql, mon.idmonster);
                res2.forEach((stat) => {
                    if (monBonusList.includes(stat.category)) {
                        monObj.stats[stat.category] = stat.value;
                    }
                });

                db.query(wknsSql, [mon.idmonster], (e, res3) => {
                    e && console.log(e);
                    res3.forEach((wkns) => {
                        monObj.attributes.push(wkns.attribute);
                    });
                    monsList.push(monObj);
                    if (monsList.length == res.length) {
                        fn(monsList);
                    }
                });
            });
        });
    });
};

const addItem = async (item, fn) => {
    const example = {
        "name":"Osmumten's fang",
        "slot":"2h",
        "bonuses":[105,75,0,0,0,0,0,0,0,0,103,0,0,0],
        "id":26219,
        "category": "Stab Sword",
        "speed":5
    }

    //Insert / update item
    return con("items").insert({
        itemName: item.name,
        itemType: item.slot,
        itemRsId: item.id,
    })
    .onConflict('itemName')
    .merge()

    //Find the unique key for the item
    .then(() => {
        return con("items")
            .select("itemId")
            .where({ itemName: item.name});
    })

    //Insert the stats into the table
    .then((rows) => {
        if(rows.length < 1){
            return null
        }
        const promises = []
        for(let i = 0; i < bonusList.length; i++){
            promises.push(
                con("stat")
                .insert({
                    itemId: rows[0].itemId,
                    category: bonusList[i],
                    value: item.bonuses[i]
                })
                .onConflict()
                .merge()
            )
        }

        if(item.slot === "2h" || item.slot === "weapon"){
            promises.push(
                con("weapon_info")
                .insert({
                    itemId: rows[0].itemId,
                    weaponType: item.category,
                    attackSpeed: item.speed
                })
                .onConflict('itemId')
                .merge()
            )
        }
        return Promise.all(promises)
    })
}


export default { getMonstersByName, searchMonsterNames, searchItems, addItem };
