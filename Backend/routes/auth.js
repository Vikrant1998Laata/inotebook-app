const express = require('express');
const User = require('../models/User')
 const router = express.Router();
 const { body, validationResult } = require('express-validator');
 const bcrypt = require('bcryptjs')
var fetchuser = require('../middleware/fetchuser');
 var jwt = require('jsonwebtoken');

 const JWT_SECRET = 'vikrantisagood$boy'

 // Creating a user 
 router.post('/createuser', [
   body('name', 'Enter a Valid name').isLength({min:3}),
   body('email', 'Enter a Valid email').isEmail(),
   body('password', 'Password must be at least 5 characters').isLength({min:5})
 ], 
   async (req, res)=>{
     let success = false;
  //  console.log(req.body);
  //  const user = User(req.body);
  //  user.save()
  const errors = validationResult(req);

  // If there are some error the return the error
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }

  try {
  // Checking wheather user with email exist or not
  // findOne is the function which checks that the user with this credentials exists or not
  let user = await User.findOne({email: req.body.email});
  if(user){
    return res.status(400).json({success,error: "Sorry a user with this email already exist"})
  }

// Hashing the user password
const salt = await bcrypt.genSalt(10);
const secPass = await bcrypt.hash(req.body.password, salt)


   user = await User.create({
    name: req.body.name,
    password: secPass,
    email: req.body.email,
  })

  const data = {
    user:{
      id: user.id
    }
  }
  const authtoken = jwt.sign(data, JWT_SECRET);
  // console.log(authtoken);
  // .then(user => res.json(user)).catch(err=>{console.log(err)
  // res.json({error: 'Please enter a unique value for email', message: err.message})});

  //  res.send(req.body)
  let success = true;
  res.json({success,authtoken}) // Now instead of getting our user, we get our jwt authtoken

} catch (error) {
   console.log(error.message);
   res.status(500).send("Internal server error occured") 
}
})


// Route:2 Login point
// Creating the login end point
// Authenticate the user using Post request
router.post('/login',[
  body('email','Enter a valid email').isEmail(),
  body('password','password can not be empty').exists(),
],
async (req, res)=>{
let success = false;
  const errors = validationResult(req);

  // If there are some error the return the error
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const{email, password }= req.body
  
  
  try {
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({success, error: "Please try to login with correct credentials"});
    }

    const passwordCompare = await bcrypt.compare(password, user.password)
    if(!passwordCompare){
      return res.status(400).json({success, error: "Please try to login with correct credentials"});
    }

    const data = {
      user:{
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success,authtoken})
  
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error occured") 
  }

}
);

// Get logged in user details using Post : "/api/auth/getuser": login required
router.post('/getuser',fetchuser, async (req, res)=>{
  try {
    userId = req.user.id 
    const user = await User.findById(userId).select("-password");
    res.send(user)
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error occured") 
  }
})


 module.exports = router;