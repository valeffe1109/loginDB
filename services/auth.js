const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require ('jsonwebtoken')
const request = require('request')
const {registerValidation , loginValidation} = require('../validation');


router.post('/register', async (req, res) => {

    //Validate the date before we make a user

    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    //CHECK 

    const emailExist = await User.findOne({email : req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

//HASH THE PASSWORD

 const salt = await bcrypt.genSalt(10);
 const hashedPassword = await bcrypt.hash(req.body.password,salt);

    // Create a new user
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password : hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send({user: user._id});
    }catch(err){
        res.status(400).send(err)
    }

});

router.post('/login' , async (req,res) =>{

      const {error} = loginValidation(req.body)
      if(error)return res.status(400).send(error.details[0].message);
      //CHECK IF EMAIL EXISTS 

      const user = await User.findOne({email:req.body.email});
      if (!user) return res.status(400).send('Email or password is wrong' )

      //PASSWORD IS CORRECT
      const validPass = await bcrypt.compare(req.body.password,user.password);
      if(!validPass) return res.status(400).send('Invalid Password')
      //Create and assign a token 
      const token = jwt.sign({_id:user._id},'110997970911')
      res.header('auth-token',token).send(token);

});

module.exports = router;