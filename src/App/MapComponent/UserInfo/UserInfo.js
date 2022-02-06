import React, { useState } from "react";
import Button from "../../Button/Button";
import "./UserInfo.scss";
import { ReactSession } from "react-client-session";

export default function UserInfo(props){
    const [clicked, setClicked] = useState(false);
    var user = ReactSession.get("login");

    const logOut = () => {
        ReactSession.remove("token");
        ReactSession.remove("login");
        window.location.reload();
    }

    const Description = () => (
        <div className="UserInfo-description-container">
            <div className="UserInfo-description-subcontainer">
                <div className="UserInfo-description-image">
                    <img className="UserInfo-description-img" src="./Profile/profile.png" alt="profile.png"></img>
                </div>
                <div className="UserInfo-description-user">
                    <p className="UserInfo-description-p">{user}</p>
                </div>
            </div>
            <div className="UserInfo-description-buttons">
                <Button icon={null} text={"Sign out"} onClick={logOut}/>
            </div>
        </div>
    )

    return(
        <div className="UserInfo-container">
            <div className="UserInfo-image">
                <img className="UserInfo-img" src="./Profile/profile.png" alt="profile.png" onClick={() => setClicked(!clicked)}></img>
            </div>
            {clicked ? <Description /> : null }
        </div>
    )
}