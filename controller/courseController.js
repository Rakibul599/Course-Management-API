const Course =require('../model/Course');
const bcrypt = require("bcrypt");
// new Course controller
async function newCourse(req,res,next)
{
    const newCourses=Course({
        ...req.body
    })
    try {
        // Save user info in database
        const result=await newCourses.save();

        res.status(200).json({"message":"New Course added success","data":result});
    } catch (error) {
        res.status(500).json({"message":error.message});
    }

}



async function getAllCourse(req,res,next)
{
    try {
        let allCourse=await Course.find();
        res.status(200).json({allCourse});
    } catch (error) {
        res.status(500).json({"message":error.message});
    }
}
async function getCourseById(req,res,next)
{
    const {id} = req.query;
    console.log(id)
    try {
        let course=await Course.findById(id);
        if(course)
        {
            res.status(200).json({course});
        }
        else{
            return res.status(404).json({ message: "Course not found" });
        }
        
    } catch (error) {
        res.status(500).json({"message":error.message});
    }
}

module.exports={
    newCourse,
    getAllCourse,
    getCourseById
}