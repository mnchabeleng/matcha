'use strict'
const express = require('express')
const router = express.Router()
const likeModel = require('../models/like')
const notification = require('../helpers/notification')

router.route('/:reciever')
.post((req, res, next) => {
    const data = {
        sender: req.tokenData.uname,
        reciever: req.params.reciever,
    }
    likeModel.createLike(data, (result) => {
        notification('like', data.sender, data.reciever).then((status) => {
            res.status(200).json({status:true})
        })
    })
})
.delete((req, res, next) => {
    const data = {
        sender: req.tokenData.uname,
        reciever: req.params.reciever,
    }
    likeModel.deleteLike(data, (result) => {
        res.status(200).json({status:true, message: data.reciever + ' has been blocked'})
    })
})

module.exports = router