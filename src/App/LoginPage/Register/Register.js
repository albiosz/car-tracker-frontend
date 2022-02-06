import React from 'react';
import Button from '../../Button/Button';
import Input from '../Input/Input';
import "./Register.scss";

export default function Login(props) {
    const onSubmit = (e) => {
        props.submit(e);
    }

    return(
        <div className="Register-container">
            <div className="RegisterLogo-container">
                <div className="RegisterLogo-image-container">
                    <img className="Logo-image-img" src="./Logo/logo.png" alt="Logo.png"></img>
                </div>
                <div className="RegisterLogo-text-container">
                    <p className="RegisterLogo-text-txt">Register</p>
                </div>
            </div>
            <div className="RegisterInput-container">
                <form className="RegisterInput-container">
                    <Input label={"Email address"} 
                        hint={"emailname@example.com"}
                        type={"text"}
                        value={props.login}
                        onChange={props.onChangeLogin}/>
                    <Input label={"Password"} 
                        hint={'\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022'}
                        type={"password"}
                        value={props.password}
                        onChange={props.onChangePassword}/>
                </form>
            </div>
            <div className="RegisterNext-container">
                <div className="RegisterNext-button">
                    <Button icon={null} text={"Register"} onClick={(e) => {if(props.submit !== null){onSubmit(e)}}}/>
                </div>
            </div>
        </div>
    )
}