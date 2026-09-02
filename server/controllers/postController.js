const Post = require("../models/Post");
const User = require("../models/User");

const createPost = async (req , res) =>{
    try{
        const { title , content } = req.body; 
        const post = new Post({
            title,
            content,
            author:req.user.id
        });
        await post.save();

        return res.status(201).json({
            message : "Post Created Successfully",
            post
        });
    } catch(error){
        console.log(error);
        return res.status(500).json({
            message : "Server Error"
        });
    }
};

const getAllPosts = async (req, res) => {
    try{
        const { search } = req.query;

        const filter = search 
             ? {title: { $regex: search, $options: "i" }}
              :{};
        const posts = await Post.find(filter)
         .populate("author", "username")
         .sort({ createdAt : -1});

        return res.status(200).json({
            message: "Posts fetched successfully",
            posts
        })
    }catch (error){
        console.log(error);
        return res.status(500).json({
            message : "Server Error"
        });
    }
};

const getPostById = async(req, res) =>{
    try{
        const post = await Post.findById(req.params.id)
        .populate("author", "username");
        if(!post){
            return res.status(404).json({
                message : "Post not found"
            });
        }
        const isAuthor = req.user && post.author._id.toString() === req.user.id;

        if(!isAuthor){
            post.views +=1;
            await post.save();
        }

        return res.status(200).json({
            message : "Post fetched successfully",
            post
        });
    } catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        });
    }
};

const updatePost = async (req , res) => {
    try{
        const { id } = req.params;
        const { title , content } = req.body;
        const post = await Post.findById(id);

        if(!post){
            return res.status(404).json({
                message : "Post not found"
            });
        }
        if(post.author.toString()!== req.user.id){
            return res.status(403).json({
                message : "You are not authorized to update this post"
            });
        }
        post.title = title;
        post.content = content;

        await post.save();

        return res.status(200).json({
            message:"Post Updated Successfully",
            post
        });
    } catch(error){
        console.log(error);

        return res.status(500).json({
            messsage:"Server Error"
        });
    }
};

const deletePost = async ( req , res) => {
    try { 
        const { id } = req.params;
        const post = await Post.findById(id);

        if(!post){
            return res.status(404).json({
                message:"Post not found"
            });
        }

        if(post.author.toString() !== req.user.id){
            return res.status(403).json({
                message : "You are not authorized to delete this post"
            });
        }

        await post.deleteOne();

        return res.status(200).json({
            message:"Post Deleted Successfully"
        });
    } catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        });
    }
};

const getMyPosts = async(req,res) => {
    try{
        const posts = await Post.find({ author : req.user.id})
        .sort({ createdAt: -1});

        return res.status(200).json({
            message: "Your posts fetched successfully",
            posts,
            totalPosts: posts.length,
            totalViews: posts.reduce((sum ,post)=>sum+post.views,0)
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        });
    }
};

const getStats = async(req , res) =>{
    try{
        const totalPosts = await Post.countDocuments();

        const posts = await Post.find().select("views");
        const totalViews = posts.reduce((sum , post) => sum + (post.views || 0),0);

        const totalAuthors = await User.countDocuments();

        return res.status(200).json({
            totalPosts,
            totalViews,
            totalAuthors
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Server Error"
        });
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    getMyPosts,
    getStats
};
