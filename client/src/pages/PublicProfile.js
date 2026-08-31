import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import PageLayout from "../layouts/PageLayout";
import "./Profile.css";

function PublicProfile() {
    const { id } = useParams();

    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [postCount, setPostCount] = useState(0);
    const [totalViews, setTotalViews] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        api
            .get(`/users/${id}`)
            .then((response) => {
                setUser(response.data.user);
                setPosts(response.data.posts || []);
                setPostCount(response.data.postCount);
                setTotalViews(response.data.totalViews);
            })
            .catch((error) => {
                console.log("Error fetching public profile:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

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

    if (!user) {
        return (
            <PageLayout>
                <Navbar />
                <div className="profile-loading">
                    <h2>User not found.</h2>
                </div>
            </PageLayout>
        );
    }

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

                    {user?.bio && (
                        <p className="profile-bio">{user.bio}</p>
                    )}

                    <div className="profile-stats">

                        <div className="stat-item">
                            <span className="stat-value">{postCount}</span>
                            <span className="stat-label">Posts</span>
                        </div>

                        <div className="stat-divider" />

                        <div className="stat-item">
                            <span className="stat-value">{totalViews}</span>
                            <span className="stat-label">Views</span>
                        </div>

                    </div>

                </div>

                <div className="my-posts-section">

                    <h3>Posts by {user?.username}</h3>

                    {posts.length === 0 ? (
                        <div className="no-posts-message">
                            <p>No posts published yet.</p>
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
                                        {post.views || 0} views
                                    </span>

                                    <Link to={`/post/${post._id}`} className="read-link">Read →</Link>

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

export default PublicProfile;