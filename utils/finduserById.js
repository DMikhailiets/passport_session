const findUserById = (id, users) => {
    return users.find(user => user.id === id)
}

module.exports = findUserById