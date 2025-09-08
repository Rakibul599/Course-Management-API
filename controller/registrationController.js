const User =require('../model/People');
const bcrypt = require("bcrypt");
// new registration controller
async function newRegister(req,res,next)
{
    //Destructuring user Password
    const {password}=req.body;
    // Plain password hash password convert
    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    // create mongoose object
    let newUser=User({
        ...req.body,
        password:hashedPassword
    });

    try {
        // Save user info in database
        let result=await newUser.save();
        let finalResult={
            name:result.name,
            email:result.email,
            role:result.role
        }
        res.status(200).json({"message":"Registration success","data":finalResult});
    } catch (error) {
        res.status(500).json({"message":error.message});
    }

}

module.exports={
    newRegister,
}
