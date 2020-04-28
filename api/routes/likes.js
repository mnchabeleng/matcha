'use strict'
const express = require('express')
const router = express.Router()
const likeModal = require('../models/like')
const notification = require('../helpers/notification')

router.route('/:reciever')
.post((req, res, next) => {
    const data = {
        sender: req.tokenData.uname,
        reciever: req.params.reciever,
    }
    likeModal.createLike(data, (result) => {
        notification('like', data.sender, data.reciever).then((status) => {
            res.send(status)
        })
    })
})
.delete((req, res, next) => {
    
})

module.exports = router