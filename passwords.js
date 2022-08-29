import dotenv from 'dotenv'
dotenv.config()


const pass = {
	username: 'root',
	password: process.env.MYSQL_PASSWORD,
	port: process.env.MYSQL_PORT
};

export default pass