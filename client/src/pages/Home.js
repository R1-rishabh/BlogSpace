import Header from "../components/Header";
import Bloglist from "../components/Bloglist";
import Navbar from "../components/Navbar";
import PageLayout from "../layouts/PageLayout";
import "./Home.css";
import { useState,useEffect } from "react";
import axios from "axios";
import api from "../api/axios"

function Home(){
    const [posts,setPosts] = useState([]);
    useEffect(()=>{
        api
           .get("http://localhost:5000/api/posts")
           .then((response)=>{
                console.log(response.data);
                setPosts(response.data.posts);
           })
           .catch((error) => {
            console.log(error);
           })
    },[]);
    return(
        <PageLayout>
            <div className="landing-page">

               <Navbar />

               <Header />

            </div>
            <section id="latest">
                <Bloglist posts={posts}/>
            </section>


      </PageLayout>
    );
}
export default Home;