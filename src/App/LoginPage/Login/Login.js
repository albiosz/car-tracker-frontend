import React, {useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Button from '../../Button/Button';
import Input from '../Input/Input';
import "./Login.scss";

export default function Login(props) {

    const navigate = useNavigate();

    const onSubmit = (e) => {
        props.submit(e);
        
        navigate("/map");
    }

    useEffect(() => {
        const listener = event => {
          if (event.code === "Enter" || event.code === "NumpadEnter") {
            // event.preventDefault();
            if(props.submit !== null){
                onSubmit(event)
            }
          }
        };
        document.addEventListener("keydown", listener);
        return () => {
          document.removeEventListener("keydown", listener);
        };
      }, [props.login, props.password]);

    return(
        <div className="Login-container">
            <div className="LoginLogo-container">
                <div className="LoginLogo-image-container">
                    <img className="LoginLogo-image-img" src="./Logo/logo.png" alt="Logo.png"></img>
                </div>
                <div className="LoginLogo-text-container">
                    <p className="LoginLogo-text-txt">Sign in</p>
                </div>
            </div>
            <div className="LoginInput-container">
                <form className="LoginInput-container">
                    <Input label={"Login"} 
                        hint={"emailname@example.com"}
                        type={"text"}
                        value={props.login}
                        onChange={props.onChangeLogin}/>
                    <Input label={"Password"} 
                        hint={'\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022'}
                        type={"password"}
                        value={props.password}
                        onChange={props.onChangePassword}/>
                    <div className="LoginInput-link-container">
                        <p className="LoginInput-link-p-a" onClick={() => props.setLoginState("forgot")}>"Forgot password?"</p>
                    </div>
                </form>
            </div>
            <div className="LoginNext-container">
                <div className="LoginNext-newAccount">
                    <p className="LoginNext-text-a" onClick={() => props.setLoginState("register")}>Create new account</p>
                </div>
                <div className="LoginNext-button">
                    <Button to={"/map"} icon={null} text={"Sign in"} onClick={(e) => {if(props.submit !== null){onSubmit(e)}}}/>
                </div>
            </div>
        </div>
    )
}