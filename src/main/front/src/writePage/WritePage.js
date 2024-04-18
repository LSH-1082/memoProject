import {useEffect, useRef, useState} from "react";

import "./WritePage.css";
import {Editor} from "@toast-ui/react-editor";
import '@toast-ui/editor/dist/toastui-editor.css';
import codeSyntaxHighlight
    from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import axios from "axios";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

const WritePage = (props) => {

    const [pageName, setPageName] = useState("");
    const [pageContent, setPageContent] = useState("");
    const editorRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        setPageName(props.page.pageName);
        setPageContent(props.page.pageContent);
    }, [props.page.pageName, props.page.pageContent]);

    const changeName = (e) => {
        setPageName(e.target.value);
    }

    const saveContent = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/page/save", {
            createDate: props.page.createDate,
            pageContent: editorRef.current.getInstance().getMarkdown(),
            pageName: pageName
        }, {
            headers: {
                Authorization: Cookies.get("JWT")
            }
        }).then(res => {
            alert("저장되었습니다");
        }).catch(() => {
            alert("토큰이 만료되었습니다. 다시 로그인 해주세요!");
            Cookies.remove("JWT");
            navigate("/", {replace: true});
        });
    }

    return (
        <div className="wirteArea">
            <div className="write">
                <div className="wArea">
                    <input value={pageName} onChange={changeName}/>
                    <button onClick={saveContent}>Save</button>
                </div>
            </div>
            <hr className="wHr"/>
            <div className="editor">
                <div className="innerEditor">
                    <Editor
                        key={pageContent}
                        height="100%"
                        initialEditType="wysiwyg"
                        initialValue={pageContent}
                        hideModeSwitch={true}
                        ref={editorRef}
                        plugins={[codeSyntaxHighlight]}
                    />
                </div>
            </div>
        </div>
    );
}

export default WritePage;