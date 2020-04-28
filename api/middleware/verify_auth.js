const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const {
    JWT_SECRET_KEY
} = process.env

module.exports = (req, res, next) => {
    let token = undefined
    const authHeader = req.headers['authorization']
    
    if(req.body.token && token === undefined)
    {
        token = req.body.token
    }
    
    if (authHeader && token === undefined)
    {
        token = authHeader.split(' ')[1]
    }

    try
    {
        const decoded = jwt.verify(token, JWT_SECRET_KEY)
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