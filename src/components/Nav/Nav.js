import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import './Nav.css'

function Nav({ user, setUser }) {

    const { state: user, dispatch } = useContext(AuthContext);

    let homeLink = user ? "/protected-home" : "/";

    let linkTitle2 = user.user !== null ? user.user.username : "Sign up";
    let link2 = user.user !== null ? "/profile" : "/sign-up";

    let linkTitle3 = user.user !== null ? "logout" : "Sign in";
    let link3 = user.user !== null ? "/" : "/sign-in";

    let logoutButton = user ? logout : () => { };


    let logoutButton = user ? logout : () => { };

    function logout() {
        //setUser(null);
        dispatch({
            type: "LOGOUT",
        });
        window.localStorage.removeItem("jwtToken");
    }

    return (
        <nav className="navbar">
            <div className="home-link-container">
             
                <Link to={homeLink}>Home</Link>
            
            </div>
            <div>
                
                <Link to={link2}>{linkTitle2}</Link>
                <Link to={link3}onClick={() => logoutButton()}>{linkTitle3}</Link>

            </div>
        </nav>
    );
}

export default Nav;