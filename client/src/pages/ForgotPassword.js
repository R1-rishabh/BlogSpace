import {useState} from "react";
import {Link} from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import PageLayout from "../layouts/PageLayout";
import "./ForgotPassword.css";

function ForgotPassword(){
    const [email ,setEmail] = useState("");
    const [message ,setMessage] = useState("");
    const [error , setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [submitted ,setSubmitted] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setSubmitting(true); 

        try{
            const response = await api.post(
                "http://localhost:5000/api/auth/forgot-password",
                {email}
            );

            setMessage(response.data.message);
            setSubmitted(true);
        }
        catch(error){
            console.log("Forgot Password Error:", error);
            setError(
                error.response?.data?.message || "Something went wrong."
            );
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <PageLayout>
            <div className="forgot-password-page">
                <Navbar />
                <div className="forgot-password-container">

                    <h1>Forgot Password?</h1>
                    <p className="form-subtitle">
                        Enter your email and we'll send you a link to reset your password.
                    </p>

                    {submitted ? (
                        <div className="success-box">
                            <p>{message}</p>
                            <p className="success-note">
                                Check your inbox for the reset link. It expires in 15 minutes.
                            </p>
                        </div>
                    ) : (
                        <form className="forgot-password-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your registered email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            {error && <p className="error-text">{error}</p>}

                            <button
                                type="submit"
                                className="forgot-password-btn"
                                disabled={!email.trim() || submitting}
                            >
                                {submitting ? "Sending..." : "Send Reset Link"}
                            </button>
                        </form>
                    )}

                    <p className="login-link">
                        Remembered your password?{" "}
                        <Link to="/login">Login</Link>
                    </p>

                </div>
            </div>
        </PageLayout>
    );
}

export default ForgotPassword;
