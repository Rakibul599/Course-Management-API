const express=require('express');
const {logout}=require('../controller/logoutController');


const router=express.Router();
// Logout Router
router.post('/',logout)

module.exports=router;

