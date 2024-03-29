if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express')
const app = express()
const port = process.env.PORT || 8000  
const path = require('path')

const session = require('express-session')
const bcrypt = require('bcrypt')
const cookie = require('cookie-parser')

const mongoose = require('mongoose')
const dbConfig = require('./config/dbConfig')

// Connecting to the database
const dbURL = dbConfig.dbUrl
// process.env.DB_URL ||
mongoose.connect(dbURL)
.then(()=>{
    console.log('Connected to the database')
})
.catch(err=>{
    console.log(err)
})

// Importing routes
const user = require('./routes/user')
const plant = require('./routes/plant')
const profile = require('./routes/profile')
const question = require('./routes/question')
const comment = require('./routes/comment')
const blog = require('./routes/blog')
const shop = require('./routes/shop')
const order = require('./routes/order')
const cart = require('./routes/cart')


// Setting up session
app.use(session({
    secret: 'secretcode',
    saveUninitialized: false,
    resave: false,
    cookie:{
        httpOnly:false,
        expires: Date.now() + 1000*60*60*24*4,
        maxAge: 1000*60*60*24*4
    }
}))

app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookie())

app.get('/example', (req, res)=>{
    res.status(200).json({name: "Harhsit"})
})

// Routes
app.use('/user', user)
app.use('/plant', plant)
app.use('/profile', profile)
app.use('/question', question)
app.use('/comment', comment)
app.use('/blog', blog)
app.use('/shop', shop)
app.use('/order', order)
app.use('/cart', cart)

app.get('/', (req, res)=>{
    res.send('Hello hi')
})

app.listen(port, ()=>{
    console.log(`Listening to port ${port}`)
})