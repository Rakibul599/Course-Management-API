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

module.exports={
    newCourse,
}
