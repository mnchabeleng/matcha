'use strict'
const express = require('express')
const router = express.Router()
const messageModal = require('../models/message')
const notification = require('../helpers/notification')

router.route('/:reciever')
.get((req, res, next) => {
    const data = {
        reciever: req.params.reciever,
        sender: req.tokenData.uname
    }
    notification().then((status) => {
        res.send()
    })
})
.post((req, res, next) => {

})
.delete((req, res, next) => {

})

module.exports = router