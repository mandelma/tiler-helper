const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const keys = require('./config/keys')


const history = require('connect-history-api-fallback')
const serveStatic = require('serve-static')

const userRouter = require('./routers/users')
const loginRouter = require('./routers/login')
const wallRouter = require('./routers/walls')
const socketRouter = require('./routers/socket')
const rectRouter = require('./routers/rectangle')

const connected = mongoose.connect(keys.mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false })

if (connected) {
    console.log('mongo database is connected')
}else {
    console.log('error: mongo database is not connected')
}

app.use(cors())

// aktiivseks kui laadida Heroku serverisse

// app.use(history({
//      // OPTIONAL: Includes more verbose logging
//      verbose: true
//  }))

//app.use(serveStatic(path.join(__dirname, '/dist')))



// Serve static assets from the build files (images, etc)



const staticFileMiddleware = express.static(path.join(__dirname + '/dist'))


//app.use(express.static('dist'))
app.use(bodyParser.json())

// changes
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/wallData', wallRouter)
app.use('/api/socket', socketRouter)
app.use('/api/rect', rectRouter)

// app.get('/api', (req, res) => {
//     res.send("Hello tiler helper app!")
// })


module.exports = app