import React from "react";
import "./Input.scss";

export default function Input(props){
    const onChange = (e) => {
        props.onChange(e.target.value);
    }

    return(
        <div className="Input-container">
            <div className="Input-label-container">
                <p className="Input-label-p">{props.label}</p>
            </div>
            <div className="Input-input-container">
                <input className="Input-input-in"
                    type={props.type}
                    placeholder={props.hint}
                    value={props.value}
                    onChange={onChange}>   
                </input>
            </div>
            {/* <Link /> */}
        </div>
    )
}