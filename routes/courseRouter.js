const express=require('express');
const {newCourse,getAllCourse,getCourseById,deleteCourseById}=require('../controller/courseController');
const {newCourseValidationHandler,newCoursevalidators}=require('../middleware/courseValidators');
const {requireAuth,requireRole}=require("../middleware/Auth");

const router=express.Router();
// user route
router.get('/getallcourse',getAllCourse);
router.get('/getcoursebyid',getCourseById);
// admin route
router.post('/addcourse',requireAuth,requireRole('admin'),newCoursevalidators,newCourseValidationHandler,newCourse);
router.delete('/deletecoursebyid',requireAuth,requireRole('admin'),deleteCourseById);

module.exports=router;

