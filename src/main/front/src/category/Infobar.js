import "./Infobar.css";

const Infobar = (props) => {

    return (
        <>
            {props.status === "profile" ? (
                <div className="infobar">
                    <div className="infoName">
                        <label>profile</label>
                    </div>
                    <div className="profilePhoto">
                        <img src={require("../defaultImg/DefaultUserImg.png")} alt="asdas"/>
                    </div>
                </div>
            ):(
                <></>
            )}
            {props.status === "category" ? (
                <div className="infobar">
                    <div className="infoName">
                        <label>category</label>
                    </div>
                </div>
            ):(
                <></>
            )}
        </>
    );
}

export default Infobar;