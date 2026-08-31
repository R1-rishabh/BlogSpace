import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";
import Register from "./pages/Register";
import Login from "./pages/Login.js";
import AllPosts from "./pages/AllPosts";
import EditProfile from "./pages/EditProfile";
import Profile from "./pages/Profile.js";
import PublicProfile from "./pages/PublicProfile.js";


import { BrowserRouter, Routes, Route ,useLocation} from "react-router-dom";
import { AnimatePresence } from "framer-motion";


function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>

                <Route path="/" element={<Home />} />

                <Route path="/create" element={<CreatePost />} />

                <Route path="/post/:id" element={<PostDetails />} />

                <Route path="/edit/:id" element={<CreatePost />} />

                <Route path="/register" element={<Register />} />

                <Route path="/login" element={<Login />} />

                <Route path="/posts" element={<AllPosts />} />

                <Route path="/profile" element={<Profile />} />

                <Route path="/edit-profile" element={<EditProfile />} />

                <Route path="/user/:id" element ={<PublicProfile/> } />

            </Routes>
        </AnimatePresence>
    );
}

function App() {

    return (
        <BrowserRouter>
            <AnimatedRoutes />
        </BrowserRouter>
    );

}

export default App;

