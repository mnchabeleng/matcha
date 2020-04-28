const express = require('express')
const app = express()

const port = 3300
app.listen(port, () => {
    console.log('Server running on localhost:' + port)
})

// body parser built into express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// static files
app.use('/uploads', express.static('uploads'));

// cors hanlding
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method === 'OPTIONS')
    {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE')
        return res.status(200).json({})
    }
    next()
})

const verifyAuth = require('./middleware/verify_auth')
// api routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/users', require('./routes/users'))
app.use('/likes', verifyAuth, require('./routes/likes'))
app.use('/messages', verifyAuth, require('./routes/messages'))
app.use('/notifications', verifyAuth, require('./routes/notifications'))
app.use('/messages', require('./routes/messages'))
app.use('/match', verifyAuth, require('./routes/matches'))

// error handling
app.use((req, res, next)=>{
    const error = new Error('Route not found')
    error.status = 404
    next(error)
})

app.use((err, req, res, next)=>{
    res.status(err.status || 500)
    res.json({
        error: {
            message: err.message
        }
    })
})