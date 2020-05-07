'use strict'
const db = require('../db/connect')

exports.createMessage = (data, callback) => {
    const query = 'INSERT INTO messages(sender, reciever, message) VALUES(?, ?, ?)'
    db.query(query, [data.sender, data.reciever, data.message], (err, res) => {
        if(err) throw err.message
        callback(res)
    })
}

exports.getUsers = (data, callback) => {
    const query = 'SELECT sender, reciever FROM messages WHERE sender = ? OR reciever = ?'
    db.query(query, [data.admin, data.admin], (err, res) => {
        if(err) throw err
        callback(res)
    })
}

exports.getMessages = (data, callback) => {
    const query = ''
}