'use strict'
const db = require('../db/connect')

exports.getCities = (data, callback) => {
    let search = '%' + data.query + '%'
    const query = 'SELECT country, accent_city, city, lat, lng FROM cities WHERE city LIKE ?'
    db.query(query, [search], (err, res) => {
        if(err) throw err
        callback(res)
    })
}