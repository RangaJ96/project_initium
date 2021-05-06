const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcrypt')


router.post('/signup',(req,res)=>{
  const {name,email,password} = req.body 
  if(!email || !password || !name){
     return res.status(422).json({error:"please add all the fields"})
  }
  User.findOne({email:email})
  .then((savedUser) =>{
      if(savedUser){
        return res.status(422).json({error:"User is already exists"})
      }
      bcrypt.hash(password,12)
      .then(hashedPassword =>{
        const user = new User({
            email,
            password : hashedPassword,
            name
        })
        user.save()
        .then(() =>{
            res.status(200).json({message:"Succesfuly posted"})
        })
        .catch(err =>{
            console.log(err)
        })
      })
      .catch(err =>{
        console.log(err)
    })

  })
  .catch(err =>{
    console.log(err)
  })
})

router.post('/signin',(req,res)=>{
  const {email,password} = req.body
  if(!email || !password){
    return res.status(422).json({error:"please add all the required feilds"})
  }
  User.findOne({email:email})
  .then(savedUser =>{
    if(!savedUser){
      return res.status(422).json({error:"user can not be found, invalid email or password"})
    }
    bcrypt.compare(password,savedUser.password)
    .then(validUser => {
      if(validUser){
        res.status(200).json({message:"successfully signed in"})
      }else{
        return res.status(422).json({error:"invalid email or password"})
      }
    })
    .catch(err=>{
      console.log(err)
    })
  })
  .catch(err=>{
    console.log(err)
  })
})

module.exports = router