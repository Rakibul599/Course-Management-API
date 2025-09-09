const express=require('express');
const {loginUser}=require('../controller/loginController');
const {loginvalidators,loginValidationHandler}=require('../middleware/loginValidators');

const router=express.Router();
// Login Router
router.post('/',loginvalidators,loginValidationHandler,loginUser)

module.exports=router;

