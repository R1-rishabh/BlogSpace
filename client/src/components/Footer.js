import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaPenNib } from "react-icons/fa";
import "./Footer.css";

function Footer() {

    return (

        <footer className="footer">

            <div className="footer-top">

                <div className="footer-brand">
                    <div className="footer-logo">
                        <FaPenNib />
                        <h3><span>Blog</span>Space</h3>
                    </div>
                    <p className="footer-tagline">
                        BlogSpace brings together writers and readers, creating a space to share stories, ideas, and everyday moments.
                    </p>
                </div>

                <div className="footer-links">
                    <h4>Quick Links</h4>
                    <Link to="/">Home</Link>
                    <Link to="/posts">All Posts</Link>
                    <Link to="/create">Create Post</Link>
                </div>

                <div className="footer-connect">
                    <h4>Connect</h4>
                    <div className="footer-social">
                        <a href="https://github.com/R1-rishabh" target="_blank" rel="noopener noreferrer">
                            <FaGithub />
                        </a>
                        <a href="https://www.linkedin.com/in/rishabh-srivastava-677a16257/" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin />
                        </a>
                    </div>
                </div>

            </div>

            <hr className="footer-divider" />

            <div className="footer-bottom">
                <p>
                    © {new Date().getFullYear()} BlogSpace. All Rights Reserved.
                </p>
                <p className="footer-credit">
                    Designed & Developed by Rishabh Srivastava
                </p>
            </div>

        </footer>

    );

}

export default Footer;