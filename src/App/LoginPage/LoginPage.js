import React, { useState } from "react";
import "./LoginPage.scss";
import Login from "../LoginPage/Login/Login";
import Register from "../LoginPage/Register/Register";
import Forgot from "../LoginPage/Forgot/Forgot";
import { ReactSession } from 'react-client-session';
import { useNavigate } from "react-router-dom";


export default function LoginPage() { 
    const navigate = useNavigate();

    const [loginState, setLoginState] = useState("login")
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const setloginstate = (value) => {
        setLoginState(value);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        await loginUser({
          login,
          password
        });
    }

    const loginUser = async (credentials) => {
        try {
            const response = await fetch('https://aimtrack.eastus2.azurecontainer.io:8080/authenticate', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'username': credentials.login,
                    'password': credentials.password,
                })
            });
            if (response.ok) {
                const json = await response.json();
                ReactSession.set("token", json.token);
                ReactSession.set("login", credentials.login);
                navigate("/map");
            }
        } catch(e) {
        }
    }

    let container;
    switch(loginState){
        case "login":
            container = 
                <div className="LoginPage-container">
                    <Login
                        login={login}
                        password={password}
                        linkStateInput={"forgot"} 
                        setLoginState={setloginstate}
                        onChangeLogin={(value) => setLogin(value)}
                        onChangePassword={(value) => setPassword(value)}
                        submit={handleSubmit}/>
                </div>
            break;
        case "forgot":
            container = 
                <div className="LoginPage-container">
                    <Forgot 
                        login={login}
                        setLoginState={setloginstate}
                        onChangeLogin={(value) => setLogin(value)}
                        submit={null}/>
                </div>;
            break;
        case "register":
            container =
                <div className="LoginPage-container">
                    <Register
                        login={login}
                        password={password}
                        setLoginState={setloginstate}
                        onChangeLogin={(value) => setLogin(value)}
                        onChangePassword={(value) => setPassword(value)}
                        submit={null}/>
                </div>
            break;
        default:
            container = null;
            break;
    }

    return (
        <div className="LoginPage-site">
            {container}
        </div>
    )
}