import express from "express";

import Post from "../models/Post.js";

const router = express.Router()



router.post('/', async (req, res) => {
    
    
    try {
     const newPost = new Post(req.body) 
     const saved = await newPost.save()
     res.status(201).json(saved)


 } catch (error) {
     res.status(500).json(error)
 }
})



router.put('/:id', async (req, res) =>{
    try {
        const post = await Post.findById(req.params.id)
        if(post.userId === req.body.userId) {
            await post.updateOne({$set: req.body})
            res.status(200).json('Post updated ;)')
        }else{
            res.status(403).json('you can update only your post')
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/:id', async (req, res) =>{
    try {
        const post = await Post.findById(req.params.id)
        if(post.userId === req.body.userId) {
            await post.deleteOne(post)
            res.status(200).json('Post deleted successfully ;)')
        }else{
            res.status(403).json('you can delete only your post')
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/:id/like', async (req, res) =>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post.likes.includes(req.body.userId) ) {
            await post.updateOne({$push: { likes: req.body.userId}})
            res.status(200).json('Post liked ;)')
        }else{
            res.status(403).json('you already like this post')
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/', async (req, res) => {
    console.log('posts page');
    res.send('posts page')
})






export default router