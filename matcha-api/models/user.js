'use strict'
const db = require('../db/connect')
const userRows = 'id, uname, email, fname, lname, bio, dob, gender, image,lat, lng, city, interests'

exports.getUsers = (data, callback) => {
    const user = data.user
    const gender = '%' + data.gender + '%'
    const city = '%' + data.city + '%'
    const orderby = data.orderby
    const ageRange = data.ageRange
    const query = 'SELECT ' + userRows + ' FROM users WHERE uname NOT IN(SELECT reciever AS uname FROM likes WHERE sender = ?) AND uname != ? AND gender LIKE ? AND city LIKE ? ' + ageRange + ' ' + orderby
    db.query(query, [user, user, gender, city], (err, res) => {
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

exports.createUser = (data, callback) => {
    const userData = []
    const query = 'INSERT INTO users(uname, email, fname, lname, bio, dob, gender, pass, image, lat, lng, city, interests) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    db.query(query, data, (err, res) => {
        
    })
}

exports.updateLocation = (data, callback) => {

}

exports.updateInterests = (data, callback) => {

}

exports.updatePassword = (data, callback) => {

}

exports.updateImages = (data, callback) => {
    
}