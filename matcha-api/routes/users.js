'use strict'
const express = require('express')
const router = express.Router()
const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const verifyAuth = require('../middleware/verify_auth')
const dotenv = require('dotenv').config()
const {
    JWT_SECRET_KEY
} = process.env

router.route('/')
.get((req, res, next) => {
    const data = {gender: '', city: '', ageRange: '', interest: '', orderby: 'ORDER BY id DESC'}

    if (req.query.min || req.query.max)
    {
        let min = 2020 - 18
        let max = 2020 - 100
        
        if (req.query.min)
            min = 2020 - Number(req.query.min)
        
        if (req.query.max)
            max = 2020 - Number(req.query.max)
        
        data.ageRange = `AND dob BETWEEN '${max}-01-01' AND '${min}-01-01'`
    }
    
    if (req.query.gender)
        data.gender = req.query.gender

    if (req.query.city)
        data.city = req.query.city
    
    if(req.query.interest)
        data.interest = req.query.interest
    
    if (req.query.orderby)
    {
        const orderby = req.query.orderby
        if (orderby === 'ageASC')
            data.orderby = 'ORDER BY dob ASC'
        
        if (orderby === 'ageDESC')
            data.orderby = 'ORDER BY dob DESC'

        if (orderby === 'likesDESC')
            data.orderby = 'ORDER BY likes DESC'
        
        if (orderby === 'viewsDESC')
            data.orderby = 'ORDER BY views DESC'
    }

    let token = undefined
    data.user = ''
    const authHeader = req.headers['authorization']    
    token = authHeader.split(' ')[1]
    try
    {
        const decoded = jwt.verify(token, JWT_SECRET_KEY)
        data.user = decoded.uname
        if(data.orderby == 'ORDER BY id DESC')
            data.orderby = `ORDER BY ((lat-${decoded.lat})*(lat-${decoded.lat})) + ((lng - ${decoded.lng})*(lng - ${decoded.lng})) ASC`
    }catch(err){}

    userModel.getUsers(data, (result) => {
        const page = parseInt(req.query.page)
		const limit = parseInt(req.query.limit)
	
		const startIndex = (page - 1) * limit
        const endIndex = page * limit

		if (page && limit)
            result = result.slice(startIndex, endIndex)

        result.forEach((user) => {
            const request = {
                type: 'GET',
                url: 'http://localhost:3300/users/' + user.id
            }
            user.request = request
        })

        res.status(200).json(result)
    })
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    userModel.getUserById(id, (result) => {
        res.status(200).json(result)
    })
})

router.post('/:id/views', verifyAuth, (req, res, next) => {
    const id = req.params.id
    userModel.addView(id, (result) => {
        res.status(200).json({status:true})
    })
})

router.post('/:id/likes', verifyAuth, (req, res, next) => {
    const id = req.params.id
    userModel.addLike(id, (result) => {
        res.status(200).json({status:true})
    })
})

module.exports = router
