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
    socketPath: SOCKETPATH
})

exports.createDatabase = () => {
    return new Promise((resolve) => {
        connect.connect((err) => {
            if (err)
                throw err.message
            
            const query = `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`
            connect.query(query, (err) => {
                if (err) throw err.message
                connect.end()
                resolve('Matcha database created')
            })
        })
    })
}
