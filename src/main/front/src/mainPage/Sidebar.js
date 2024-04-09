import {useState} from "react";

const React = require("react");
const Sidebar = (props) => {
    const [page, setPage] = useState([]);
    const [category, setCategory] = useState([])

    const sendStatus = (status, num) => {
        props.getStatus(status, num);
    }


    const categoryButtonClick = (num) => {
        sendStatus("category" + num, num);
    }



    const generateCategoryButtons = () => {
        const buttons = [];
        for (let i = 0; i < props.category.length; i++) {
            buttons.push(
                <li key={i}>
                    <button className="categoryButton" onClick={() => {categoryButtonClick(i)}}>
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
                    <button className="profileButton" onClick={() => sendStatus("profile")}>
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
                <button className="categoryAddButton" onClick={() => sendStatus("addCategory")}>
                    <img src={require("../defaultImg/DefaultCategorySelectImg.png")}/>
                </button>
            </div>
        </div>
    );
}

export default Sidebar;