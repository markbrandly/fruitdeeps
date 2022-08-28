import dotenv from 'dotenv'
dotenv.config()


const pass = {
	username: 'root',
	password: process.env.MYSQL_PASSWORD
};

export default pass