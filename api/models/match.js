'use strict'
const db = require('../db/connect')
const userRows = 'id, uname, email, fname, lname, bio, dob, gender, image, lat, lng, city, interests'

exports.getMatches(data, () => {
    const query = 'SELECT ' + userRows + ' from users WHERE uname IN(SELECT sender AS uname) AND uname IN()'
})