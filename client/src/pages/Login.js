import { useState ,useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PageLayout from "../layouts/PageLayout";
import "./Login.css";

function Login(){
    const navigate  = useNavigate();
    const { setIsLoggedIn ,setUser } = useContext(AuthContext);
    const[email , setEmail] = useState("");
    const[password , setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password
                }
            );


            console.log("Login Response:" , response.data);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );
            console.log("LOGIN: isLoggedIn set to TRUE");
            setUser(response.data.user);
            setIsLoggedIn(true);

            console.log(
                "Stored Token:",
                localStorage.getItem("token")
                
            );

            console.log("Logged In User :",
                response.data.user
            );

            navigate("/");

        } catch(error){
            console.log("Login Error :" , error);
            console.log("Backend Reponse:", error.response?.data);
        }
    };

    return(
        <PageLayout>

            <div className="login-page">
                <Navbar/>
                <div className="login-container">
                    <h1>Welcome Back</h1>
                    <p className="form-subtitle">
                        Login to continue sharing your stories.
                    </p>
                    <form className="login-form"
                          onSubmit={handleSubmit}
                    >
                        <div className="form-group">
                            <label htmlFor="email">
                                Email
                            </label>
                            <input
                               type="email"
                               id="email"
                               placeholder="Enter your email"
                               value={email}
                               onChange={(e)=>
                                setEmail(e.target.value)
                               } 
                            />
                        </div>
                         <div className="form-group">

                            <label htmlFor="password">
                                Password
                            </label>

                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />

                        </div>
                        <button
                            type="submit"
                            className="login-btn"
                            disabled={
                                !email.trim() ||
                                !password.trim()
                            }
                        >
                            Login
                        </button>

                    </form>
                    <p className="register-link">
                        Don't have an account?{" "}
                        <span onClick={() => navigate("/register")}>
                            Create Account
                        </span>
                    </p>
                </div>
            </div>
        </PageLayout>
    );
}

export default Login;