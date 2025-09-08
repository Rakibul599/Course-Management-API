const express=require('express');
const {loginUser}=require('../controller/loginController');


const router=express.Router();
// Login Router
router.post('/',loginUser)

module.exports=router;

