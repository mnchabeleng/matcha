'use strict'
const express = require('express')
const router = express.Router()
const matchModel = require('../models/match')

router.route('/')
.get((req, res, next) => {
    const data = {
        user: req.tokenData.uname
    }
    matchModel.getMatches(data, (result) => {
        res.status(200).json(result)
    })
})
.delete((req, res, next) => {
    res.json('delete match')
})

module.exports = router

