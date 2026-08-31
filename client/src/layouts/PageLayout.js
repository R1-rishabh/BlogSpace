
import Footer from "../components/Footer";
import { motion } from "framer-motion";

import "./PageLayout.css";

function PageLayout({ children }) {

    return (

        <>
            
            <motion.div 
                className="page-layout"
                initial = {{opacity :0, y:12}}
                animate = {{opacity:1,y :0}}
                exit = {{opacity:0, y: -12}}
                transition={{duration:0.35, ease:"easeOut"}}>
                {children}
            </motion.div>

            <Footer />

        </>

    );

}

export default PageLayout;