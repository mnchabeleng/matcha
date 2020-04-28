'use strict'
const express = require('express')
const app = express()
const cities = require('./data/SouthAfricanCities.json')

const port = 3330
app.listen(port, () => {
    console.log('Server running on localhost:' + port)
})

// cors hanlding
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method === 'OPTIONS')
    {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE')
        return res.status(200).json({})
    }
    next()
})

app.get('/cities', (req, res, next) => {
	res.status(200).json(cities)
})
