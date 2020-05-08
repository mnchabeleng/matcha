'use strict'
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validate = require('../helpers/validate')
const dotenv = require('dotenv').config()
const {
    JWT_SECRET_KEY
} = process.env
const userModel = require('../models/user')

router.post('/login', (req, res, next) => {
    const email = req.body.email
    const pass = req.body.password
    function invalidLogin(){
        const error = new Error('Invalid login attempt')
        error.status = 401
        next(error)
    }

    if (email && pass)
    {
        userModel.getUserByEmail(email, (data) => {
            if (data)
            {
                bcrypt.compare(pass, data.pass, function(err, result) {
                    if (err)
                    {   
                        const error = new Error(err.message)
                        error.status = 500
                        next(error)
                    }
                    else
                    {
                        if (result === true)
                        {
                            const tokenData = {
                                id: data.id,
                                uname: data.uname,
                                email: data.email,
                                city: data.city,
                                lat: data.lat,
                                lng: data.lng
                            }
                            const token = jwt.sign(tokenData, JWT_SECRET_KEY, {expiresIn: '1h'})
                            res.status(200).json({
                                status: true,
                                token: token
                            })
                        }
                        else
                        {
                            invalidLogin()
                        }
                    }
                })
            }
            else
            {
                invalidLogin()
            }
        })
    }
    else
    {
        const error = new Error('Missing input(s)')
        error.status = 401
        next(error)
    }
})

module.exports = router
