
import React, { useEffect } from "react";
import axios from "axios";
import AxiosBackend from "../../lib/axios/AxiosBackend";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import FirstNameHook from "../../hooks/FirstNameHook";
import LastNameHook from "../../hooks/LastNameHook";
import UsernameHook from "../../hooks/UsernameHook";
import PasswordHook from "../../hooks/PasswordHook";
import EmailHook from "../../hooks/EmailHook";
import CheckToken from "../../hooks/CheckTokenHook";
import "./Signup.css";

function Signup() {

    const [
        firstName,
        handleFirstNameOnChange,
        firstNameError
    ] = FirstNameHook();
    
    const [
        lastName,
        handleLastNameOnChange,
        lastNameError,
        setOnFocus,
        setOnBlur,
    ] = LastNameHook();

    const [
        username,
        handleUsernameOnChange,
        usernameError,
        setUsernameOnFocus,
        setUsernameOnBlur,
    ] = UsernameHook();

    const [
        password,
        handlePasswordOnChange,
        passwordError,
        setPasswordOnFocus,
        setPasswordOnBlur,
    ] = PasswordHook();

    const [
        email,
        handleEmailOnChange,
        emailError,
        setEmailOnFocus,
        setEmailOnBlur,
    ] = EmailHook();

    const navigate = useNavigate();
    
    const { checkJwtToken } = CheckToken();
    
    useEffect(() => {
        if (checkJwtToken()) {
            navigate("/");
        }
    }, []);

    try {
        
        await AxiosBackend.post(
            'create-user/',
            {
                firstName,
                lastName,
                username,
                email,
                password,
            }
        );

        toast.success("Congrats~! now you please sign in", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

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

    return (
        <div>
            <main>
                <form onSubmit={handleSubmit} >
                    <h1>Please Sign Up</h1>

                    <div>
                        <label>First Name</label>
                        <br/>
                        <input
                            type="text"      
                            id="firstName"
                            placeholder="First Name"

                        />
                        {/* error div */}
                        <div></div>
                        
                    </div>

                    <div>
                        <label>Last Name</label>
                        <br />
                        <input
                            type="text"
                            id="lastName"
                            placeholder="last name"

                        />
                        {/* error div */}
                        <div></div>
                   
                    </div>

                    <div>
                        <label>Username</label>
                        <br />
                        <input
                            type="text"
                            id="username"
                            placeholder="username"

                        />
                        {/* error div */}
                        <div></div>
                        
                    </div>

                    <div>
                        <label>Email address</label>
                        <br />
                        <input
                            type="email"
                            id="email"
                            placeholder="name@example.com"

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

                        />
                        <div></div>
                        
                    </div>
                    <br/>
                    <button type="submit">
                        Sign Up
                    </button>
                </form>
            </main>
        </div>
    )
}

export default Signup
