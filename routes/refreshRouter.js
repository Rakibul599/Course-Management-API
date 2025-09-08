const express=require('express');
const {refresh}=require('../controller/refreshContorller');

const router=express.Router();
// Register Router
router.post('/',refresh)

module.exports=router;

