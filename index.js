const express = require('express')
const dotenv = require('dotenv')
const { router } = require('./src/router')
const passport = require('passport')
const initializePassport = require('./passport-config')
const flash = require('express-flash')
const session = require('express-session')


initializePassport(passport)
dotenv.config()

const PORT = process.env.PORT

const app = express()

app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(router)

app.listen(PORT,() => {
    console.log(`Listening at ${PORT}...`)
})