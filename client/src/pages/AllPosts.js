import { useEffect , useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import PageLayout from "../layouts/PageLayout";
import { motion, AnimatePresence } from "framer-motion";
import "./AllPosts.css";

function Allposts(){

    const [posts , setPosts] = useState([]);
    const [loading , setLoading] = useState(true);
    const [searchTerm , setSearchTerm] = useState("");

    const fetchPosts = (query = "") => {
        setLoading(true);
        api
            .get(`/posts${query ? `?search=${encodeURIComponent(query)}` : ""}`)
            .then((response)=>{
                console.log("ALL POSTS : ",response.data);
                setPosts(response.data.posts || response.data);
            })
            .catch((error)=>{
                console.log("Error Fetching posts :",error);
            })
            .finally(()=>{
                setLoading(false);
            })
    };

    useEffect(()=>{
        fetchPosts();
    },[]);

    useEffect(()=>{
        const delay = setTimeout(()=>{
            fetchPosts(searchTerm);
        },400);

        return () => clearTimeout(delay);
    }, [searchTerm]);

    return(
        <PageLayout>
            <div className="full-page">
            <Navbar/>

            <div className="all-posts-page">

                <div className="all-posts-header">
                    <p className="page-label">Explore</p>

                    <h1>All Posts</h1>
                    <p>
                        Discover Stories ,ideas,and experiences
                        from the BlogSpace community.
                    </p>
                </div>
                 <div className="search-bar-container">
                    <input
                        type="text"
                        placeholder="Search posts by title"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
               {loading ? (
                    <div className="posts-message">
                        <h2>Loading posts...</h2>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="posts-message">
                        <h2>No posts yet.</h2>
                        <p>Be the first one to share a story.</p>

                        <Link to="/create">
                            <button className="create-post-btn">
                                Write a Post
                            </button>
                        </Link>
                    </div>
                ) : (

                 <div className="posts-grid">

                    <AnimatePresence>
                        {posts.map((post) => (

                            <motion.article
                                className="post-card"
                                key={post._id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >

                                <div className="post-card-top">
                                    <span className="post-author">
                                        {post.author?.username || "Admin"}
                                    </span>

                                    <span>•</span>

                                    <span>
                                        {new Date(
                                            post.createdAt
                                        ).toLocaleDateString()}
                                    </span>
                                </div>

                                <h2>{post.title}</h2>

                                <p>
                                    {post.content?.length > 150
                                        ? post.content.substring(0, 150) + "..."
                                        : post.content}
                                </p>

                                <Link to={`/post/${post._id}`}>
                                    Continue Reading →
                                </Link>

                            </motion.article>

                        ))}
                    </AnimatePresence>

                </div>

                )}
            </div>
        </div>
        </PageLayout>
    );
}

export default Allposts;