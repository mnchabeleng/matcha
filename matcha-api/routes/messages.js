'use strict'
const express = require('express')
const router = express.Router()
const messageModel = require('../models/message')
const notification = require('../helpers/notification')

router.post('/', (req, res, next) => {
    const data = {
        sender: req.tokenData.uname,
        reciever: req.body.reciever,
        message: req.body.message
    }
    if(data.sender && data.reciever && data.message){
        messageModel.createMessage(data, (result) => {
            notification('message', data.sender, data.reciever).then((status) => {
                res.status(200).json({status:true, message:'A message was sent to ' + data.reciever + '.'})
            })
        })
    }
})

router.delete('/:id', (req, res, next) => {
    const data = {
        id: req.params.id,
        admin: req.tokenData.uname
    }
    res.status(200).json('Message deleted...')
})

router.get('/:user', (req, res, next) => {
    const data = {
        admin: req.tokenData.uname,
        user: req.params.user
    }
    messageModel.getMessages(data, (result) => {
        res.status(200).json(result)
    })
})

module.exports = router