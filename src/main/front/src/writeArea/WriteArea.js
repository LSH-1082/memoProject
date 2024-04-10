import "./WriteArea.css";
import {useEffect, useState} from "react";
import axios from "axios";

const WriteArea = (props) => {
    const [content, setContent] = useState("");
    const [pageName, setPageName] = useState("");

    useEffect(() => {
        setContent(props.pageContent);
        setPageName(props.pageName);
    }, [props.pageContent, props.pageName])

    const changeContent = (e) => {
        setContent(e.target.value);
    }

    const changePageName = (e) => {
        setPageName(e.target.value);
    }

    const saveContent = () => {
        axios.post("http://localhost:8080/page/save", {
            pageContent: content,
            createDate: props.pageStatus,
            pageName: pageName
        }).then(() => {
            alert("변경사항이 저장되었습니다");
            window.location.reload();
        })
    }

    return (
        <>
            {props.pageStatus !== "" ? (
                <div className="writeArea">
                    <div className="pageHeader">
                        <input type="text" value={pageName} onChange={changePageName}></input>
                        <div className="buttons">
                            <button onClick={saveContent}>Apply</button>
                            <button>X</button>
                        </div>
                    </div>
                    <textarea value={content} onChange={changeContent}></textarea>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}


export default WriteArea;