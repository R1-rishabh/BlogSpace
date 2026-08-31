import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import PageLayout from "../layouts/PageLayout";
import "./Profile.css";

function Profile() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            api.get("/users/me"),
            api.get("/posts/my-posts")
        ])
            .then(([userRes, postsRes]) => {
                console.log("PROFILE:", userRes.data);
                console.log("MY POSTS:", postsRes.data);

                setUser(userRes.data.user);
                setPosts(postsRes.data.posts || []);
            })
            .catch((error) => {
                console.log("Error fetching profile:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this post?"
        );
        if (!confirmDelete) return;

        try {
            await api.delete(`/posts/${id}`);
            setPosts((prev) => prev.filter((post) => post._id !== id));
        } catch (error) {
            console.log(error);
            alert("Failed to delete post.");
        }
    };

    if (loading) {
        return (
            <PageLayout>
                <Navbar />
                <div className="profile-loading">
                    <h2>Loading profile...</h2>
                </div>
            </PageLayout>
        );
    }

    const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);

    return (
        <PageLayout>
            <div className="full">
            <Navbar />

            <div className="profile-page">

                <div className="profile-card">

                    <div className="profile-avatar">
                        {user?.username?.[0]?.toUpperCase() || "U"}
                    </div>

                    <h2 className="profile-username">{user?.username}</h2>
                    <p className="profile-email">{user?.email}</p>

                    {user?.bio && (
                        <p className="profile-bio">{user.bio}</p>
                    )}

                    <div className="profile-stats">

                        <div className="stat-item">
                            <span className="stat-value">{posts.length}</span>
                            <span className="stat-label">Posts</span>
                        </div>

                        <div className="stat-divider" />

                        <div className="stat-item">
                            <span className="stat-value">{totalViews}</span>
                            <span className="stat-label">Views</span>
                        </div>

                    </div>

                    <div className="profile-actions">
                        <Link to="/create">
                            <button className="write-post-btn">
                                Write a new post
                            </button>
                        </Link>

                        <button className="logout-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>

                </div>

                <div className="my-posts-section">

                    <h3>My Posts</h3>

                    {posts.length === 0 ? (
                        <div className="no-posts-message">
                            <p>You haven't written any posts yet.</p>
                        </div>
                    ) : (

                        posts.map((post) => (

                            <div className="my-post-card" key={post._id}>

                                <div className="my-post-top">
                                    <h4>{post.title}</h4>
                                    <span className="my-post-date">
                                        {new Date(post.createdAt).toLocaleDateString("en-GB", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </span>
                                </div>

                                <p className="my-post-excerpt">
                                    {post.content?.length > 120
                                        ? post.content.substring(0, 120) + "..."
                                        : post.content}
                                </p>

                                <div className="my-post-footer">

                                    <span className="my-post-views">
                                        👁 {post.views || 0} views
                                    </span>

                                    <div className="my-post-actions">
                                        <Link to={`/post/${post._id}`}>Read →</Link>
                                        <button onClick={() => navigate(`/edit/${post._id}`)}>
                                            Edit
                                        </button>
                                        <button
                                            className="delete-link"
                                            onClick={() => handleDelete(post._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>

                                </div>

                            </div>

                        ))

                    )}

                </div>

            </div>
         </div>
        </PageLayout>
    );
}

export default Profile;