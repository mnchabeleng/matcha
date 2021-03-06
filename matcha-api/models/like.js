'use strict'
const db = require('../db/connect')

exports.createLike = (data, callback) => {
    const query = 'INSERT INTO likes(sender, reciever) VALUES(?, ?)'
    db.query(query, [data.sender, data.reciever], (err, res) => {
        if(err) throw err.message
        callback(res)
    })
}

exports.deleteLike = (data, callback) => {
    const query = 'DELETE FROM likes WHERE sender = ? AND reciever = ?'
    db.query(query, [data.sender, data.reciever], (err, res) => {
        if(err) throw err.message
        callback(res)
    })
}