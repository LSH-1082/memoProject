import {useState} from "react";
import "./ProfileModal.css"

const ProfileModal = (props) => {
    function closeModal(){
        props.closeModal();
    }

    return (
        <div className="mainProfileModal">

        </div>
    );
}

export default ProfileModal;