const User = require("../models/User");
const Post = require("../models/Post");

const getMyProfile = async(req , res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");

        if(!user){
            return res.status(404).json({
                message:"User not found"
            });
        }

        const postCount = await Post.countDocuments({ author : req.user.id});

        return res.status(200).json({
            message:"Profile fetched successfully",
            user,
            postCount
        });
    }catch (error){
        console.log(error);
        return res.status(500).json({
            message : "Server Error"
        });
    }
};

const updateMyProfile = async(req,res) => {
    try{
        const { username , bio } = req.body;
        if(username){
            const existingUser = await User.findOne({
                username,
                _id: {$ne : req.user.id }
            });

            if(existingUser){
                return res.status(400).json({
                    message:"Username already taken"
                });
            }
        }

        const updateFields = {};
        if(username !== undefined )updateFields.username = username;
        if(bio !== undefined) updateFields.bio = bio;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            updateFields,
            { new: true , runValidators: true}
        ).select("-password");

        return res.status(200).json({
            message:"Profile updated successfully",
            user
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        });
    }
};

const getPublicProfile = async (req , res ) => {
    try{
        const { id } = req.params;

        const user = await User.findById(id).select("-password -email -resetPasswordToken -resetPasswordExpires");

        if(!user){
            return res.status(404).json({
                message : "User not found"
            });
        }

        const posts = await Post.find({ author : id})
            .sort({createdAt: -1});

        const totalViews = posts.reduce((sum , post) => sum+ (post.views || 0),0);

        return res.status(200).json({
            message: "Public Profile fetched successfully",
            user,
            posts,
            postCount : posts.length,
            totalViews
        });
    } catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Server Error"
        });
    }
};
module.exports = {
     getMyProfile,
     updateMyProfile,
     getPublicProfile
};
