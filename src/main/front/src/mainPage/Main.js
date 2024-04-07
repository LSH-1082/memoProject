import React, {useEffect, useState} from 'react';
import axios from "axios";
import "./Sidebar.css"
import Sidebar from "./Sidebar";
import Infobar from "../category/Infobar";


const Main = (props) => {
    const [status, setStatus] = useState("");

    const getStatus = (status) => {
        setStatus(status);
        console.log(status);
    }

    //메인 페이지 들어왔을 떄 바로 GET요청 한 후
    useEffect(() => {
        axios.get("http://localhost:8080/api/main")
            .then((res) => {
                console.log(res.data);
                console.log(props.data);
            })
    }, []);



    return (
        <>
            <Sidebar value={status} getStatus={getStatus}/>
            <Infobar status={status}/>
        </>
    );
}
export default Main;