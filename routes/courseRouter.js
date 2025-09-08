const express=require('express');
const {newCourse}=require('../controller/courseController');
const {newCourseValidationHandler,newCoursevalidators}=require('../middleware/courseValidators');
const {requireAuth,requireRole}=require("../middleware/Auth")

const router=express.Router();
// Register Router
router.post('/',requireAuth,requireRole('admin'),newCoursevalidators,newCourseValidationHandler,newCourse)

module.exports=router;

