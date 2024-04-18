import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";

import "./Profile.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser} from "@fortawesome/free-regular-svg-icons";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/user/info", {
            headers: {
                Authorization: Cookies.get("JWT")
            }
        }).then(res => {
            setUser(res.data);
        });
    }, [user]);

    const deleteUser = (e) => {
        if(window.confirm("정말 계정을 삭제하시겠습니까?")){
            axios.get("http://localhost:8080/user/delete", {
                headers: {
                    Authorization: Cookies.get("JWT")
                }
            }).then(res => {
                alert("계정을 삭제하였습니다!");
                Cookies.remove("JWT");
                navigate("/", {replace: true});
            }).catch(() => {
                alert("계정삭제오류!!");
                Cookies.remove("JWT");
                navigate("/", {replace: true});
            });
        }
    }

    const logout = () => {
        if(window.confirm("로그아웃 하시겠습니까?")){
            Cookies.remove("JWT");
            navigate("/", {replace: true});
        }
    }

    return (
        <div className="profile">
            <div className="prof">
                <div className="iconDiv">
                    <FontAwesomeIcon className="icon" icon={faCircleUser} size="7x"/>
                </div>
                <div className="profileItem">
                    <p className="profileTitle">Name</p>
                    <p className="profileContent">{user.name}</p>
                    <p className="profileTitle">Email</p>
                    <p className="profileContent">{user.email}</p>
                </div>
            </div>
            <div className="profileButtons">
                <div className="pButtons">
                    <button className="pDelete" onClick={deleteUser}>Delete Account</button>
                    <button className="logout" onClick={logout}>Logout</button>
                </div>
            </div>
        </div>
    );
}

export default Profile;