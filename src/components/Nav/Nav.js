import React from "react";
import { Link } from "react-router-dom";
import './Nav.css'

function Nav({ user, setUser }) {

    let homeLink = user ? "/protected-home" : "/";

    let linkTitle2 = user ? user.username : "Sign Up";
    let link2 = user ? "/profile" : "/sign-up";

    let linkTitle3 = user ? "logout" : "Sign In"
    let link3 = user ? "/" : "/sign-in"

    let logoutButton = user ? logout : () => { };

    function logout() {
        setUser(null)
        window.localStorage.removeItem("jwtToken")
    }

    return (
        <nav className="navbar">
            <div className="home-link-container">
                <Link to={homeLink}>Home</Link>
            </div>
            <div>        
                <Link to={link2}>
                    {linkTitle2}
                </Link>
                     
                <Link to={link3}
                    onClick={() => logoutButton()}
                >
                    {linkTitle3}
                </Link>
            </div>
        </nav>
    );
}

export default Nav;