const express = require('express');
const router = express.Router()
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');



const JWT_SECRET = "A&H_BestFriendsForever"



//ROUTE 1 Create a user using : POST '/api/auth/createuser' No login required
router.post('/createuser', [
    body('email', 'Enter a valid email').isEmail(),
    body('name','Length of name should be atleast 3').isLength({ min: 3 }),
    body('password', 'Enter a valid Password').isLength({ min: 5 }),


    //Now, we are going to make this req res function as an async await function
], 
async (req, res)=>{
    let success= false;
    //If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    // const user= User(req.body);
    // user.save()
    // res.send(req.body)
    
    //Check whether the user with this email exists already
    try{
    let user= await User.findOne({email : req.body.email});
    if(user){
        return res.status(400).json({success, error : "A user with this email already exists"})
    }
    // const salt= await bcrypt.genSalt(10);
    // const secPass=  await bcrypt.hash(req.body.password, salt);

    const salt = await bcrypt.genSalt(10);
    const secPass= await bcrypt.hash(req.body.password, salt);
    user= await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email
      })
    const data ={
        user :{
            id : user.id
        }
    }
    const authToken=  jwt.sign(data, JWT_SECRET);
    success=true;
    console.log(authToken)
    res.json({success, authToken});
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
    // if we are using async await, there is no need to put .then there
    //   .then(user => res.json(user))
    //   .catch(err=> {console.log(err)
    // res.json({"error": "Duplicates are not allowed, change your email ID to add to db", message : err.message})})
 })




 //ROUTE 2 Authenticate a user using : POST '/api/auth/login' (endpoint) No login required
 router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
    //Now, we are going to make this req res function as an async await function
], 
async (req, res)=>{
    let success= false;
    //If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password}= req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            success= false;
            return res.status(400).json({ error : "Login using correct credentials"});
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            success= false;
            return res.status(400).json({ success, error : "Login using correct credentials"});
        }
        const data ={
            user :{
                id :user.id
            }
        }
        const authToken=  jwt.sign(data, JWT_SECRET);
         success= true;
        res.json({success,authToken});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
        
    }
})




 // ROUTE 3: Get logged in User Details using : POST "/api/auth/getuser" . Login Required
 router.post('/getuser', fetchUser, async (req, res)=>{
 try {
     const userId= req.user.id
     const user = await User.findById(userId).select("-password");
     res.send(user);
     
 } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
 }
})

module.exports = router;