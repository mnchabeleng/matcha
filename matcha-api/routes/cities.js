'use strict'
const express = require('express')
const router = express.Router()
const cityModel = require('../models/city')

router.get('/', (req, res, next) => {
    const data = {
        query: (req.query.q)?req.query.q:''
    }
    cityModel.getCities(data, (result) => {
        const page = 1
		const limit = 10
	
		const startIndex = (page - 1) * limit
        const endIndex = page * limit

        res.status(200).json(result.slice(startIndex, endIndex))
    })
})

module.exports = router