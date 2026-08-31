import { Link , useNavigate} from "react-router-dom";
import { FaPenNib, FaHome, FaUserCircle } from "react-icons/fa";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../context/AuthContext";

import "./Navbar.css";

function Navbar() {

    const navigate = useNavigate();
    const { isLoggedIn , setIsLoggedIn ,user} = useContext(AuthContext);
    const [dropdownOpen , setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setDropdownOpen(false);
    console.log(
        "Token after logout:",
        localStorage.getItem("token")
    );
    navigate("/");
};
    useEffect(()=>{
        function handleClickOutside(e){
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown",handleClickOutside);
        return () => document.removeEventListener("mousedown",handleClickOutside);
    },[]);

   return (
    <nav className="navbar">

        <div className="logo">
            <div className="logo-icon">
                <FaPenNib />
            </div>

            <h1>
                <span>Blog</span>Space
            </h1>
        </div>

        <div className="nav-links">

            <Link to="/">
                <button className="home-btn">
                    <FaHome />
                    Home
                </button>
            </Link>

            {isLoggedIn ? (
                <>
                    <Link to="/create">
                        <button className="write-btn">
                            <FaPenNib />
                            Write a Post
                        </button>
                    </Link>

                    
                        <div className="profile-dropdown" ref={dropdownRef}>
                            <button
                                className="profile-trigger"
                                onClick={() => setDropdownOpen((prev) => !prev)}
                            >
                                <FaUserCircle className="profile-icon" />
                                <span className="profile-name">{user?.username}</span>
                            </button>

                            {dropdownOpen && (
                                <div className="dropdown-menu">
                                    <div className="dropdown-header">
                                        Signed in as <strong>{user?.username}</strong>
                                    </div>
                                    <button onClick={() => { navigate("/profile"); setDropdownOpen(false); }}>
                                        Profile
                                    </button>
                                    <button onClick={() => { navigate("/edit-profile"); setDropdownOpen(false); }}>
                                        Edit Profile
                                    </button>
                                    <button className="logout-option" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
            ) : (
                <>
                    <Link to="/login">
                            <button className="login-btn">
                                Login
                            </button>
                        </Link>

                        <Link to="/register">
                            <button className="register-btn">
                                Register
                            </button>
                    </Link>
                </>
            )}

        </div>

    </nav>
  );
}

export default Navbar;