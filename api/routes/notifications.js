'use strict'

const express = require('express')
const router = express.Router()

router.route('/:messageId')
.delete((req, res, next) => {
    res.status(200).send('Delete message')
})

router.route('/:senderUsername')
.get((req, res, next) => {
    res.status(200).send('GET messages')
})
.post((req, res, next) => {
    res.status(200).send('POST message')
})

module.exports = router