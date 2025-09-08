const mongoose=require('mongoose');
const courseSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    price:{
        type:String,
        required:true
    },
    instructor:{
        type:String,
        required:true
    },
},
{
    timestamps:true
}
);
const Course=mongoose.model('Course',courseSchema);
module.exports=Course;