'use strict'
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const {
    JWT_SECRET_KEY
} = process.env

router.route('/')
.post((req, res, next) => {
    try
    {
        const decoded = jwt.verify(req.body.token, JWT_SECRET_KEY)
        const authData = {
            id: decoded.id,
            username: decoded.uname,
            email: decoded.email
        }
        res.status(200).json({
            status: true,
            authData: authData
        })
    }
    catch (err)
    {
        res.status(401).json({
            status: false
        })
    }
})

module.exports = router