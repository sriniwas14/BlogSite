const fs = require('fs');
const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const { hashPassword, verifyPassword } = require('../utils/password');
const { signKey, verifyKey } = require('../utils/token');

const multer = require('multer');
const { multerStorage, resizeAndConvert } = require('../utils/fileUtils')
const upload = multer({ storage:multerStorage('profile') })

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
    const currentUser = await User.findOne({ username: req.body.username })

    if(!currentUser) return res.send({ success: false, err: "User Not Found"})

    const isPasswordCorrect = await verifyPassword(req.body.password, currentUser.password)
    
    if(!isPasswordCorrect) return res.send({ err: "Wrong Username or Password" })

    currentUser[0].password = undefined

    const token = signKey(currentUser[0])

    res.cookie("token", token)
    res.send({ token: token })
})

router.post('/profile/:userId', upload.single('avatar'),async (req, res) => {
    const newFileName = req.file.path.split('_')
    resizeAndConvert([200,200], newFileName, req.file.path)
        .then((err, result) =>{
            // Delete Temp File
            res.send({ success: true })
            fs.unlinkSync(req.file.path)
        }).catch((err) =>{
            res.send({ success: false, err: err.toString() })
            fs.unlinkSync(req.file.path)
        })

} )

module.exports = router;