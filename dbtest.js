import db from "./database/connection.js";

// db.from("items").select("*").orderBy('itemRsId', 'desc').where({itemType: "weapon"}).limit(20).then(console.log);
db.from("weapon_info").select("*").then(console.log)
// db.from("weapon_info").select("*").where({weaponType: null}).then(console.log)