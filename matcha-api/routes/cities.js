'use strict'
const express = require('express')
const router = express.Router()
const cityModel = require('../models/city')

router.get('/', (req, res, next) => {
    const data = {
        query: (req.query.q)?req.query.q:''
    }
    cityModel.getCities(data, (result) => {
        res.status(200).json(result)
    })
})

module.exports = router