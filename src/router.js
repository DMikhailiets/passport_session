const { Router } = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport')
const checkAuthenticated = require('../middleware/checkAuth')
const methodOverride = require('method-override')

const users = []

const router = Router()

router.use(methodOverride('_method'))

router.get('/', checkAuthenticated, (req,res) => {
    res.render('index.ejs', {name: req.user.name})
})

router.get('/login', (req,res) => {
    res.render('login.ejs')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

router.get('/register', (req,res) => {
    res.render('register.ejs')
})

router.post('/register', async (req,res) => {
    const {email, password, name} = req.body
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        users.push({
            id: Date.now(),
            email,
            name,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch (error) {
        res.redirect('/register')
    }
    console.log(users)
})

router.delete('/logout', (req,res) => {
    req.logOut()
    res.redirect('/login')
})

module.exports = { 
    router,
    users
}
