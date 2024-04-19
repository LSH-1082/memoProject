import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFaceSadTear} from "@fortawesome/free-regular-svg-icons";
import "./NotFound.css";

const NotFound = () => {
    return (
        <div className="notMain">
            <div className="notDiv">
                <FontAwesomeIcon className="sadIcon" icon={faFaceSadTear} size="7x"/>
                <div className="string">
                    <p className="notTitle">Not Found 404!</p>
                    <p className="notContext">Check URL path!</p>
                </div>
            </div>
        </div>
    );


}

export default NotFound;