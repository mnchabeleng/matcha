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

router.route('/')
.get((req, res, next) => {
    res.status(200).send({
        users: {
            type: 'GET',
            url: 'http://localhost:3300/users'
        }
    })
})

router.route('/login')
.get((req, res, next) => {
    res.status(200).send('Login')
})
.post((req, res, next) => {
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
                                email: data.email
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

router.route('/logout')
.post((req, res, next) => {
    res.status(200).json('POST: Logout')
})

router.route('/signup')
.get((req, res, next) => {
    bcrypt.hash('password', 10, function(err, hash) {
        console.log(hash)
        res.status(200).json('Bcrypt hass(password) = ' + hash)
    })
})
.post((req, res, next) => {
    /*
    const body = {
        username: req.body.username,
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        image: req.body.image,
        dob: req.body.dob,
        bio: req.body.bio,
        password: req.body.password,
        password_repeat: req.body.password_repeat
    }
    */
    const validations = {}
    //console.log(Object.keys(validations).length)
    const body = {
        username: 'bbarnet0',
        email: 'bbarnet0@engadget.com',
        first_name: 'john',
        last_name: 'doe',
        gender: 'm',
        image: '',
        dob: '',
        bio: '',
        password: '@2Aa',
        password_repeat: '@2Aa'
    }
    validations.username = validate.username(body.username, {
        required: 'Username is required',
        invalid: 'Invalid username'
    })
    validations.email = validate.email(body.email, {
        required: 'Email is required',
        invalid: 'Invalid email address'
    })
    validations.first_name = validate.name(body.first_name, {
        required: 'First name is required',
        invalid: 'Invalid first name'
    })
    validations.last_name = validate.name(body.last_name, {
        required: 'Last name is required',
        invalid: 'Invalid last name'
    })
    validations.gender = validate.gender(body.gender, {
        invalid: 'Valid gander values are m or f'
    })
    validations.password = validate.password(body.password, body.password_repeat, {
        required: 'Password required',
        invalid: 'Valid password instructions',
        match: 'Password match error'
    })
    validations.password_repeat = validate.password_repeat(body.password, body.password_repeat, {
        required: 'Confirm password',
        invalid: 'Valid password instructions',
        match: 'Password match error'
    })

    
    const checkUsername = new Promise((resolve) => {
        userModel.getUserByUsername(body.username, data => resolve(data))
    })

    const checkEmail = new Promise((resolve) => {
        userModel.getUserByEmail(body.email, data => resolve(data))
    })

    Promise.all([checkUsername, checkEmail]).then((data) => {
        
        if (data[0])
            validations.username = body.username + ' is already taken'
        if (data[1])
            validations.email = body.email + ' is already taken'
        res.status(200).json(validations)
        
    })

})
.patch((req, res, next) => {
    res.status(200).json()
})

module.exports = router
