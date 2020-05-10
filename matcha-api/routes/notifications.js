'use strict'
const express = require('express')
const router = express.Router()
const notificationModal = require('../models/notification')
const notification = require('../helpers/notification')

router.get('/', (req, res, next) => {
    notificationModal.getNotifactions(req.tokenData.uname, (result) => {
        res.status(200).send(result)
    })
})

router.post('/', (req, res, next) => {
    const data = {
        type: req.body.type,
        sender: req.tokenData.uname,
        reciever: req.body.reciever
    }
    notification(data.type, data.sender, data.reciever).then((status) => {
        res.status(200).json({status:true})
    })
})

router.delete('/:id', (req, res, next) => {
    const data = {
        id: req.params.id,
        reciever: req.tokenData.uname
    }
    notificationModal.deleteNotification(data, (result) => {
        console.log(result)
        res.status(200).send(result)
    })
})

module.exports = router