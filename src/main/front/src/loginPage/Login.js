import React, {useEffect, useState} from 'react';

import './Login.css';
import icon from '../logo/forest_icon.png'
import {redirect, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if(Cookies.get("JWT") != null) navigate("/main");
    }, [])

    const loginSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:8080/login?username=${email}&password=${password}`)
            .then((res) => {
                Cookies.set('JWT', res.headers.get("Authorization"), { expires: 7})
                navigate("/main");
            })
            .catch((e) =>{
                alert("이메일 혹은 비밀번호가 올바르지않습니다!");
            })
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
                    <input type="text" id="email" onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className="password-group">
                    <label className="password-label" htmlFor="password">Password</label>
                    <a className="password-a" href="/forgot">Forgot password?</a>
                </div>

                <div className="password-input">
                    <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <button className="submitButton" type="submit">Login</button>

                <div className="register">
                    <label htmlFor="register">Don't have an account?</label>
                    <a href="/register">Create an account</a>
                </div>
            </form>
        </div>
    );
};

export default Login;