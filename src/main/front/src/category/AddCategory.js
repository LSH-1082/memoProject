import {useState} from "react";

import "./AddCategory.css";
import axios from "axios";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

const AddCategory = (props) => {
    const [categoryName, setCategoryName] = useState("Input Category Name");
    const [categoryDescription, setCategoryDescription] = useState("Description");
    const navigate = useNavigate();


    const changeCategoryName = (e) => {
        setCategoryName(e.target.value);
    }

    const changeCategoryDescription = (e) => {
        setCategoryDescription(e.target.value);
    }

    const saveContent = () => {
        axios.post("http://localhost:8080/category/add", {
            categoryName: categoryName,
            description: categoryDescription
        },{
            headers: {
                Authorization: Cookies.get("JWT")
            }
        }).then(() => {
            props.getStatus("category");
        }).catch(() => {
            alert("토큰이 만료되었습니다. 다시 로그인 해주세요!");
            Cookies.remove("jwt");
            navigate("/", {replace: true});
        });
    }

    return(
        <div className="addC">
            <div className="aCategory">
                <div className="categoryArea">
                    <input value={categoryName} onChange={changeCategoryName}/>
                </div>
            </div>
            <hr className="wHr"/>
            <div className="textArea">
                <div className="innerTextArea">
                    <textarea value={categoryDescription} onChange={changeCategoryDescription}></textarea>
                </div>
            </div>
            <div className="categorySaveButton">
                <button onClick={saveContent}>Save</button>
            </div>
        </div>
    );
}

export default AddCategory;