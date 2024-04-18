import {useEffect, useState} from "react";

import "./AddCategory.css";
import axios from "axios";
import Cookies from "js-cookie";

const WriteCategory = (props) => {
    const [categoryName, setCategoryName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");

    useEffect(() => {
        axios.post("http://localhost:8080/category/one/info", {
            create_date: props.category
        }, {
            headers: {
                Authorization: Cookies.get("JWT")
            }
        }).then(res => {
            setCategoryName(res.data.categoryName);
            setCategoryDescription(res.data.description);
        });
    }, [props.category]);

    const changeCategoryName = (e) => {
        setCategoryName(e.target.value);
    }

    const changeCategoryDescription = (e) => {
        setCategoryDescription(e.target.value);
    }

    const saveContent = () => {
        axios.post("http://localhost:8080/category/modify", {
            categoryName: categoryName,
            description: categoryDescription,
            create_date: props.category
        },{
            headers: {
                Authorization: Cookies.get("JWT")
            }
        }).then((res) => {
            if(res.data === true) props.getStatus("category");
            else {
                alert("오류발생!");
                props.getStatus("category");
            }
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

export default WriteCategory;