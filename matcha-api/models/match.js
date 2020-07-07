'use strict'
const db = require('../db/connect')
const userRows = 'id, uname, email, fname, lname, bio, dob, gender, image,lat, lng, city, interests, image1, image2, image3, image4, image5, views, likes'

exports.getMatches = (data, callback) => {
    const query = 'SELECT ' + userRows + ' from users WHERE uname IN(SELECT reciever AS uname FROM likes WHERE sender = ?) AND uname IN(SELECT sender AS uname FROM likes WHERE reciever = ?)'
    db.query(query, [data.user, data.user], (err, res) => {
        if(err) throw err.message
        callback(res)
    })
}