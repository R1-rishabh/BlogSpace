import "./Footer.css";

function Footer() {

    return (

        <footer className="footer">

            <p>
                © {new Date().getFullYear()} BlogApp. All Rights Reserved.
            </p>

            <p>
                Built using React, Node.js & MongoDB
            </p>

        </footer>

    );

}

export default Footer;