'use strict'
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const imgUpload = require('express-fileupload')
const validate = require('../helpers/validate')
const userModel = require('../models/user')
const dotenv = require('dotenv').config()
const {
    ROOT_URL
} = process.env

router.use(imgUpload())

router.post('/', (req, res, next) => {
    const validations = {}

    const body = {
        username: req.body.username,
        email: req.body.email,
        first_name: req.body.fname,
        last_name: req.body.lname,
        location: {
            city: req.body.location,
            lat: req.body.lat,
            lng: req.body.lng
        },
        gender: req.body.gender,
        image: (req.files)?req.files.image:null,
        dob: {
            day: req.body.day,
            month: req.body.month,
            year: req.body.year
        },
        interests: req.body.interests,
        bio: req.body.bio.replace(/<\/?[^>]+(>|$)/g, ""),
        password: req.body.password,
        password_repeat: req.body.password_repeat
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

    validations.location = validate.location(body.location, {
        required: 'Select a location from the list'
    })

    validations.gender = validate.gender(body.gender, {
        invalid: 'Valid gander values are m or f'
    })
    validations.dob = validate.dob(body.dob, {
        invalid: 'Invalid date of birth'
    })
    validations.interests = validate.interests(body.interests, {
        required: 'An interest is required'
    })
    validations.bio = validate.bio(body.bio, {
        required: 'Bio is required'
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

    validations.image = validate.image(body.image,{
        type:'Only .png, .jpg and .jpeg format allowed',
        size:'Max image file size is 1mb',
        required:'Profile image is required'
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
            validations.email = body.email + ' has an account'
        
        if(validations.username != false ||
           validations.email != false ||
           validations.first_name != false ||
           validations.last_name != false ||
           validations.location != false ||
           validations.gender != false ||
           validations.image != false ||
           validations.dob != false ||
           validations.interests != false ||
           validations.bio != false ||
           validations.password != false ||
           validations.password_repeat != false){
                res.status(200).json({
                    status: false,
                    validation: true,
                    messages: validations
                })
        }else{
            const image = body.image
            let imageExt = ''
            if(image.mimetype == 'image/png')
                imageExt = 'png'
            if(image.mimetype == 'image/jpg')
                imageExt = 'jpg'
            if(image.mimetype == 'image/jpeg')
                imageExt = 'jpeg'
            image.name = `${body.username}_profile_image.${imageExt}`
            const imgSrc = 'img/' + image.name
            const data = {
                uname: body.username,
                email: body.email,
                fname: validate.capitalize(body.first_name),
                lname: validate.capitalize(body.last_name),
                city: req.body.location,
                lat: req.body.lat,
                lng: req.body.lng,
                gender: req.body.gender,
                image: ROOT_URL + imgSrc,
                dob: `${req.body.year}-${req.body.month}-${req.body.day}`,
                interests: req.body.interests,
                bio: req.body.bio.replace(/<\/?[^>]+(>|$)/g, ""),
                pass: bcrypt.hashSync(req.body.password, 10)
            }
            image.mv(imgSrc, (err) => {
                if(err){
                    const error = new Error(err.message)
                    error.status = 500
                    next(error)
                }else{
                    userModel.createUser(data, (result) => {
                        res.status(200).json({
                            status: true,
                            message: 'Account created, you may login'
                        })
                    })
                }
            })
        }
    })
})

module.exports = router