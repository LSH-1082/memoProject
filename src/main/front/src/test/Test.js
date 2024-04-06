import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";

const Test = () => {

    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/test')
            .then((res) => {
                console.log("test" + res.data)
                setMessage(res.data);
            });
    }, []);

    return (
        <div className="Test">
            백엔드 데이터 : {message}
        </div>
    );
};

export default Test;