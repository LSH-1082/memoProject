import React, {useEffect, useState} from 'react';
import axios from "axios";


const Main = () => {

    //메인 페이지 들어왔을 떄 바로 GET요청 한 후 
    useEffect(() => {
        axios.get("http://localhost:8080/api/main")
            .then((res) =>{
                console.log(res.data);
            })
    }, []);
}

export default Main;