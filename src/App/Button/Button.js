import React from "react";
import "./Button.scss"

export default function Button(props){

    return(
        <div id="btn" className="Button-container" onClick={props.onClick}>
            <div className="Button-subcontainer">
                {props.icon}
                <p className="Button-text">{props.text}</p>
            </div>
        </div>
    )
}