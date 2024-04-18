import "./PageList.css"
import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

const PageList = (props) => {

    const [page, setPage] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.post("http://localhost:8080/page/info", {
            create_date: props.category
        }, {
            headers: {
                Authorization: Cookies.get("JWT")
            }
        }).then(res => {
            setPage(res.data);
        }).catch(()=> {
           alert("토큰이 만료되었습니다. 다시 로그인 해주세요!");
           Cookies.remove("JWT");
           navigate("/", {replace: true});
        });
    }, []);

    const pageClick = (num) => {
        props.getPage(page[num]);
        props.getStatus("write");
    }

    const deletePage = (num) => {
        if (window.confirm("페이지를 삭제하시겠습니까?")) {
            axios.post("http://localhost:8080/page/delete", {
                createDate: page[num].createDate
            }, {
                headers: {
                    Authorization: Cookies.get("JWT")
                }
            }).then(() => {
                alert("페이지 삭제 완료");
                axios.post("http://localhost:8080/page/info", {
                    create_date: props.category
                }, {
                    headers: {
                        Authorization: Cookies.get("JWT")
                    }
                }).then(res => {
                    setPage(res.data);
                });
            }).catch(() => {
                alert("토큰이 만료되었습니다. 다시 로그인 해주세요!");
                Cookies.remove("jwt");
                navigate("/", {replace: true});
            });
        }
    }

    const addPage = () => {
        axios.post("http://localhost:8080/page/add", {
            pageName: "Page",
            create_date: props.category
        }, {
            headers: {
                Authorization: Cookies.get("JWT")
            }
        }).then(() => {
            axios.post("http://localhost:8080/page/info", {
                create_date: props.category
            }, {
                headers: {
                    Authorization: Cookies.get("JWT")
                }
            }).then(res => {
                setPage(res.data);
            }).catch(() => {
                alert("토큰이 만료되었습니다. 다시 로그인 해주세요!");
                Cookies.remove("jwt");
                navigate("/", {replace: true});
            });
        }).catch(() => {
            alert("토큰이 만료되었습니다. 다시 로그인 해주세요!");
            Cookies.remove("jwt");
            navigate("/", {replace: true});
        });
    }

    const generatePage = () => {
        return page.map((item, index) => (
            <div className="pList" key={index} onClick={() => pageClick(index)}>
                <div className="pageList">
                    <div className="pageName">
                        <p>{page[index].pageName}</p>
                    </div>
                    <div className="pageButtons">
                        <button className="pageDelete" onClick={(e) => {e.stopPropagation(); deletePage(index);}}>X</button>
                    </div>
                </div>
            </div>
        ));
    }


    return (
        <div className="pageDisplay">
            {generatePage()}
            <div className="addPage" onClick={addPage}>
                <FontAwesomeIcon icon={faPlus} size="2x"/>
            </div>
        </div>
    );
}

export default PageList;