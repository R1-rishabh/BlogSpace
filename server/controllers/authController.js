const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerUser = async (req , res) =>{
    try{

        const user = new User(req.body);
        await user.save();
        res.status(201).json({
            message : "User Registered Successfully"
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"Server Error"
        });
    }
};

const loginUser = async (req,res) => {
    try {

    const {email , password} = req.body;

    const user = await User.findOne({email});

    console.log("USER FOUND:", user);

    if(!user){
        return res.status(401).json({
            message:"Invalid Credentials"
        })
    } 
    const isMatch = await bcrypt.compare(password, user.password);

    console.log("PASSWORD MATCH:", isMatch);

    if(!isMatch){
        return res.status(401).json({
            message:"Invalid Credentials"
        })
    }

    const token = jwt.sign(
        {id : user._id },
        process.env.JWT_SECRET,
        { expiresIn:"1d" }
    );

        return res.status(200).json({
            message: "Login Successful",
            token,
            user : {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
         
    }catch(error) {
        console.log(error);
        res.status(500).json({
            message:"Server Error"
        });
    }
}

module.exports = {
    registerUser,loginUser
};