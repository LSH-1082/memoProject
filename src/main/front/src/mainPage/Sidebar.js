import {useState} from "react";

const {Link} = require("react-router-dom");
const Login = require("../loginPage/Login");
const React = require("react");
const Sidebar = (props) => {
    const [page, setPage] = useState([]);

    const sendStatus = (status) => {
        props.getStatus(status);
    }

    return (
        <div className="sidebar">
            <nav>
                <div className="userImg">
                    <button className="profileButton" onClick={() => sendStatus("profile")}>
                        <img src={require('../defaultImg/DefaultUserImg.png')} alt="대체 텍스트"/>
                    </button>
                </div>

                <div className="categoryItem">
                    <ul>
                        <li>
                            <button className="categoryButton" onClick={() => sendStatus("category")}>
                                <img src={require("../defaultImg/DefaultCategoryImg.png")}/>
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="categoryAdd">
                <button className="categoryAddButton">
                    <img src={require("../defaultImg/DefaultCategorySelectImg.png")}/>
                </button>
            </div>
        </div>
    );
}

export default Sidebar;