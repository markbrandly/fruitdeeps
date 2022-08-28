import user from "../passwords.js";

import knex from "knex";
export default knex({
	client: "mysql",
	connection: {
		host: "localhost",
		database: "rsitems",
		user: user.username,
		password: user.password,
		port: "3306",
		// user: "root",
		// password: "root",
		charset: "utf8",
	},
});
