'use strict'
const db = require('../db/connect')

exports.createMessage = (data, callback) => {
    const query = 'INSERT INTO messages(sender, reciever, message) VALUES(?, ?, ?)'
    db.query(query, [data.sender, data.reciever, data.message], (err, res) => {
        if(err) throw err.message
        callback(res)
    })
}

exports.getMessages = (data, callback) => {
    const query = 'SELECT * FROM messages WHERE (sender = ? AND reciever = ?) OR (sender = ? AND reciever = ?)'
    db.query(query, [data.admin, data.user, data.user, data.admin], (err, res) => {
        if(err) throw err
        callback(res)
    })
}