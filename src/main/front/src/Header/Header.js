import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./Header.css";
import {faCircleUser} from "@fortawesome/free-regular-svg-icons";
import {faGrip} from "@fortawesome/free-solid-svg-icons";
import {faGripLines} from "@fortawesome/free-solid-svg-icons";


const Header = (props) => {

    const profileClick = () => {
        props.getStatus("profile");
    }

    const goCategory = () => {
        props.getStatus("category");
    }

    const goPage = () => {
        props.getStatus("allPage");
    }

    return (
        <div className="head">
            <div className="header">
                <div className="headerItem">
                    <div>
                        <p className="memoTitle">Memo</p>
                    </div>
                    <div className="headerButtons">
                        <FontAwesomeIcon className="gridIcon" icon={faGrip} size="2x" data-tooltip="Category List" onClick={goCategory}/>
                        <FontAwesomeIcon className="lineIcon" icon={faGripLines} size="2x" data-tooltip="Page List" onClick={goPage}/>
                        <FontAwesomeIcon className="userIcon" icon={faCircleUser} size="2x" data-tooltip="Profile" onClick={profileClick}/>
                    </div>
                </div>
                <hr className="hr"/>
            </div>
        </div>
    );
}

export default Header;