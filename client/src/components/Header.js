import "./Header.css";
import { useState , useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaPenNib, FaArrowRight, FaBookOpen, FaUsers } from "react-icons/fa";
import api from "../api/axios";
import AuthContext from "../context/AuthContext";
function Header() {

    const navigate = useNavigate();
    const {isLoggedIn} = useContext(AuthContext);
    const [stats , setStats] = useState({
        totalPosts : 0,
        totalViews : 0,
        totalAuthors : 0
    });

    useEffect(()=>{
        api 
            .get("/posts/stats")
            .then((response) => {
                setStats(response.data);
            })
            .catch((error) => {
                console.log("Error fetching stats:",error);
            });
    } , []);

    const formatNumber = (num) => {
        if(num >=1000){
            return (num / 1000).toFixed(1) + "K";
        }
        return num;
    };

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
                    onClick={() => {
                        if(isLoggedIn){
                            navigate("/create");
                        }else {
                            navigate("/register");
                        }
                    }}
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

                        <h3>{formatNumber(stats.totalPosts)}</h3>

                        <span>Articles</span>

                    </div>

                </div>

                <div className="stat">

                    <FaUsers className="stat-icon" />

                    <div>

                        <h3>{formatNumber(stats.totalViews)}</h3>

                        <span>Readers</span>

                    </div>

                </div>

                <div className="stat">

                    <FaPenNib className="stat-icon" />

                    <div>

                        <h3>{formatNumber(stats.totalAuthors)}</h3>

                        <span>Authors</span>

                    </div>

                </div>

            </div>
        
        </section>

    );
}

export default Header;