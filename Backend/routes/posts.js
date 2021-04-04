const express = require('express');
const router = express.Router();
const Post = require('../models/Post.model');

const isPostByUser = async (userId, postId) => {
    const currentPost = await Post.findOne({ postId })
    if(currentPost===null) return false

    if(!currentPost.createdBy===userId) return false
    return true
}

router.get('/', (req, res) => {
    res.send("Hello From Posts!")
})

router.post('/', (req, res) => {
    Post.create({
        title: req.body.title,
        content: req.body.content,
        createdBy: req.body.createdBy
    }, (err, post)=> {
        if (err) return res.sendStatus(500);
        res.send(post)
    })
})

router.put('/', async (req, res) => {
    if(!isPostByUser(req.token._id, req.body.postId)) return res.sendStatus(401)

    Post.updateOne({ _id: req.body.postId }, { $set: { title: req.body.title, content: req.body.content } } , (err, result) => {
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

// Comments

router.post('/:id/comments', async (req, res)=> {
    const result = await Post.updateOne({ _id: req.params.id }, { $push: { comments: { userId: req.body.userId, profilePicture: req.body.profilePicture, content: req.body.content } }})
    if(result.n===1) return res.send({ success: true})
    return res.send({ success: false })
})

module.exports = router;