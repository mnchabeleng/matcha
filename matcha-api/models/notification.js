'use strict'
const db = require('../db/connect')

exports.getNotifactions = (data, callback) => {
    const query = 'SELECT * FROM notifications WHERE reciever = ? ORDER BY id DESC'
    db.query(query, [data], (err, res) => {
        if (err) throw err.message
        callback(res)
    })
}

exports.createNotification = (data, callback) => {
    const query = 'INSERT INTO notifications(sender, reciever, type, description) VALUES (?, ?, ?, ?)'
    db.query(query, [data.sender, data.reciever, data.type, data.description], (err, res) => {
        if (err) throw err.message
        callback(res)
    })
}

exports.deleteNotification = (data, callback) => {
    const query = 'DELETE FROM notifications WHERE id = ? AND reciever = ?'
    db.query(query, [data.id, data.reciever], (err, res) => {
        if (err) throw err.message
        callback(res)
    })
}