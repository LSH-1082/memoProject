import React, {useState} from 'react';
import {useEffect} from "react";
import axios from "axios";

import './Login.css';
import icon from '../logo/forest_icon.png'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post('http://localhost:8080/api/login', {
                email: email,
                password: password
            });
            console.log(res.data);
        }
        catch(err){
            console.error(err);
        }
    };

    return (
        <div className="Body">
            <div className="image">
                <img src={icon} alt="main_icon"/>
            </div>

            <div className="title">
                <label>Sign in to your account</label>
            </div>

            <form className="login-form" onSubmit={loginSubmit}>

                <label className="email-label" htmlFor="email">Email</label>

                <div className="email-input">
                    <input type="text" id="email" onChange={(e) =>  setEmail(e.target.value)}/>
                </div>

                <div className="password-group">
                    <label className="password-label" htmlFor="password">Password</label>
                    <a className="password-a" href="/forgot">Forgot password?</a>
                </div>

                <div className="password-input">
                    <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <button type="submit">Login</button>

                <div className="register">
                    <label htmlFor="register">Don't have an account?</label>
                    <a href="/register">Create an account</a>
                </div>
            </form>
        </div>
    );
};

export default Login;