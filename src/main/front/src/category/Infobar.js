import "./Infobar.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

const Infobar = (props) => {
    const navigate = useNavigate();
    const [addCategoryName, setaddCategoryName] = useState("");
    const [category, setCategory] = useState([]);

    useEffect(() => {
        if(props.category.length > 0){
            setCategory(props.category);
            console.log(props.category);
        }
    }, [props.category]);

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

    const categoryDelete = () => {
        if(window.confirm("카테고리를 삭제하시겠습니까?")){
            let time = category.at(props.mNum).create_date;
            axios.post("http://localhost:8080/category/delete", {
                create_date: time
            });
        }
    }

    const addCategory = (e) => {
        let email = localStorage.getItem("Email");
        axios.post('http://localhost:8080/category/add', {
            categoryName: addCategoryName,
            email: email
        })
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
                            <button type="submit">X</button>
                        </form>
                    </div>
                    <div>
                    </div>
                </div>
            ) : (
                <></>
            )}
            {props.status === "addCategory" ? (
                <form onSubmit={addCategory}>
                    <div className="infobar">
                        <div className="addCategoryName">
                            <input type="text" onChange={(e) => setaddCategoryName(e.target.value)}/>
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