'use strict'
const db = require('../db/connect')

exports.getCities = (data, callback) => {
    let search = '%' + data.query + '%'
    const query = 'SELECT DISTINCT country, accent_city, city, lat, lng FROM cities WHERE city LIKE ? ORDER BY accent_city LIMIT 5'
    db.query(query, [search], (err, res) => {
        if(err) throw err
        callback(res)
    })
}