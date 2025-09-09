const express=require('express');
const {getUserPurchases,purchaseCourse}=require('../controller/purchaseController');
const {requireAuth}=require("../middleware/Auth");

const router=express.Router();

// purchase Course route
router.post('/purchasescourse',requireAuth,purchaseCourse);
// Get all purchases course
router.get('/mycourse',requireAuth,getUserPurchases);

module.exports=router;

