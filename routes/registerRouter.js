const express=require('express');
const {newRegister}=require('../controller/registrationController');
const {newUservalidators,newUserValidationHandler}=require('../middleware/registrationValidator')

const router=express.Router();
// Register Router
router.post('/',newUservalidators,newUserValidationHandler,newRegister)

module.exports=router;

