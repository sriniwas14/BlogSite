const bcrypt = require('bcrypt');

const saltRounds = 10

exports.hashPassword = (password) => {
    return new Promise(resolve => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            resolve(hash)
        })
    })
}

exports.verifyPassword = (password, passwordHash) => {
    return new Promise(resolve => {
        bcrypt.compare(password, passwordHash, (err, result) => {
            resolve(result)
        })
    })
}
