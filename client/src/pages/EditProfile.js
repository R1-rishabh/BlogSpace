import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import AuthContext from "../context/AuthContext";
import Navbar from "../components/Navbar";
import PageLayout from "../layouts/PageLayout";
import "./EditProfile.css";

function EditProfile() {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api
            .get("/users/me")
            .then((response) => {
                setUsername(response.data.user.username);
                setBio(response.data.user.bio || "");
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            const response = await api.put("/users/me", {
                username,
                bio
            });

            const updatedUser = response.data.user;

            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));

            navigate("/profile");
        } catch (error) {
            console.log(error);
            setError(
                error.response?.data?.message || "Failed to update profile."
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <PageLayout>
                <Navbar />
                <div className="edit-profile-loading">
                    <h2>Loading...</h2>
                </div>
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <div className="full-page">
            <Navbar />

            <div className="edit-profile-page">

                <div className="edit-profile-container">

                    <h1>Edit Profile</h1>
                    <p className="form-subtitle">
                        Update your username and bio.
                    </p>

                    <form className="edit-profile-form" onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="bio">Bio</label>
                            <textarea
                                id="bio"
                                rows="4"
                                placeholder="Tell us a bit about yourself..."
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            ></textarea>
                        </div>

                        {error && <p className="error-text">{error}</p>}

                        <div className="button-group">

                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() => navigate("/profile")}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="submit-btn"
                                disabled={!username.trim() || submitting}
                            >
                                {submitting ? "Saving..." : "Save Changes"}
                            </button>

                        </div>

                    </form>

                </div>

            </div>
        </div>
        </PageLayout>
    );
}

export default EditProfile;