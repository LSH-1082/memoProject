import React, {useEffect, useState} from 'react';
import axios from "axios";
import "./Sidebar.css"
import Sidebar from "./Sidebar";
import Infobar from "../category/Infobar";
import WriteArea from "../writeArea/WriteArea";

import {useNavigate} from "react-router-dom";


const Main = (props) => {
    const [stat, setStat] = useState("");
    const navigate = useNavigate()
    const localValue = localStorage.getItem("Email");
    const [userInfo, setUserInfo] = useState([]);
    const [category, setCategory] = useState([]);
    const [mNum, setMNum] = useState(0);
    const [page, setPage] = useState([]);

    const [pageStatus, setPageStatus] = useState("");
    const [pageContent, setPageContent] = useState("");
    const [pageName, setPageName] = useState("");


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

    const getStatus = (status, num, page) => {
        if (stat !== status) setStat(status);
        if (stat === status) setStat("");
        setMNum(num);
        setPage(page);
        setPageStatus("");
    }

    const getPageStatus = (pageName, pageContent, pageStatus) => {
        setPageStatus(pageStatus);
        setPageContent(pageContent);
        setPageName(pageName);
    }

    return (
        <>
            <Sidebar category={category} status={stat} getStatus={getStatus}/>
            <Infobar page={page} mNum={mNum} category={category} userInfo={userInfo} status={stat} getPageStatus={getPageStatus}/>
            <WriteArea pageName={pageName} pageStatus={pageStatus} pageContent={pageContent}/>
        </>
    );
}
export default Main;