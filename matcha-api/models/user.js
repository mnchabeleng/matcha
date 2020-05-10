'use strict'
const db = require('../db/connect')
const userRows = 'id, uname, email, fname, lname, bio, dob, gender, image,lat, lng, city, interests, image1, image2, image3, image4, image5, views, likes'

exports.getUsers = (data, callback) => {
    const user = data.user
    const gender = '%' + data.gender + '%'
    const city = '%' + data.city + '%'
    const interest = '%' + data.interest + '%'
    const orderby = data.orderby
    const ageRange = data.ageRange
    const query = 'SELECT ' + userRows + ' FROM users WHERE uname NOT IN(SELECT reciever AS uname FROM likes WHERE sender = ?) AND uname != ? AND gender LIKE ? AND city LIKE ? AND interests LIKE ? ' + ageRange + ' ' + orderby
    db.query(query, [user, user, gender, city, interest], (err, res) => {
        if (err) throw err.message
        callback(res)
    })
}

exports.getLocation = (id, callback) => {
    const query = 'SELECT * FROM city, lat, lng WHERE uname = ? LIMIT 1'
    db.query(query, [id], (err, res) => {
        if (err) throw err.message
        callback(res[0])
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

exports.getPassword = (id, callback) => {
    const query = 'SELECT pass FROM users WHERE id = ?'
    db.query(query, [id], (err, res) => {
        if(err) throw err
        callback(res[0])
    })
}

exports.updateModifyDate = (callback) => {
    const query = 'UPDATE users SET modify_date = current_timestamp'
    db.query(query, (err, res) => {
        if (err) throw err.message
        callback(res)
    })
}

exports.createUser = (data, callback) => {
    const userData = [data.uname, data.email, data.fname, data.lname, data.bio, data.dob, data.gender, data.pass, data.image, data.lat, data.lng, data.city, data.interests]
    const query = 'INSERT INTO users(uname, email, fname, lname, bio, dob, gender, pass, image, lat, lng, city, interests) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    db.query(query, userData, (err, res) => {
        if(err) throw err
        callback(res)
    })
}

exports.updateLocation = (data, callback) => {
    const query = 'UPDATE users SET city = ?, lat = ?, lng = ? WHERE id = ?'
    db.query(query, [data.city, data.lat, data.lng, data.id], (err, res) => {
        if(err) throw err
        callback(res)
    })
}

exports.updateInterests = (data, callback) => {
    const query = 'UPDATE users SET interests = ? WHERE id = ?'
    db.query(query, [data.interests, data.id], (err, res) => {
        if(err) throw err
        callback(res)
    })
}

exports.updateBio = (data, callback) => {
    const query = 'UPDATE users SET bio = ? WHERE id = ?'
    db.query(query, [data.bio, data.id], (err, res) => {
        if(err) throw err
        callback(res)
    })
}

exports.updatePassword = (data, callback) => {
    const query = 'UPDATE users SET pass = ? WHERE id = ?'
    db.query(query, [data.pass, data.id], (err, res) => {
        if(err) throw err
        callback(res)
    })
}

exports.updateImages = (data, callback) => {
    const query = `UPDATE users SET ${data.col} = ? WHERE id = ?`
    db.query(query, [data.image, data.id], (err, res) => {
        if(err) throw err
        callback(res)
    })
}

exports.addView = (id, callback) => {
    const query = 'UPDATE users SET views = views + 1 WHERE id = ?'
    db.query(query, [id], (err, res) => {
        if(err) throw err
        callback(res)
    })
}

exports.addLike = (id, callback) => {
    const query = 'UPDATE users SET likes = likes + 1 WHERE id = ?'
    db.query(query, [id], (err, res) => {
        if(err) throw err
        callback(res)
    })
}