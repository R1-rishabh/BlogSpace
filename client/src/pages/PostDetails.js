import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import PageLayout from "../layouts/PageLayout";
import api from "../api/axios";
import { useNavigate , Link} from "react-router-dom";
import "./PostDetails.css";
import Navbar from "../components/Navbar";


function PostDetails(){
    const navigate = useNavigate();
    const {id} = useParams();
    const { user } = useContext(AuthContext);
    const hasFetched = useRef(false);
    const handleDelete = async () =>{
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this post ?"
        );
        if(!confirmDelete){
            return;
        }
        try { 
            await api.delete(`/posts/${id}`);
            alert("Post Deleted Successfully!");
            navigate("/");
        } catch(error){
            console.log(error);
            alert("Failed to delete post.")
        }
    };
    const [post, setPost]=useState(null);
    useEffect(() => {
        if(hasFetched.current) return;
        hasFetched.current = true;

        api
            .get(`/posts/${id}`)
            .then((response) =>{
                console.log(response.data);
                setPost(response.data.post);
            })
            .catch((error) => {
                console.log(error);
            });
    },[id]);
    if (!post) {
    return (
        <PageLayout>

            <Navbar />

            <div className="loading">
                <h2>Loading Article...</h2>
            </div>

        </PageLayout>
    );
    }

    const isAuthor = user && post?.author?._id === user.id;

    return (
        <PageLayout>
            <div className="post-details">
            <Navbar/>
        <div className="post-details-container">
            <div className="post-card">
                <button
                    className="back-top-btn"
                    onClick={() => navigate(-1)}>
                        ← Back
                    </button>
                <h1>{post.title}</h1>
                <div className="post-meta">

                    <span className="post-author">
                        <Link to={`/user/${post.author?._id}`}>
                            {post.author?.username || "Admin"}
                        </Link>
                    </span>
                    <span>•</span>

                    <span>
                        {new Date(post.createdAt).toLocaleDateString("en-GB",{
                            day:"numeric",
                            month: "long",
                            year:"numeric"
                        })}
                    </span>

                    <span>•</span>

                    <span>5 min read</span>

                </div>
                 <div className="post-content">

                    <p>{post.content}</p>

                </div>
                <hr />

                <div className="button-group">
                    <button
                        className="back-btn"
                        onClick={() => navigate("/")}
                    >
                        ← Back Home
                    </button>
                    {isAuthor && (
                    <>
                    <button
                        className="edit-btn"
                        onClick={() => navigate(`/edit/${id}`)}
                    >
                        Edit Article
                    </button>

                    <button
                        className="delete-btn"
                        onClick={handleDelete}
                    >
                        Delete Article
                    </button>
                    </>
                    )}
                </div>
            </div>
        </div>
        </div>
    </PageLayout>
    );
    
}
export default PostDetails;