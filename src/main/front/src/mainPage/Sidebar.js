import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

const React = require("react");
const Sidebar = (props) => {
    let page = [];

    const navigate = useNavigate();

    useEffect(() => {
    }, [props.category]);


    const sendStatus = (status, num, page) => {
        props.getStatus(status, num, page);
    }


    const categoryButtonClick = (num) => {
        let time = props.category.at(num).create_date;
        const jwt = Cookies.get("JWT");
        axios.post("http://localhost:8080/page/info", {
            create_date: time
        }, {
            headers: {
                Authorization: jwt
            }
        }).then((res) => {
            page = res.data;
            sendStatus("category" + num, num, page);
        }).catch((e) =>{
            Cookies.remove("JWT");
            navigate("/");
        });
    }



    const generateCategoryButtons = () => {
        const buttons = [];
        for (let i = 0; i < props.category.length; i++) {
            buttons.push(
                <li key={i}>
                    <button className="categoryButton" data-tooltip={props.category.at(i).categoryName} onClick={() => {categoryButtonClick(i)}}>
                        <img src={require("../defaultImg/DefaultCategoryImg.png")} alt="Category"/>
                    </button>
                </li>
            );
        }
        return buttons;
    };

    return (
        <div className="sidebar">
            <nav>
                <div className="userImg">
                    <button className="profileButton" data-tooltip="Profile" onClick={() => sendStatus("profile")}>
                        <img src={require('../defaultImg/DefaultUserImg.png')} alt="대체 텍스트"/>
                    </button>
                </div>

                <div className="categoryItem">
                    <ul>
                        {generateCategoryButtons()}
                    </ul>
                </div>
            </nav>
            <div className="categoryAdd">
                <button className="categoryAddButton" onClick={() => sendStatus("addCategory")}>+</button>
            </div>
        </div>
    );
}

export default Sidebar;