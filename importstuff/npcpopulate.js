// const fs = require("fs");
// const csv = require("csv-parser");

import fs from "fs";
import csv from "csv-parser";

import con from "../database/connection.js";

const bonuslist = [
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

fs.createReadStream("./wiki_monster_data.csv")
	.pipe(csv())
	.on("data", async (row) => {
		//Check if row is populated
		if (!("name" in row)) {
			return;
		}

		//parse image name
		var filename = row.image;
		filename = filename.replace("[[File:", "");
		filename = filename.replace("]]", "");
		filename = filename.split("|")[0];

		try {
			await con("monster").del().where("idmonster", "!=", 0);
			await con("monster_stat").del().where("monsterId", "!=", 0);
			await con("monster_attributes").del().where("monsterId", "!=", 0);
			await con("monster").insert({
				name: row.name,
				version: row.version,
				imageName: filename,
				combat: parseInt(row.combat) || 0,
				version_number: parseInt(row.version_number) || null,
			});

			con("monster")
				.select("idmonster")
				.where({
					name: row.name,
					version: row.version,
					combat: parseInt(row.combat) || 0,
				})
				.then((rows) => {
					if (rows.length < 1) {
						return;
					}
					const id = rows[0].idmonster;
					// console.log(rows);
					bonuslist.forEach((bonus) => {
						con("monster_stat")
							.insert({
								monsterId: id,
								category: bonus,
								value: parseInt(row[bonus]) || 0,
							})
							.then((a) => {
								console.log(a, "did it work");
							});
					});

					var attribList = row.attributes.split(",").map((f) => {
						return f.trim();
					});

					if (attribList[0] !== "") {
						attribList.forEach((attrib) => {
							if (attrib.includes("vampyre")) {
								attrib = "vampyre";
							}

							con("monster_attributes")
								.insert({
									monsterId: id,
									attribute: attrib,
								})
								.then((a) => {
									console.log(a);
								});
						});
					}
				});

			console.log("successful", row.name);
		} catch (e) {
			console.log(e);
		}
	})
	.on("end", () => {
		console.log("CSV file successfully processed");
	});
