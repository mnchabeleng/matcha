'use strict'

const db = require('./connect')
const fs = require('fs')

exports.users = () => {
    return new Promise((resolve) => {
        const query = fs.readFileSync('./db/tables/users.sql').toString()
        db.query(query, (err) => {
            if (err) throw err.message;
            resolve()
        })
    })
}

exports.cities = () => {
    return new Promise((resolve) => {
        const query = fs.readFileSync('./db/tables/cities.sql').toString()
        db.query(query, (err) => {
            if (err) throw err.message;
            resolve()
        })
    })
}

exports.likes = () => {
    return new Promise((resolve) => {
        const query = fs.readFileSync('./db/tables/likes.sql').toString()
        db.query(query, (err) => {
            if (err) throw err.message;
            resolve()
        })
    })
}

exports.messages = () => {
    return new Promise((resolve) => {
        const query = fs.readFileSync('./db/tables/messages.sql').toString()
        db.query(query, (err) => {
            if (err) throw err.message;
            resolve()
        })
    })
}

exports.notifications = () => {
    return new Promise((resolve) => {
        const query = fs.readFileSync('./db/tables/notifications.sql').toString()
        db.query(query, (err) => {
            if (err) throw err.message;
            resolve()
        })
    })
}
