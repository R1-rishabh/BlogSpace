import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";
import "./Bloglist.css";

function Bloglist({ posts }) {

    return (

        <section className="blog-section">

            <div className="section-header">

                <div>

                    <h2>Latest Articles</h2>

                    <p>
                        Discover fresh stories, ideas and experiences shared by our community.
                    </p>

                </div>

            </div>

            <div className="blog-list">

                {posts.slice(0,4).map((post) => (

                    <BlogCard
                        key={post._id}
                        id={post._id}
                        title={post.title}
                        content={post.content}
                        author ={post.author?.username}
                        authorId = {post.author?._id}
                        createdAt={post.createdAt}
                    />

                ))}

            </div>
            <div className="view-all-container">
                <Link to="/posts" className="view-all-btn">

                    Browse All Articles →

                </Link>
            </div>

        </section>

    );

}

export default Bloglist;