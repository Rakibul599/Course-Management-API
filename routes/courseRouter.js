const express=require('express');
const {newCourse,getAllCourse,getCourseById}=require('../controller/courseController');
const {newCourseValidationHandler,newCoursevalidators}=require('../middleware/courseValidators');
const {requireAuth,requireRole}=require("../middleware/Auth")

const router=express.Router();
// Register Router
router.post('/addcourse',requireAuth,requireRole('admin'),newCoursevalidators,newCourseValidationHandler,newCourse)
router.get('/getallcourse',getAllCourse)
router.get('/getcoursebyid',getCourseById)

module.exports=router;

