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
    const [category, setCategory] = useState([]);
    const [mNum, setMNum] = useState(0);



    useEffect(() => {
        if (localValue === null) navigate("/");
        axios.post("http://localhost:8080/user/info", {
            email: localValue
        }).then(res => {
            if (res.data === "") {
                localStorage.removeItem("Email");
                localStorage.removeItem("userInfo");
            } else {
                localStorage.setItem("userInfo", JSON.stringify(res.data));
                setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
            }
        })

        axios.post("http://localhost:8080/category/info", {
            email: localStorage.getItem("Email")
        }).then(res => {
            if(res === null){
                localStorage.removeItem("Email");
                localStorage.removeItem("userInfo");
                navigate("/");
            }
            else {
                setCategory(res.data);
            }

        });
    }, []);

    const getStatus = (status, num) => {
        if (stat !== status) setStat(status);
        if (stat === status) setStat("");
        setMNum(num)
    }

    //메인 페이지 들어왔을 떄 바로 GET요청 한 후
    return (
        <>
            <Sidebar category={category} status={stat} getStatus={getStatus}/>
            <Infobar mNum={mNum} category={category} userInfo={userInfo} status={stat}/>
        </>
    );
}
export default Main;