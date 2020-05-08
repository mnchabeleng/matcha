'use strict'
const express = require('express')
const router = express.Router()
const validate = require('../helpers/validate')
const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')
const imgUpload = require('express-fileupload')
const dotenv = require('dotenv').config()
const {
    ROOT_URL
} = process.env

router.use(imgUpload())

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    userModel.getUserById(id, (result) => {
        res.status(200).json(result)
    })
})

router.put('/location', (req, res, next) => {
    const validations = {}
    const body = {
        id: req.tokenData.id,
        location: {city: req.body.location, lat: req.body.lat, lng: req.body.lng}
    }
    
    validations.location = validate.location(body.location, {
        required: 'Select a location from the list'
    })

    if(validations.location != false)
        res.status(200).json({status:false, validation: true, message:validations})
    else{
        const data = {
            id: body.id,
            city: body.location.city,
            lat: body.location.lat,
            lng: body.location.lng
        }
        userModel.updateLocation(data, (result) => {
            req.tokenData.lat = data.lat
            req.tokenData.lng = data.lng
            res.status(200).json({status:true, message:'Location has been updated'})
        })
    }
})

router.put('/interests', (req, res, next) => {
    const validations = {}
    const body = {
        id: req.tokenData.id,
        interests: req.body.interests
    }
    validations.interests = validate.interests(body.interests, {
        required: 'An interest is required'
    })
    if(validations.interests != false)
        res.status(200).json({status:false, validation: true, message:validations})
    else{
        userModel.updateInterests(body, (result) => {
            res.status(200).json({status:true, message:'Interests has been updated'})
        })
    }
})

router.put('/bio', (req, res, next) => {
    const validations = {}
    const body = {
        id: req.tokenData.id,
        bio: req.body.bio.replace(/<\/?[^>]+(>|$)/g, "")
    }
    validations.bio = validate.bio(body.bio, {
        required: 'Bio is required'
    })
    if(validations.bio != false)
        res.status(200).json({status:false, validation: true, message:validations})
    else{
        userModel.updateBio(body, (result) => {
            res.status(200).json({status:true, message:'Bio has been updated'})
        })
    }
})

router.put('/password', (req, res, next) => {
    const validations = {}

    const body = {
        id: req.tokenData.id,
        password_old: req.body.password_old,
        password: req.body.password,
        password_repeat: req.body.password_repeat
    }

    validations.password_old = validate.password_old(body.password_old, {
        required: 'Old password required'
    })

    validations.password = validate.password(body.password, body.password_repeat, {
        required: 'Password required',
        invalid: 'Password should be at least 4 characters in length and should include at least one upper case letter, one number, and one special character',
        match: 'Password match error'
    })

    validations.password_repeat = validate.password_repeat(body.password, body.password_repeat, {
        required: 'Confirm password',
        invalid: 'Password should be at least 4 characters in length and should include at least one upper case letter, one number, and one special character',
        match: 'Password match error'
    })

    if(validations.password_old != false || validations.password != false || validations.password_repeat != false)
        res.status(200).json({status:false, validation: true, message:validations})
    else{
        userModel.getPassword(body.id, (result) => {
            if(bcrypt.compareSync(body.password_old, result.pass)){
                const data = {
                    id: body.id,
                    pass: bcrypt.hashSync(body.password, 10)
                }
                userModel.updatePassword(data, (result) => {
                    res.status(200).json({status:true, message:'Password has been updated'})
                })
            }
            else
                res.status(200).json({status:false, message:'Invalid password'})
        })
    }
})

router.put('/images/:id', (req, res, next) => {
    const validations = {}
    const col = 'image' + req.params.id
    const body = {
        id: req.tokenData.id,
        col: col,
        image: (req.files)?req.files.image:null
    }

    validations.image = validate.image(body.image,{
        type:'Only .png, .jpg and .jpeg format allowed',
        size:'Max image file size is 1mb',
        required:'Select an image to upload'
    })

    if(validations.image != false){
        res.status(200).json({status: false,validation: true,messages: validations})
    }else{
        const image = body.image
        let imageExt = ''
        if(image.mimetype == 'image/png')
            imageExt = 'png'
        if(image.mimetype == 'image/jpg')
            imageExt = 'jpg'
        if(image.mimetype == 'image/jpeg')
            imageExt = 'jpeg'
        image.name = uuidv4() + '.' + imageExt
        const imgSrc = 'img/' + image.name
        const data = {
            id: body.id,
            col: body.col,
            image: ROOT_URL + imgSrc
        }
        image.mv(imgSrc, (err) => {
            if(err){
                const error = new Error(err.message)
                error.status = 500
                next(error)
            }else{
                userModel.updateImages(data, (result) => {
                    res.status(200).json({status:true, image:data.image,message:'Image uploaded'})
                })
            }
        })
    }
})

module.exports = router