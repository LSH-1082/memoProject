import "./Infobar.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

const Infobar = (props) => {
    const navigate = useNavigate();
    const [name, setName] = useState("");

    const logout = () => {
        alert("로그아웃 완료");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("Email");
        navigate("/");
    }

    const checkDelete = () => {
        if (window.confirm("정말 계정을 삭제하시겠습니까?")) {
            axios.post('http://localhost:8080/user/delete', {
                email: props.userInfo.email
            })
                .then((res) => {
                    if(res.data === "Delete success"){
                        alert("계정을 삭제했습니다")
                        localStorage.removeItem("userInfo");
                        localStorage.removeItem("Email");
                        navigate("/");
                    }
                    if(res.data === "Delete failed"){
                        alert("오류가 발생하였습니다!");
                    }
                });
        }

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
            {props.status === "category" ? (
                <div className="infobar">
                    <div className="infoName">
                        <label>category</label>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}

export default Infobar;