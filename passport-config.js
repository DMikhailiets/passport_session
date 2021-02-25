const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const findUserByEmail = require('./utils/finduserByEmail')
const findUserById = require('./utils/finduserById')
const { users } = require('./src/router')

const authenticateUser = async (email, password, done) => {
    const user = findUserByEmail(email, users)
    if (user == null) {
        return done(null, false, {message: 'No users with that email'})
    }
    try {
        if (await bcrypt.compare(password, user.password)) {
            done(null, user)
        } else {
            return done(null, false, {message: 'Password incorrect'})
        }
    } catch (error) {
        console.log(error)
        done(error)
    }
}

const initializePassport = (passport) =>{
    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        done(null, findUserById(id, users))
    })
}

module.exports = initializePassport