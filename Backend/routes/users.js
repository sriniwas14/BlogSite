const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User.model');
const { hashPassword, verifyPassword } = require('../utils/password');
const { signKey, verifyKey } = require('../utils/token');

// Create New User
router.post('/', async (req, res) => {
    const hashedPassword = await hashPassword(req.body.password)
        
    User.create({ 
        username: req.body.username,
        password: hashedPassword,
        role: req.body.role,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        profilePicture: req.body.profilePicture
    }, (err, user) => {
        if (err) return res.sendStatus(500);
        user.password = undefined
        res.send(user)
    })
})

router.post('/login', async (req, res) => {
    const currentUser = await User.find({ username: req.body.username })
    const isPasswordCorrect = await verifyPassword(req.body.password, currentUser[0].password)
    
    if(!isPasswordCorrect) return res.status(401).send({ err: "mismatch" })

    currentUser[0].password = undefined

    const token = signKey(currentUser[0])

    res.header('Set-Cookie', `token=${token}`)
    res.send({ token: token })
})

module.exports = router;