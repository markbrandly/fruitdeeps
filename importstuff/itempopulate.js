// const https = require("https");

// const ImageDataURI = require("image-data-uri");

import https from "https";
import ImageDataURI from "image-data-uri";

// const db = require("../server/database.js");

import con from "../database/connection.js";
const categoryTable = {
	chinchompas: "Chinchompas",
	slash_sword: "Slash Sword",
	stab_sword: "Stab Sword",
	thrown: "Thrown",
	crossbow: "Crossbow",
	staff: "Staff",
	pickaxe: "Pickaxe",
	blunt: "Blunt",
	axe: "Axe",
	spiked: "Spiked",
	unarmed: "Unarmed",
	banner: "Banner",
	whip: "Whip",
	spear: "Spear",
	claw: "Claws",
	polestaff: "Polestaff",
	bladed_staff: "Bladed Staff",
	"powered_staff": "Powered Staff",
	"2h_sword": "2h Sword",
	scythe: "Scythe",
	bow: "Bow",
	bulwark: "Bulwark",
	gun: "Gun",
	polearm: "Polearm",
	salamander: "Salamander",
};

const bonusTable = {
	attack_stab: "stabAttack",
	attack_slash: "slashAttack",
	attack_crush: "crushAttack",
	attack_magic: "magicAttack",
	attack_ranged: "rangedAttack",
	defence_stab: "stabDefence",
	defence_slash: "slashDefence",
	defence_crush: "crushDefence",
	defence_magic: "magicDefence",
	defence_ranged: "rangedDefence",
	melee_strength: "strength",
	ranged_strength: "rangedStrength",
	magic_damage: "magicStrength",
	prayer: "prayer",
};

// const slot = "weapon";

const slots = [
	"cape",
	"head",
	"neck",
	"ammo",
	"weapon",
	"shield",
	"body",
	"legs",
	"hands",
	"feet",
	"ring",
	"2h",
];

const nameList = [];
slots.forEach((slot) => {
	console.log(slot);
	https
		.get(
			"https://raw.githubusercontent.com/Flipping-Utilities/osrsbox-db/main/docs/items-json-slot/items-" +
				slot +
				".json",
			(resp) => {
				let data = "";

				// A chunk of data has been recieved.
				resp.on("data", (chunk) => {
					data += chunk;
				});

				// The whole response has been received. Print out the result.
				resp.on("end", () => {
					const wObj = JSON.parse(data, false, 2);
					const nameList = [];
					console.log(wObj.length);
					for (const [key, value] of Object.entries(wObj)) {
						console.log(value.wiki_name, slot, value.id);
						// con("weapon_info")
						// 	.del()
						// 	.where("itemId", "!=", 0)

						// 	.then(() => con("stat").del().where("itemId", "!=", 0))

						// 	.then(() => con("items").del().where("itemId", "!=", 0))

						// 	.then(() =>
						con("items")
							.insert({
								itemName: value.wiki_name,
								itemType: slot,
								itemRsId: value.id,
							})
							// )

							.then(() => {
								return con("items")
									.select("itemId")
									.where({ itemName: value.wiki_name });
							})

							.then((rows) => {
								// console.log(rows);
								if (rows.length < 1) {
									return;
								}
								const itemId = rows[0].itemId;

								for (const [key2, value2] of Object.entries(
									bonusTable
								)) {
									// db.con.query("insert into rsitems.stat (itemId, category, value) values ((select itemId from rsitems.items where itemName = ?), ?,?)", [value.wiki_name, value2, value.equipment[key2]], () =>{})
									con("stat")
										.insert({
											itemId: rows[0].itemId,
											category: value2,
											value: value.equipment[key2],
										})
										.then();
								}

								if (slot == "weapon" || slot == "2h") {
									console.log("weapon found", value.wiki_name)
									// console.log(itemId);
									// db.con.query("insert into rsitems.weapon_info (itemId, weaponType, attackSpeed) values ((select itemId from rsitems.items where itemName = ?), ?,?)", [value.wiki_name, categoryTable[value.weapon.weapon_type], value.weapon.attack_speed], ()=>{})
									con("weapon_info")
										.insert({
											itemId: itemId,
											weaponType:
												categoryTable[
													value.weapon["weapon_type"]
												],
											attackSpeed:
												value.weapon.attack_speed,
										})
										.then(()=>{
											console.log("weapon_info inserted", itemId)
										});
								}
								console.log(value.icon);
								let dataURI =
									"data:image/png;base64," + value.icon;
								let path =
									"../public/assets/item_images/" + value.id + ".png";

								console.log(dataURI, path);
								ImageDataURI.outputFile(dataURI, path).then(
									console.log
								);
							})
							.catch(console.log);

						if (nameList.includes(value.name)) {
							console.log(value.name);
						}
						nameList.push(value.name);
					}
				});
			}
		)
		.on("error", (err) => {
			console.log("Error: " + err.message);
		});
});
