import "./Header.css";
import { useNavigate } from "react-router-dom";
import { FaPenNib, FaArrowRight, FaBookOpen, FaUsers } from "react-icons/fa";

function Header() {

    const navigate = useNavigate();

    return (

        <section className="hero" >

           

            {/* Heading */}

            <h1>
                Discover Amazing Stories
            </h1>

            {/* Description */}

            <p>
                Every story begins with a blank page. Start writing yours today.  
            </p>

            {/* Buttons */}

            <div className="hero-buttons">

                <button
                    className="hero-btn"
                    onClick={() => navigate("/create")}
                >
                    <FaPenNib />
                    Create New Post
                </button>

                <button
                    className="browse-btn"
                    onClick={() => {
                        document
                            .getElementById("latest")
                            ?.scrollIntoView({
                                behavior: "smooth"
                            });
                    }}
                >
                    Browse Posts
                    <FaArrowRight />
                </button>

            </div>

            {/* Stats */}

            <div className="hero-stats">

                <div className="stat">

                    <FaBookOpen className="stat-icon" />

                    <div>

                        <h3>24</h3>

                        <span>Articles</span>

                    </div>

                </div>

                <div className="stat">

                    <FaUsers className="stat-icon" />

                    <div>

                        <h3>1.2K</h3>

                        <span>Readers</span>

                    </div>

                </div>

                <div className="stat">

                    <FaPenNib className="stat-icon" />

                    <div>

                        <h3>8</h3>

                        <span>Authors</span>

                    </div>

                </div>

            </div>
        
        </section>

    );
}

export default Header;