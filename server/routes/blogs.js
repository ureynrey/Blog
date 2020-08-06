const Blog = require('../models/blog');
const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const commentAuth = require('../middleware/comment')
const mongoose = require('mongoose');
const Comment = require('../models/comments');
const User = require('../models/user');


/*/\/\/\/\/\/\/\/\/\/
- N E W   B L O G - |   
\/\/\/\/\/\/\/\/\/\*/
router.post('/new', auth, async (req, res) => {
    const blog = new Blog({
        'title': req.body.title,
        'owner': req.user._id,
        'author': `${req.user.firstName} ${req.user.lastName}`,
        'body': `${req.body.body}`,
    });
    try {
        await blog.save();
        res.status(201).send(blog)
    } catch (e) {
        res.status(400).send(e)
    }
});

/*/\/\/\/\/\/\/\/\/\/\/\/\/\|
- G E T   A L L   B L O G - |   
\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
router.get('/all', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(201).send(blogs)
    } catch (e) {
        res.status(400).send(e)
    }
});

/*/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\|
- G E T   S I N G L E   B L O G - |   
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
router.get('/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const blogs = await Blog.findById(_id);
        res.status(201).send(blogs)
    } catch (e) {
        res.status(400).send(e)
    }
});

/*/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/|
- P O S T   S I N G L E   C O M M E N T  - |   
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*/
router.patch('/comment/:id', commentAuth, async (req, res) => {
    const _id = req.params.id
    let user; 

    // Determines comment user Name
    if(req.user.firstName){
        user = `${req.user.firstName} ${req.user.lastName}`
    } else(user = 'Anonymous')
    const newComment = {
        author: user,
        body: req.body.comment
    }
    try {
        let blog = await Blog.findOne({
            _id: req.params.id,
        })
        blog.comments.push(newComment)
        blog.save()
        res.status(201).send(blog)
    } catch (e) {
        res.status(400).send(e)
    }
});

/*/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/|
- S E L E C T   A L L   B L O G   P O S T  - |   
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*/
router.post('/entries', auth, async (req, res) => {
    let entries;
    try {
        entries = await Blog.find({
            owner: req.user.id,
        })
        res.status(201).send(entries)
    } catch (e) {
        res.status(400).send(e)
    }
});

/*/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/|
- D E L E T E   S I N G L E       P O S T  - |   
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*/
router.delete('/delete/:id', auth, async (req,res) => {
    Blog.deleteOne({ _id: req.params.id })
    try{
        const blog = await Blog.deleteOne({ _id: req.params.id })
        if(!blog){ res.send(404).send() }
        res.send(blog)
    } catch (e){
        res.status(500).send()
    }
})

/*/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/|
- E D I T      S I N G L E        P O S T  - |   
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*/
router.patch('/edit/:id', auth, async (req,res) => {
    try{
        const blog = await Blog.findOne({ _id: req.params.id })
        if(!blog){ res.send(404).send() }
        blog.title = req.body.title
        blog.body = req.body.body
        blog.save()
        res.send(blog)
    } catch (e){
        res.status(500).send()
    }
})





module.exports = router;