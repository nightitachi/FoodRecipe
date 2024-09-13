const mongoose = require('mongoose');
const express = require('express');
const UserModel = require('../models/user');
const bcrypt = require('bcrypt')
const router = express.Router();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = UserModel.findOne({username})
  if(user){
    return res.json({message: 'user exists'})
  }
  const hashedpassword = await bcrypt.hash(password ,10)
  const newuser = new UserModel({username , password: hashedpassword})
  await newuser.save()
  return res.json({message: 'record saved ! '})
  
});
router.post('/login' , async(req,res)=>{
  const {username , password} = req.body;
  const user = await UserModel.findOne()
  if(!user){
    return res.json({message : 'user not found !'})
  }
  const validpassword = await bcrypt.compare(password, user.password);
  if(!validpassword){
    return res.json({message : 'wrong credentials'})
  }
  const token = jwt.sign({id: user._id}, "secret");
  res.cookie("token" , token)
  return res.json({message:"successfully logged" , id: user._id})

})

module.exports = router;
