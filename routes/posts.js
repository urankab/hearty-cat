const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

// GET ALL POSTS
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts);
    } catch (err) {
        res.json({ message: err.message })
    }
});

// SUBMITS A POST
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    console.log(req.body)
    try {
        const savedPost = await post.save()
        res.json(savedPost)
    } catch (err) {
        res.json({ message: err.message })
    }
});

// GET SPECIFIC POST
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        res.json(post)
    } catch (err) {
        res.json({ message: err.message })
    }
});

// UPDATES POST
router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId },
            { $set: { title: req.body.title } }
        );
        res.json(updatedPost)
    } catch (err) {
        res.json({ message: err.message })
    }
});

// DELETES POSTS
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.remove({ _id: req.params.postId })
        res.json(removedPost)
    } catch (err) {
        res.json({ message: err.message })
    }
})

module.exports = router;