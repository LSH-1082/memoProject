import React, {useEffect, useState} from 'react';
import axios from "axios";
import "./Sidebar.css"
import Sidebar from "./Sidebar";
import Infobar from "../category/Infobar";
import WriteArea from "../writeArea/WriteArea";

import {redirect, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";


const Main = (props) => {
    const [stat, setStat] = useState("");
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState([]);
    const [category, setCategory] = useState([]);
    const [mNum, setMNum] = useState(0);
    const [page, setPage] = useState([]);

    const [pageStatus, setPageStatus] = useState("");
    const [pageContent, setPageContent] = useState("");
    const [pageName, setPageName] = useState("");


    useEffect(() => {
        axios.get("http://localhost:8080/user/info", {
            headers: {
                Authorization: Cookies.get("JWT")
            }
        }).then(res => {
            setUserInfo(res.data);
        }).catch(e => {
            alert("토큰이 만료되었습니다! 다시로그인 해주세요!");
            Cookies.remove("JWT");
            navigate("/");
        });


        axios.get("http://localhost:8080/category/info", {
            headers: {
                Authorization: Cookies.get("JWT")
            }
        }).then(res => {
            if(res === null){
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
            <Infobar page={page} mNum={mNum} category={category} userInfo={userInfo} status={stat}
                     getPageStatus={getPageStatus}/>
            <WriteArea pageName={pageName} pageStatus={pageStatus} pageContent={pageContent}/>
        </>
    );
}
export default Main;