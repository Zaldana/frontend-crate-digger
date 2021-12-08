import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import AxiosBackend from "../../lib/axios/AxiosBackend";
import CheckToken from "../../hooks/CheckTokenHook";
import "./Signin.css";

function Signin() {

    const { dispatch } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const { checkJwtToken } = CheckToken();

    useEffect(() => {
        if (checkJwtToken()) {
            navigate("/");
        }
    }, []);

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            let payload = await AxiosBackend.post(
                'login/',{
                    email,
                    password,
                }
            );

            window.localStorage.setItem("jwtToken", payload.data.payload);

            let decodedToken = jwtDecode(payload.data.payload);

            dispatch({
                type: "LOGIN",
                email: decodedToken.email,
            });

            navigate("/protected-home");
        
        } catch (e) {
            
            toast.error(e.response.data.error, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (
        <div>
            <main>
                <form onSubmit={handleSubmit}>
                    <h1 >Please Sign In</h1>

                    <div>
                        <label>Email Address</label>
                        < br/>
                        <input
                            type="email"
                            id="email"
                            placeholder="name@example.com"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div></div>
                        
                    </div>

                    <div>
                        <label>Password</label>
                        <br />
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <br />
                    <button type="submit">
                        Sign In
                    </button>
                </form>
            </main>
        </div>
    )
}

export default Signin