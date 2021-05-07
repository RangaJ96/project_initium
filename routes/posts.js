const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Post = mongoose.model("Post")
const requireLogin = require('../middleware/requireLogin')
const _ = require('lodash')


router.post('/createpost',requireLogin,(req,res)=>{
    const {title,body} = req.body
    if(!title || !body){
        return res.status(422).json({error:"Required fields missing"})
    }
    
    //req.user.password = undefined
    const post = new Post({
        title,
        body,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router