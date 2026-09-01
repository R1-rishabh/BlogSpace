const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto"); 

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

const forgotPassword = async(req , res) => {
    try{
        const { email } = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({
                message:"No account found with this email"
            });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

        await user.save();

        const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

        console.log("============================");
        console.log("PASSWORD RESET LINK (dev only ) :");
        console.log(resetLink);
        console.log("================================");

        return res.status(200).json({
            message: "Password reset link generated. Check server console."
        });

    } catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Server Error"
        });
    }
};

const resetPassword = async(req,res) => {
    try{
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken : token,
            resetPasswordExpires:{$gt : Date.now()}
        });

        if(!user){
            return res.status(400).json({
                message : "Reset Link is invalid or has expired"
            });
        }
        user.password = password;
        user.resetPassword = undefined;
        user.resetPassowrdExpires = undefined;

        await user.save();

        return res.status(200).json({
            message: "Password reset successful. Please login."
        });

    } catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Server Error"
        });
    }
};

module.exports = {
    registerUser,loginUser,
    forgotPassword,resetPassword
};