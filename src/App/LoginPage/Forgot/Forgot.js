import React from 'react';
import Button from '../../Button/Button';
import Input from '../Input/Input';
import "./Forgot.scss";

export default function Forgot(props) {
    const onSubmit = (e) => {
        props.submit(e);
    }

    return(
        <div className="Forgot-container">
            <div className="ForgotLogo-container">
                <div className="ForgotLogo-image-container">
                    <img className="ForgotLogo-image-img" src="./Logo/logo.png" alt="Logo.png"></img>
                </div>
                <div className="ForgotLogo-text-container">
                    <p className="ForgotLogo-text-txt">Podaj adres email</p>
                </div>
            </div>
            <div className="ForgotInput-container">
                <form className="ForgotInput-container">
                    <Input label={"Adres email"} 
                        hint={"emailname@example.com"}
                        type={"text"}
                        value={props.login}
                        onChange={props.onChangeLogin}/>
                </form>
            </div>
            <div className="ForgotNext-container">
                <div className="ForgotNext-button">
                    <Button icon={null} text={"Dalej"} onClick={(e) => {if(props.submit !== null){onSubmit(e)}}}/>
                </div>
            </div>
        </div>
    )
}