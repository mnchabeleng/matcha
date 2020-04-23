const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const {
    JWT_SECRET_KEY
} = process.env

module.exports = (req, res, next) => {
    try
    {
        const decoded = jwt.verify(req.body.token, JWT_SECRET_KEY)
        req.tokenData = decoded
        next()
    }
    catch (err)
    {
        const error = new Error('Unauthorized Access')
        error.status = 401
        next(error)
    }
}