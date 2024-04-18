import "./Main.css";
import Header from "../Header/Header";
import CategoryList from "../category/CategoryList";
import {useState} from "react";
import Profile from "../profile/Profile";
import PageList from "../pageList/PageList";
import WritePage from "../writePage/WritePage";
import AddCategory from "../category/AddCategory";
import WriteCategory from "../category/WriteCategory";
import AllPage from "../pageList/AllPage";


const Main = () => {
    const [status, setStatus] = useState("category");
    const [category, setCategory] = useState("");
    const [page, setPage] = useState([]);

    const getStatus = (data) => {
        if(data === status) setStatus("category");
        else setStatus(data);
    }

    const getCategory = (data) => {
        setCategory(data);
    }

    const getPage = (data) => {
        setPage(data);
    }


    return (
        <div className="mainDisplay">
            <Header getStatus={getStatus}/>
            {status === "profile" ? (
                <Profile/>
            ):(
                <></>
            )}
            {status === "category" ? (
                <CategoryList getStatus={getStatus} getCategory={getCategory} page={page}/>
            ): (
                <></>
            )}
            {status === "addCategory" ? (
                <AddCategory getStatus={getStatus}/>
            ): (
                <></>
            )}
            {status === "writeCategory" ? (
                <WriteCategory category={category} getStatus={getStatus}/>
            ): (
                <></>
            )}
            {status === "page" ? (
                <PageList category={category} getStatus={getStatus} getPage={getPage}/>
            ): (
                <></>
            )}
            {status === "allPage" ? (
                <AllPage getStatus={getStatus} getPage={getPage}/>
            ): (
                <></>
            )}
            {status === "write" ? (
                <WritePage page={page}/>
            ): (
                <></>
            )}

        </div>
    );
}

export default Main;