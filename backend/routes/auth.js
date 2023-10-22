
const express=require('express');
const Users = require('../models/Users');
const router=express.Router();
const { body, validationResult }= require ('express-validator');
const bcrypt=require('bcryptjs');
var jwt=require('jsonwebtoken');
var fetchusers=require('../middleware/fetchusers');
const JWT_SECRET='Harryisagoodb$oy';
//ROUTE1 :-create user susing :post "/api/auth/createuser". dont req auth.createuser no login req
router.post('/createuser',[
    body('name','enter a valid name').isLength({min:3}),
    body('email','enter valid email').isEmail(),
    body('password','password must be 8 character').isLength({min:8}),
],async(req,res)=>{
   //ifv error return bad req and the error
   const errors=validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
   }
   try{
      //chk whaether email exits alraedy
   let users = await Users.findOne({email:req.body.email});
//    console.log(users)
   if (users){
    return res.status(400).json({error:"sorry a user with email already exits"})

   }
   const salt=await bcrypt.genSalt(10);
   const secPassword=await bcrypt.hash(req.body.password,salt);

   //create new user
   users =await Users.create({
    name: req.body.name,
    password:secPassword,
    email:req.body.email,


})
const data={
   users:{
      id:users.id}

}
const authtoken=jwt.sign(data,JWT_SECRET);

// .then(users=>res.json(users))
// .catch(err=>{console.log(err)
//     res.json({error:'plz enter a unique value for email',message:err.message})});
// res.json(users)
res.json({authtoken})
   }catch(error){
    console.error(error.message);
    res.status(500).send(" internal server eror");
   }

})

//ROUTE2 :- authentication a user susing :post "/api/auth/login". dont req auth.createuser no login req
router.post('/login',[
   body('email','enter valid email').isEmail(),
   body('password','password cant be blank').exists(),
   
],async(req,res)=>{
     //if error return bad req and the error
     const errors=validationResult(req);
     if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
     }
     const {email,password}=req.body;
     try {
      
      let users=await Users.findOne({email});
      if(!users){
         return res.status(400).json({error:"plz try to login correct credentials"});
      }
      const passwordComapre=await bcrypt.compare(password,users.password);
      if(!passwordComapre){
         return res.status(400).json({error:"plz try to login correct credentials"});

      }
      const data={
         users:{
            id:users.id}
      
      }
      const authtoken=jwt.sign(data,JWT_SECRET);
      res.json({authtoken})
     } catch(error){
      console.error(error.message);
      res.status(500).send(" internal server erorr  ");
     }

})
//ROUTE3 :- Get loggin user details user susing :post "/api/auth/getuser".  login req
router.post('/getusers',fetchusers ,async(req,res)=>{
try {
   usersId=req.users.id;
   const users=await Users.findById(usersId).select("-password")
   res.send(users)
} catch (error) {
   console.error(error.message);
   res.status(500).send(" internal server erorr  ");
}
})

module.exports=router