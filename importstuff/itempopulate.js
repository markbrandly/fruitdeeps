// const https = require("https");

// const ImageDataURI = require("image-data-uri");

import https from "https";
import api from '../lib/api.js'
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

const boxBonusList = [
	"attack_stab",
	"attack_slash",
	"attack_crush",
	"attack_magic",
	"attack_ranged",
	"defence_stab",
	"defence_slash",
	"defence_crush",
	"defence_magic",
	"defence_ranged",
	"melee_strength",
	"ranged_strength",
	"magic_damage",
	"prayer"
]

// const slot = "weapon";

const slots = [
	// "cape",
	// "head",
	// "neck",
	// "ammo",
	"weapon",
	// "shield",
	// "body",
	// "legs",
	// "hands",
	// "feet",
	// "ring",
	// "2h",
];

const nameList = [];

const addSlot = (slot, callback) => {
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
				resp.on("end", async () => {
					const wObj = JSON.parse(data, false, 2);
					for (const [key, value] of Object.entries(wObj)) {
						const item = {
							name: value.wiki_name,
							slot: slot,
							bonuses: boxBonusList.map((bonus) => value.equipment[bonus]),
							id: value.id,
						}

						if (slot === '2h' || slot === 'weapon'){
							item.category = categoryTable[value.weapon['weapon_type']]
							item.speed = value.weapon.attack_speed
						}

						let dataURI =
							"data:image/png;base64," + value.icon;
						let path =
							"./public/assets/item_images/" + value.id + ".png";
						ImageDataURI.outputFile(dataURI, path).then(()=>
							console.log("image created", value.id +".png")
						);
						await api.addItem(item).then(()=>{console.log("added", item.name)})
					}
					callback(slot)
				});
			}
		)
		.on("error", (err) => {
			console.log("Error: " + err.message);
			callback(slot)
		});
}

const nextSlot = (slot) => {
	let index = slots.findIndex(s => s === slot)
	if(index === slots.length){
		console.log("all slots complete")
		process.exit()
	}
	else{
		addSlot(slots[index + 1], nextSlot)
	}
}

addSlot('cape', nextSlot)
