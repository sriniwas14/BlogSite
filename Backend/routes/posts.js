const express = require('express');
const fs = require('fs');
const router = express.Router();
const mongoose = require('mongoose')
const Post = require('../models/Post.model');

const multer = require('multer');
const { multerStorage, resizeAndConvert } = require('../utils/fileUtils')
const upload = multer({ storage:multerStorage('featured','featured') })

const isPostByUser = async (userId, postId) => {
    const currentPost = await Post.findOne({ postId })
    if(currentPost===null) return false

    if(!currentPost.createdBy===userId) return false
    return true
}

router.get('/', (req, res) => {
    Post.aggregate([
        { $lookup: { from: "users", localField: "createdBy", foreignField: "_id", as: "userInfo" }},{ $unwind: "$userInfo" } 
    ], (err, result) => {
        if (err) return res.sendStatus(500);
        res.send({ success: true, data: result})
    })
})

router.get('/:postId', (req, res) => {
    Post.aggregate([
        { $lookup: { from: "users", localField: "createdBy", foreignField: "_id", as: "userInfo" }}
        ,{ $unwind: "$userInfo" }
        ,{ $match: { _id: mongoose.Types.ObjectId(req.params.postId) }  }
    ], (err, result) => {
        if (err) return res.sendStatus(500);
        res.send({ success: true, data: result[0]})
    })
})

router.post('/', (req, res) => {
    Post.create({
        title: req.body.title,
        excerpt: req.body.excerpt,
        createdBy: req.body.createdBy
    }, (err, post)=> {
        if (err) return res.sendStatus(500);
        res.send({ success: true, data: post })
    })
})

router.put('/', async (req, res) => {
    // if(!isPostByUser(req.token._id, req.body.postId)) return res.sendStatus(401)

    Post.updateOne({ _id: req.body._id }, { $set: { title: req.body.title, excerpt: req.body.excerpt, content: req.body.content } } , (err, result) => {
        if(err) return res.sendStatus(500);
        if(result.n===1) return res.send({ success: true })
        res.send({ success: false })
    })
})

router.delete('/', (req, res) => {
    if(!isPostByUser(req.token._id, req.body.postId)) return res.sendStatus(401)
    
    Post.deleteOne({ _id: req.body.postId }, (err, result) => {
        if(err) return res.sendStatus(500);
        if(result.n===1) return res.send({ success: true })
        res.send({ success: false })
    })
})

router.post('/:postId/upload', upload.single('featured'),async (req, res) => {
    // if(!isPostByUser(req.token._id, req.params.postId)) return res.sendStatus(401)

    let newFileName = req.file.path.split('_')[0]+'.jpg'
    newFileName = newFileName.replace(/static/g, '')
    resizeAndConvert([800,500], newFileName, req.file.path)
        .then((err, result) =>{
            // Delete Temp File
            fs.unlinkSync(req.file.path)
        }).catch((err) =>{
            fs.unlinkSync(req.file.path)
            return res.send({ success: false, err})
        })

        Post.updateOne({ _id: req.params.postId }, { $set: { featuredImage: newFileName } } , (err, result) => {
            if(err) return res.sendStatus(500);
            if(result.n===1) return res.send({ success: true })
            res.send({ success: false })
        })

} )

// Comments

router.post('/:id/comments', async (req, res)=> {
    const result = await Post.updateOne({ _id: req.params.id }, { $push: { comments: { userId: req.body.userId, profilePicture: req.body.profilePicture, content: req.body.content } }})
    if(result.n===1) return res.send({ success: true})
    return res.send({ success: false })
})

module.exports = router;