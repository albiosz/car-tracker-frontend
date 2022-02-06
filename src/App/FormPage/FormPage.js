import React, { useState } from "react";
import Input from "../LoginPage/Input/Input";
import InputSelect from "../LoginPage/InputSelect/InputSelect";
import Button from "../Button/Button";
import "./FormPage.scss";
import store from "../../store/store";
import { useNavigate, useLocation } from "react-router";
import { ReactSession } from "react-client-session";

import { ReactComponent as Back } from "../../Assets/Icons/arrow_circle_left_white_24dp.svg";
import { ReactComponent as Add } from "../../Assets/Icons/add_white_24dp.svg";

export default function FormPage(props){
    const carTypes = store.getState().cars;
    const state = useLocation();
    const navigate = useNavigate();

    const [type, setType] = useState("");
    const [vin, setVin] = useState("");
    const [plates, setPlates] = useState("");
    const [model, setModel] = useState("");
    const [driver, setDriver] = useState("");

    const handleSubmit = async () => {
        const mode = state.state.type === "add" ? 'POST': 'PUT';
        try {
            const response = await fetch('Here will be right link', {
                method: mode,
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'jwt': ReactSession.get("token")
                },
                body: JSON.stringify({
                    'type': type,
                    'VIN': vin,
                    'plates': plates,
                    'model': model,
                    'driver': driver
                })
            });
            if (response.ok) {
                navigate("/map");
            }
            else {
                alert("Something goes wrong! Try again");
            }
        } catch(e) {
            alert("Something goes wrong! Try again");
        }
    }

    const text = state.state.type === "add"? "Add": "Modify";

    return(
        <div className="FormPage-site">
            <div className="FormPage-container">
                <div className="FormPageLogo-container">
                    <div className="FormPageLogo-image-container">
                        <img className="FormPageLogo-image-img" src="./Logo/logo.png" alt="Logo.png"></img>
                    </div>
                    <div className="FormPageLogo-text-container">
                        <p className="FormPageLogo-text-txt">{state.state.type === "add"? "Add new vehicle": "Modify vehicle"}</p>
                    </div>
                </div>
                <div className="FormPageInput-container">
                    <form className="FormPageInput-container">
                        <InputSelect label={"Vehicle type"} 
                            cars={carTypes}
                            value={type}
                            onChange={(value) => {setType(value)}}/>
                        <Input label={"VIN"} 
                            hint={'1HGBH41JXMN109186'}
                            type={"text"}
                            value={vin}
                            onChange={(value) => {setVin(value)}}/>
                        <Input label={"Register plates"} 
                            hint={'WAW 0190'}
                            type={"text"}
                            value={plates}
                            onChange={(value) => {setPlates(value)}}/>
                        <Input label={"Model"} 
                            hint={'Mercedes-Benz W126 SEC560'}
                            type={"text"}
                            value={model}
                            onChange={(value) => {setModel(value)}}/>
                        <Input label={"Driver"} 
                            hint={'John Smith'}
                            type={"text"}
                            value={driver}
                            onChange={(value) => {setDriver(value)}}/>
                    </form>
                </div>
                <div className="FormPageNext-container">
                    <div className="FormPageNext-addButton">
                        <Button text={"Back to map"} icon={<Back />} onClick={() => {navigate("/map")}} />
                    </div>
                    <div className="FormPageNext-addButton">
                        <Button icon={<Add />} text={text} onClick={handleSubmit}/>
                    </div>
                </div>
            </div>
        </div>
    )
}