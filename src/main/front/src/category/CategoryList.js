import "./CategoryList.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

const CategoryList = (props) => {
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/category/info", {
            headers: {
                Authorization: Cookies.get("JWT")
            }
        }).then(res => {
            setCategory(res.data);
        }).catch(() => {
            alert("토큰이 만료되었습니다. 다시 로그인 해주세요!");
            Cookies.remove("JWT");
            navigate("/", {replace: true});
        });
    }, [navigate]);

    const categoryClick = (num) => {
        let date = category[num].create_date;
        props.getStatus("page");
        props.getCategory(date);
    }

    const addCategory = () => {
        props.getStatus("addCategory");
    }

    const deleteCategory = (date) => {
        if (window.confirm("카테고리를 삭제하시겠습니까?")) {
            axios.post("http://localhost:8080/category/delete", {
                create_date: date
            }, {
                headers: {
                    Authorization: Cookies.get("JWT")
                }
            }).then(() => {
                axios.get("http://localhost:8080/category/info", {
                    headers: {
                        Authorization: Cookies.get("JWT")
                    }
                }).then(res => {
                    setCategory(res.data);
                }).catch(() => {
                    alert("토큰이 만료되었습니다. 다시 로그인 해주세요!");
                    Cookies.remove("JWT");
                    navigate("/", {replace: true});
                });
            }).catch(() => {
                alert("토큰이 만료되었습니다. 다시 로그인 해주세요!");
                Cookies.remove("JWT");
                navigate("/", {replace: true});
            });
        }
    }

    const writeCategory = (date) => {
        props.getCategory(date);
        props.getStatus("writeCategory");
    }

    const generateCategory = () => {
        return category.map((item, index) => (
            <div className="category" key={index}
                 onClick={() => categoryClick(index)}> {/* categoryClick 함수를 익명 함수로 래핑하여 호출 */}
                <div className="innerCategory">
                    <div className="categoryNameDiv">
                        <p className="categoryName">{item.categoryName}</p>
                        <div className="nameButtons">
                            <FontAwesomeIcon className="categoryWriteButton" icon={faPenToSquare}
                                             onClick={(e) => {e.stopPropagation(); writeCategory(item.create_date)}}/>
                            <FontAwesomeIcon className="categoryDeleteButton" icon={faXmark}
                                             onClick={(e) => {e.stopPropagation(); deleteCategory(item.create_date)}}/>
                        </div>
                    </div>
                    <div className="description">
                        <p>{item.description}</p>
                    </div>
                </div>
            </div>
        ));
    }

    return (
        <div className="categoryDisplay">
            <div className="list">
                {generateCategory()}
                <div className="addCategory" onClick={() => {
                    addCategory()
                }}>
                    <FontAwesomeIcon icon={faPlus} size="2x"/>
                </div>
            </div>
        </div>
    );
}

export default CategoryList;