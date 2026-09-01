import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import PageLayout from "../layouts/PageLayout";
import "./ResetPassword.css";

function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setSubmitting(true);

        try {
            const response = await axios.post(
                `http://localhost:5000/api/auth/reset-password/${token}`,
                { password }
            );

            console.log("Reset Response:", response.data);
            setSuccess(true);

            setTimeout(() => {
                navigate("/login");
            }, 2500);

        } catch (error) {
            console.log("Reset Password Error:", error);
            setError(
                error.response?.data?.message || "Something went wrong."
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <PageLayout>
            <div className="reset-password-page">
                <Navbar />
                <div className="reset-password-container">

                    {success ? (
                        <div className="success-box">
                            <h1>Password Reset Successful!</h1>
                            <p>Redirecting you to login...</p>
                        </div>
                    ) : (
                        <>
                            <h1>Set New Password</h1>
                            <p className="form-subtitle">
                                Enter a new password for your account.
                            </p>

                            <form className="reset-password-form" onSubmit={handleSubmit}>

                                <div className="form-group">
                                    <label htmlFor="password">New Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="Enter new password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        placeholder="Re-enter new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>

                                {error && <p className="error-text">{error}</p>}

                                <button
                                    type="submit"
                                    className="reset-password-btn"
                                    disabled={
                                        !password.trim() ||
                                        !confirmPassword.trim() ||
                                        submitting
                                    }
                                >
                                    {submitting ? "Resetting..." : "Reset Password"}
                                </button>

                            </form>

                            <p className="login-link">
                                Remembered your password?{" "}
                                <Link to="/login">Login</Link>
                            </p>
                        </>
                    )}

                </div>
            </div>
        </PageLayout>
    );
}

export default ResetPassword;