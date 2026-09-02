const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto"); 
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

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

    if(!user){
        return res.status(401).json({
            message:"Invalid Credentials"
        })
    } 
    const isMatch = await bcrypt.compare(password, user.password);

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

        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        await resend.emails.send({
            from: "BlogSpace <onboarding@resend.dev>",
            to: user.email,
            subject: "Reset you BlogSpace password",
            html:`
                <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
                    <h2 style="color: #111827;">Reset your password</h2>
                    <p style="color: #4b5563; font-size: 15px; line-height: 1.6;">
                        We received a request to reset your BlogSpace password. Click the button below to set a new password. This link will expire in 15 minutes.
                    </p>
                    <a href="${resetLink}" style="display:inline-block; margin-top:16px; padding:14px 28px; background:#2563eb; color:white; text-decoration:none; border-radius:10px; font-weight:600;">
                        Reset Password
                    </a>
                    <p style="color: #9ca3af; font-size: 13px; margin-top: 24px;">
                        If you didn't request this, you can safely ignore this email.
                    </p>
                </div>
            `
        });

        console.log("Password reset email sent to:",user.email);

        return res.status(200).json({
            message: "Password reset link has been sent to your email."
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