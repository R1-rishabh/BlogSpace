import { useNavigate,useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import PageLayout from "../layouts/PageLayout";
import api from "../api/axios";
import "./CreatePost.css";

function CreatePost(){
    const navigate = useNavigate();
    const {id} = useParams();
    console.log(id);
    const [title , setTitle] = useState("");
    const [content , setContent] = useState("");
    useEffect(() =>{
        if(!id) return;
        api 
            .get(`/posts/${id}`)
            .then((response)=>{
                
                console.log("EDIT POST RESPONSE:", response.data);
                setTitle(response.data.post.title);
                setContent(response.data.post.content);
            })
            .catch((error)=>{
                console.log(error);
            });
    },[id]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        const newPost = {
            title,
            content
        };
        try{
            if(id){
                const response = await api.put(
                `http://localhost:5000/api/posts/${id}`,
                newPost
            );
            console.log("Post Updated:", response.data);
            } else {
                const response = await api.post(
                "http://localhost:5000/api/posts",
                newPost
            );
            console.log("Post Saved :", response.data);
            }

            setTitle("");
            setContent("");
            navigate("/");
        } catch(error){
            console.log(error);
        }
    };
    return (
        <PageLayout>
        
             <div className="create-page">
                <Navbar />
        <div className="create-post-container">
        <h1>
            {id ? "Edit Your Story." : " Create New Story."}
        </h1>
        <p className="form-subtitle">
            {id
                ? "Update your article and save the changes."
                : "Share your ideas with the world. Every great story starts here."
            }
        </p>

        <form className="create-post-form"
               onSubmit={handleSubmit}>

            <div className="form-group">
                <label htmlFor="title">Title</label>

                <input
                type="text"
                id="title"
                placeholder="Enter an engaging article title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="content">Content</label>

                <textarea
                id="content"
                rows="14"
                placeholder="Start writing your story here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                ></textarea>
            </div>

            <div className="button-group">

                <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/")}
                >
                Cancel
                </button>
                
                <button
                type="submit"
                className="submit-btn"
                disabled={!title?.trim() || !content?.trim()}
                >
                {id ? "Update Article" : "Publish Article"}
                </button>
            </div>

            </form>
        </div>
        </div>
    </PageLayout>
    );
}

export default CreatePost;