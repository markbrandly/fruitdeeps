const fs = require('fs')
const csv = require('csv-parser')
const db = require('../server/database.js')
const sql = `insert into rsitems.monster (name, version, imageId, combat, version_number) 
				values (?, ?, 
					(select imageId from rsitems.image where imageName = ?), 
				?, ?)`
bonuslist = ['hitpoints', 'att', 'str', 'def', 'mage', 'range', 'attbns', 'strbns', 'amagic', 'mbns', 'arange', 'rngbns', 'dstab', 'dslash', 'dcrush', 'dmagic', 'drange']

const insertupdate = `INSERT INTO rsitems.monster_stat (monsterId, category, value)
VALUES (?, ?, ?)
ON DUPLICATE KEY UPDATE
   value = ?`

const attribSql = "insert into rsitems.monster_attributes (monsterId, attribute) values (?, ?)"

var errList = []

fs.createReadStream('monster stats - 2021-03-20 monster stats.csv')
    .pipe(csv())
    .on('data', (row) => {
        var filename = row.image
        filename = filename.replace("[[File:", "")
        filename = filename.replace("]]", "")
        filename = filename.split('|')[0]
        db.con.query(sql, [row.name, row.version, filename, parseInt(row.combat), parseInt(row.version_number) || null], (err1, res1) => {

        })
        db.con.query("SELECT idmonster FROM rsitems.monster where name = ? and version = ? and combat = ?", [row.name, row.version, parseInt(row.combat) || null], (err, res) => {
            err && console.log(err);
            if (res && res.length > 0) {
                bonuslist.forEach((bonus) => {
                    db.con.query(insertupdate, [res[0].idmonster, bonus, parseInt(row[bonus]) || null, parseInt(row[bonus]) || null], (e, r) => { e && console.log(e) })
                })

                var attribList = row.attributes.split(',')
                if (attribList[0] !== '') {
                    attribList.forEach((attrib) => {
                        console.log(res[0].idmonster, attrib)

                        db.con.query(attribSql, [res[0].idmonster, attrib], (e, r) => {
                            e && console.log(e)
                            // console.log('asas')
                        });
                    })
                }
            }

        })
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });