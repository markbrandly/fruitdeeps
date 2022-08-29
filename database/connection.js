import user from "../passwords.js";

import knex from "knex";
export default knex({
	client: "mysql",
	connection: {
		host: "localhost",
		database: "rsitems",
		user: user.username,
		password: user.password,
		port: user.port,
		// user: "root",
		// password: "root",
		charset: "utf8",
	},
});
