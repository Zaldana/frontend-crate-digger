
import React, { useEffect } from "react";
import axios from "axios";
import AxiosBackend from "../../lib/axios/AxiosBackend";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FirstNameHook from "../../hooks/FirstNameHook";
import LastNameHook from "../../hooks/LastNameHook";
import UsernameHook from "../../hooks/UsernameHook";
import PasswordHook from "../../hooks/PasswordHook";
import EmailHook from "../../hooks/EmailHook";
import CheckTokenHook from "../../hooks/CheckTokenHook";
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
        setLastNameOnFocus,
        setLastNameOnBlur,
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
    
    const { checkJwtToken } = CheckTokenHook();
    
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
                            onChange={handleFirstNameOnChange}
                        />
                        <div>{firstNameError && firstNameError}</div>
                    </div>

                    <div>
                        <label>Last Name</label>
                        <br />
                        <input
                            type="text"
                            id="lastName"
                            placeholder="last name"
                            onFocus={() => setLastNameOnFocus(true)}
                            onBlur={() => setLastNameOnBlur(true)}
                            onChange={handleLastNameOnChange}
                        />
                        <div>{lastNameError && lastNameError}</div>
                    </div>

                    <div>
                        <label>Username</label>
                        <br />
                        <input
                            type="text"
                            id="username"
                            placeholder="username"
                            onFocus={() => setUsernameOnFocus(true)}
                            onBlur={() => setUsernameOnBlur(true)}
                            onChange={handleUsernameOnChange}
                        />
                        <div>{usernameError && usernameError}</div>
                    </div>

                    <div>
                        <label>Email address</label>
                        <br />
                        <input
                            type="email"
                            id="email"
                            placeholder="name@example.com"
                            onChange={handleEmailOnChange}
                            onFocus={() => setEmailOnFocus(true)}
                            onBlur={() => setEmailOnBlur(true)}
                        />
                        <div>{emailError && emailError}</div>
                    </div>

                    <div>
                        <label>Password</label>
                        <br />
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            onChange={handlePasswordOnChange}
                            onFocus={() => setPasswordOnFocus(true)}
                            onBlur={() => setPasswordOnBlur(true)}
                        />
                        <div>{passwordError && passwordError}</div>
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
