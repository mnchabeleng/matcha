'use strict'
const express = require('express')
const router = express.Router()
const messageModal = require('../models/message')
const notification = require('../helpers/notification')

/*
router.post('/', (req, res, next) => {
    const data = {
        sender: req.tokenData.uname,
        reciever: req.body.reciever,
        message: req.body.message
    }
    if(data.sender && data.reciever && data.message){
        messageModal.createMessage(data, (result) => {
            console.log(result)
            notification('message', data.sender, data.reciever).then((status) => {
                res.status(200).json(status)
            })
        })
    }
})

router.get('/:user', (req, res, next) => {
    data = {
        admin: req.tokenData.uname,
        user: req.params.user
    }
})
*/

router.get('/users', (req, res, next) => {
    const data = {
        admin: req.tokenData.uname
    }
    messageModal.getUsers(data, (result) => {
        res.status(200).send(result)
    })
})



module.exports = router