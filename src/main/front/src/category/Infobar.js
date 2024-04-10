import "./Infobar.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import React, {useEffect, useState} from "react";

const Infobar = (props) => {
    const navigate = useNavigate();
    const [name, setName] = useState("Input Name Here");
    const [status, setStatus] = useState("");

    const sendPageStatus = (pageName, content, time) => {
        props.getPageStatus(pageName, content, time);
    }

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const logout = () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            alert("로그아웃 완료");
            localStorage.removeItem("userInfo");
            localStorage.removeItem("Email");
            navigate("/");
        }
    }

    const checkDelete = () => {
        if (window.confirm("정말 계정을 삭제하시겠습니까?")) {
            let email = localStorage.getItem("Email");
            axios.post('http://localhost:8080/user/delete', {
                email: email
            })
                .then((res) => {
                    if (res.data === "Delete success") {
                        alert("계정을 삭제했습니다")
                        localStorage.removeItem("userInfo");
                        localStorage.removeItem("Email");
                        navigate("/");
                    }
                    if (res.data === "Delete failed") {
                        alert("오류가 발생하였습니다!");
                    }
                });
        }
    }

    const categoryDelete = (e) => {
        if (window.confirm("카테고리를 삭제하시겠습니까?")) {
            let time = props.category.at(props.mNum).create_date;
            axios.post("http://localhost:8080/category/delete", {
                create_date: time
            });
        }
        else e.preventDefault();
    }

    const addCategory = () => {
        let email = localStorage.getItem("Email");
        axios.post('http://localhost:8080/category/add', {
            categoryName: name,
            email: email
        })
    }

    const addPage = () => {
        let time = props.category.at(props.mNum).create_date;
        axios.post("http://localhost:8080/page/add", {
            createDate: time,
            pageName: name
        }).then((res) => {
            console.log(res.data);
        })
    }

    const deletePage = (time) => {
        if(window.confirm("해당 페이지를 삭제하시겠습니까?")){
            axios.post("http://localhost:8080/page/delete", {
                createDate: time
            }).then(() => {
                alert("페이지가 삭제되었습니다");
                window.location.reload();
            });
        }
    }


    const nameEvent = (e) => {
        setName(e.target.value);
    }

    const generatePageButtons = () => {
        const buttons = [];
        for (let i = 0; i < props.page.length; i++) {
            buttons.push(
                <li key={i}>
                    <div className="pageButtonDiv">
                        <button className="pageButton" onClick={() => {
                            pageButtonClick(props.page.at(i).pageName, props.page.at(i).pageContent, props.page.at(i).createDate)
                        }}>{props.page.at(i).pageName}</button>
                        <button className="pageDeleteButton" onClick={() => {deletePage(props.page.at(i).createDate)}}>X</button>
                    </div>
                </li>
            );
        }

        return buttons;
    };

    const pageButtonClick = (pageName, content, time) => {
        sendPageStatus(pageName, content, time);
    }

    return (
        <>
            {props.status === "profile" ? (
                <div className="infobar">
                    <div className="infoName">
                        <label>Profile</label>
                    </div>
                    <div className="name">
                        <label>Name</label>
                        <label className="propName">{props.userInfo.name}</label>
                    </div>
                    <div className="email">
                        <label>Email</label>
                        <label className="emailCont">{props.userInfo.email}</label>
                    </div>
                    <div className="profileButtons">
                        <div className="profileRight">
                            <button className="logoutButton" onClick={logout}>Logout</button>
                        </div>
                        <div className="profileLeft">
                            <button className="delete" onClick={checkDelete}>Delete Account</button>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
            {props.status === "category" + props.mNum ? (
                <div className="infobar">
                    <div className="infoName">
                        <label>{props.category.at(props.mNum).categoryName}</label>
                        <form onSubmit={categoryDelete}>
                            <button className="categoryDeleteButton" type="submit">X</button>
                        </form>
                    </div>
                    <div className="pageDiv">
                        <ul>
                            {generatePageButtons()}
                        </ul>
                        <div className="addPageButton">
                            <button className="addPage" onClick={() => setStatus("addPage")}>+</button>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
            {props.status === "addCategory" ? (
                <form onSubmit={addCategory}>
                    <div className="infobar">
                        <div className="addCategoryName">
                            <input type="text" value={name} onChange={nameEvent}/>
                        </div>
                        <div className="applyButton">
                            <button type="submit">Apply</button>
                        </div>
                    </div>
                </form>
            ) : (
                <></>
            )}
            {status === "addPage" ? (
                <form onSubmit={addPage}>
                    <div className="infobar">
                        <div className="addCategoryName">
                            <input type="text" value={name} onChange={nameEvent}/>
                        </div>
                        <div className="applyButton">
                            <button type="submit">Apply</button>
                        </div>
                    </div>
                </form>
            ) : (
                <></>
            )}
        </>
    );
}

export default Infobar;