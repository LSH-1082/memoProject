import React, {useEffect, useState} from 'react';
import axios from "axios";
import "./Sidebar.css"
import Sidebar from "./Sidebar";
import Infobar from "../category/Infobar";
import {useNavigate} from "react-router-dom";


const Main = (props) => {
    const [stat, setStat] = useState("");
    const navigate = useNavigate()
    const localValue = localStorage.getItem("Email");
    const [userInfo, setUserInfo] = useState([]);



    useEffect(() => {
        if (localValue === null) navigate("/");
        else{
            axios.post("http://localhost:8080/user/info", {
                email: localValue
            }).then(res => {
                localStorage.setItem("userInfo", JSON.stringify(res.data));
                setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
            })
        }

    }, []);

    const getStatus = (status) => {
        if(stat !== status) setStat(status);
        if(stat === status) setStat("");
    }

    //메인 페이지 들어왔을 떄 바로 GET요청 한 후
    return (
        <>
            <Sidebar status={stat} getStatus={getStatus}/>
            <Infobar userInfo={userInfo} status={stat}/>
        </>
    );
}
export default Main;