import React, {useState} from 'react';
import axios from "axios";

import icon from '../logo/forest_icon.png'
import './Register.css'

const Register = () => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [check, setCheck] = useState("");

    const registerSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post('http://localhost:8080/api/register', {
                email: email,
                name: name,
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
                <label>Create an account</label>
            </div>

            <form className="register-form" onSubmit={registerSubmit}>

                <label className="register-label" htmlFor="name">Name</label>

                <div className="register-input">
                    <input type="text" id="name" name="name" onChange={(e) => setName(e.target.value)}/>
                </div>

                <label className="register-label" htmlFor="Email">Email</label>

                <div className="register-input">
                    <input type="text" id="email" name="email" onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <label className="register-label" htmlFor="password">Password</label>

                <div className="register-input">
                    <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <label className="register-label" htmlFor="passwordCheck">Password Check</label>

                <div className="register-input">
                    <input type="password" id="passwordCheck" name="passwordCheck" onChange={(e) => setCheck(e.target.value)}/>
                </div>

                <button type="submit">Register</button>
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