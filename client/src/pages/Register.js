import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PageLayout from "../layouts/PageLayout";
import "./Register.css";

function Register() {
    const navigate = useNavigate();

    const[username , setUsername] = useState("");
    const[email,setEmail] = useState("");
    const[password , setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post(
             "http://localhost:5000/api/auth/register",
               {
                    username,
                    email,
                    password
               }
            );
            console.log("Register Response:", response.data);

            alert("Registration Successful !");

            navigate("/login");
        } catch(error){
            console.log("Register Error:",error);
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Something went wrong");
            }
        }
    };

    return (
        <PageLayout>
            <div className="register-page">
                <Navbar />
                <div className="register-conatainer">
                    <h1>Create Your Account</h1>
                    <p className="form-subtitle">
                        Join BlogSpace and Start sharing your stories.
                    </p>

                    <form className="register-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">
                                username
                            </label>

                            <input
                                type="text"
                                id="username"
                                placeholder="Enter Your username"
                                value={username}
                                onChange={(e)=>
                                    setUsername(e.target.value)
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
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
                            <label htmlFor="password">Password</label>
                            <input 
                                type="passowrd"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange = {(e)=>
                                    setPassword(e.target.value)
                                }
                            />
                        </div>
                        <button 
                            type="submit"
                            className="register-btn"
                            disabled = {
                                !username.trim() || 
                                !email.trim() ||
                                !password.trim()
                            }
                        > Create Account</button>
                    </form>

                    <p className="login-link">
                        Already have an account ? {" "}
                        <span onClick={()=> navigate("/login")}>Login</span>
                    </p>
                </div>

            </div>
        </PageLayout>
    )
}

export default Register ;