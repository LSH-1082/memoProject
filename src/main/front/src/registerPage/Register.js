import React, {useEffect, useState} from 'react';
import axios from "axios";

import icon from '../logo/forest_icon.png'
import './Register.css'
import {useNavigate} from "react-router-dom";



const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [isValidName, setIsValidName] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isValidCheck, setIsValidCheck] = useState(false);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if(isValidName && isValidEmail && isValidPassword && isValidCheck) setIsValid(true);
        else setIsValid(false);
    }, [isValidName, isValidEmail, isValidPassword, isValidCheck]);

    const registerSubmit = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/user/register", {
            email: email,
            name: name,
            password: password,
        })
            .then((res) => {
                if(res.data === "Email exists") alert("이미 동일한 이메일의 계정이 존재합니다.");
                if(res.data === "Register success") {
                    alert("계정생성 완료");
                    navigate("/");
                }
        })
    }

    const validateName = (data) => {
        setName(data);
        const nameRegex = /^(?=\S{2,}$).*/;
        setIsValidName(nameRegex.test(data));
    }
    const validateEmail = (data) => {
        setEmail(data);
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        setIsValidEmail(regex.test(data));
    };
    const validatePassword = (data) => {
        const passwordRegex = /^(?=\S{8,}$).*/;
        setPassword(data);
        setIsValidPassword(passwordRegex.test(data));
    }
    const validateCheck = (data) => {
        if(data === password) setIsValidCheck(true);
        else setIsValidCheck(false);
    }


    return (
        <div className="Body">
            <div className="image">
                <img src={icon} alt="main_icon"/>
            </div>

            <div className="title">
                <label>Create an account</label>
            </div>

            <form className="register-form" onSubmit={registerSubmit}>

                <div className="nameLabel">
                    <label className="register-label" htmlFor="name">Name</label>
                    <label className={isValidName ? "passTrue" : "nameFalse"}>{isValidName ? "" : "이름은 2자 이상이어야 합니다!"}</label>
                </div>

                <div className="register-input">
                    <input type="text" id="name" name="name" onChange={(e) => validateName(e.target.value)}/>
                </div>

                <div className="emailLabel">
                    <label className="register-label" htmlFor="Email">Email</label>
                    <label className={isValidEmail ? "passTrue" : "emailFalse"}>{isValidEmail ? "" : "이메일 형식에 맞지 않습니다!"}</label>
                </div>


                <div className="register-input">
                    <input type="text" id="email" name="email" onChange={(e) => validateEmail(e.target.value)}/>
                </div>

                <div className="pass">
                    <label className="register-label" htmlFor="password">Password</label>
                    <label className={isValidPassword ? "passTrue" : "passFalse"}>{isValidPassword ? "" : "비밀번호는 8자 이상이어야 합니다!"}</label>
                </div>

                <div className="register-input">
                    <input type="password" id="password" name="password" onChange={(e) => validatePassword(e.target.value)}/>
                </div>

                <div className="check">
                    <label className="register-label" htmlFor="passwordCheck">Password Check</label>
                    <label className={isValidCheck ? "passTrue" : "checkFalse"}>{isValidCheck ? "" : "비밀번호가 일치하지 않습니다!"}</label>
                </div>

                <div className="register-input">
                    <input type="password" id="passwordCheck" name="passwordCheck" onChange={(e) => validateCheck(e.target.value)}/>
                </div>

                <button className={isValid ? 'submitButton' : 'inactiveButton'} type="submit" disabled={!isValid}>Register</button>
            </form>
        </div>
    );
};

/*
a 태그를 쓰면 뒤로가기가 가능해서 로그인이랑 계정생성에서는
useRoute(?) 같은거 사용해서 뒤로가기 막아야할듯

폼 유효성 검사 해야함
*/


export default Register;