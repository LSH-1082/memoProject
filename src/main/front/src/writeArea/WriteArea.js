import "./WriteArea.css";
import {useEffect, useRef, useState} from "react";
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";
import axios from "axios";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

const WriteArea = (props) => {
    const [content, setContent] = useState("");
    const [pageName, setPageName] = useState("");
    const navigate = useNavigate();
    const editorRef = useRef();

    useEffect(() => {
        setContent(props.pageContent);
        setPageName(props.pageName);
    }, [props.pageContent, props.pageName])



    const handleClick = () => {
        console.log(editorRef.current.getInstance().getMarkdown());
    }


    const changePageName = (e) => {
        setPageName(e.target.value);
    }

    const saveContent = () => {
        if(window.confirm("내용을 저장하시겠습니까?")){
            axios.post("http://localhost:8080/page/save", {
                pageContent: editorRef.current.getInstance().getMarkdown(),
                createDate: props.pageStatus,
                pageName: pageName
            }, {
                headers: {
                    Authorization: Cookies.get("JWT")
                }
            }).then(() => {
                alert("변경사항이 저장되었습니다");
                window.location.reload();
            }).catch((e) => {
                Cookies.remove("JWT");
                navigate("/");
            })
        }
    }


    return (
        <>
            <script src="https://uicdn.toast.com/editor/latest/toastui-editor-viewer.js"></script>
            {props.pageStatus !== "" ? (
                <div className="writeArea">
                    <div className="pageHeader">
                        <input className="pageName" type="text" value={pageName} onChange={changePageName}></input>
                        <div className="buttons">
                            <button className="savePageButton" onClick={saveContent}>Save</button>
                        </div>
                    </div>
                    <div className="editor">
                        <Editor
                            key={content}
                            height="93.5vh"
                            initialEditType="wysiwyg"
                            initialValue={content}
                            hideModeSwitch={true}
                            ref={editorRef}
                            plugins={[codeSyntaxHighlight]}
                        />
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}


export default WriteArea;