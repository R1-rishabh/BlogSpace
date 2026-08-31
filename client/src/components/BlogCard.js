import { Link } from "react-router-dom";
import { easeOut, motion } from "framer-motion";
import { FaArrowRight} from "react-icons/fa";


import "./BlogCard.css";

function BlogCard({ id, title, content,author,authorId,createdAt }) {

   const formattedDate = createdAt
      ? new Date(createdAt).toLocaleDateString("en-GB",{
         day: "numeric",
         month: "short",
         year: "numeric",
       })
       : "";
   return (
          <motion.div
            className="card"

               initial={{
                  opacity:0,
                  y:40
               }}

               animate={{
                  opacity:1,
                  y:0
               }}

               transition={{
                  duration:.4,
                  ease:easeOut
               }}

               whileHover={{
                  y:-8
               }}
             >

            <div className="card-category">
               Latest
                  </div>

                    <h2>{title}</h2>

                    <p>{content}</p>

                  <div className="card-footer">

                     <div className="card-info">
                         <span>
                            👤 {authorId ? (
                                <Link to={`/user/${authorId}`}>{author || "Admin"}</Link>
                            ) : (
                                author || "Admin"
                            )}
                         </span>
                         <span>📅 {formattedDate}</span>
                     </div>

                  <Link
                  to={`/post/${id}`}
                  className="read-more"
                  >
                      Continue Reading
                  <FaArrowRight className="arrow-icon"/>
         </Link>

      </div>
</motion.div>
);
}

export default BlogCard;