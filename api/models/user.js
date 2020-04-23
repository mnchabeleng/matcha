'use strict'
const db = require('../db/connect')
const userRows = 'id, uname, email, fname, lname, bio, dob, gender, image, online, lat, lng, city, interests'

exports.getUsers = (data, callback) => {
    const gender = '%' + data.gender + '%'
    const city = '%' + data.city + '%'
    const orderby = data.orderby
    const ageRange = data.ageRange
    const query = 'SELECT ' + userRows + ' FROM users WHERE gender LIKE ? AND city LIKE ? ' + ageRange + ' ' + orderby
    db.query(query, [gender, city], (err, res) => {
        if (err) throw err.message
        callback(res)
    })
}

exports.getUserById = (id, callback) => {
    const query = `SELECT ${userRows} FROM users WHERE id = ? LIMIT 1`
    db.query(query, [id], (err, res) => {
        if (err) throw err.message
        callback(res[0])
    })
}

exports.getUserByUsername = (username, callback) => {
    const query = 'SELECT * FROM users WHERE uname = ? LIMIT 1'
    db.query(query, [username], (err, res) => {
        if (err) throw err.message
        callback(res[0])
    })
}

exports.getUserByEmail = (email, callback) => {
    const query = 'SELECT * FROM users WHERE email = ? LIMIT 1'
    db.query(query, [email], (err, res) => {
        if (err) throw err.message
        callback(res[0])
    })
}

exports.updateModifyDate = (callback) => {
    const query = 'UPDATE users SET modify_date = current_timestamp'
    db.query(query, (err, result) => {
        if (err) throw err.message
        callback(result)
    })
}

exports.createUser = (body, callback) => {
    const data = []
    const query = ''
    db.query(query, data, (err, res) => {
        
    })
}