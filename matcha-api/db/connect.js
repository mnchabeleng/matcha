'use strict'
const mysql = require('mysql')
const dotenv = require('dotenv').config()
const {
    DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, SOCKETPATH
} = process.env

const connect = mysql.createConnection({
    host      : DB_HOST,
    port      : DB_PORT,
    user      : DB_USER,
    password  : DB_PASSWORD,
    database  : DB_NAME,
    socketPath: SOCKETPATH
})

connect.connect((err) => {
	if (err)
		throw err.message
		//console.log('connection failed\n' + JSON.stringify(err, undefined , 2))
});

module.exports = connect