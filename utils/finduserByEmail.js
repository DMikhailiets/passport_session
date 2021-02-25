const findUserByEmail = (email, users) => {
    return users.find(user => user.email === email)
}

module.exports = findUserByEmail