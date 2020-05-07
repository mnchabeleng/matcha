'use strict'
const express = require('express')
const router = express.Router()
const validate = require('../helpers/validate')
const userModel = require('../models/user')

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    userModel.getUserById(id, (result) => {
        res.status(200).json(result)
    })
})

router.put('/location', (req, res, next) => {
    const validations = {}
    const data = {
        id: req.tokenData.id,
        location: {city: req.body.location, lat: req.body.lat, lng: req.body.lng}
    }
    console.log(data)
    
    validations.location = validate.location(data.location, {
        required: 'Select a location'
    })

    if(validations.location != false)
        res.status(200).json({status:false, validation: true, message:validations})
    else
        res.status(200).json({status:true, message:'Location has been updated'})
})

router.put('/interests', (req, res, next) => {
    const data = {
        id: req.tokenData.id,
        interests: req.body.interests
    }
    console.log(data)
    res.status(200).json(data)
})

router.put('/bio', (req, res, next) => {
    const data = {
        id: req.tokenData.id,
        bio: req.body.bio
    }
})

router.put('/password', (req, res, next) => {
    const body = {
        id: req.tokenData.id,
        password_old: req.body.password_old,
        password: req.body.password,
        password_repeat: req.body.password_repeat
    }
    
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
})

module.exports = router