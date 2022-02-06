import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import "./LoadingPage.scss";

const styles = {
    width: "75px",
    height: "75px",
    color: "#1976D2"
}

export default function LoadingPage() {
    return(
        <div className="LoadingPage-container">
            <div className="LoadingPage-subcontainer">
                <div className="LoadingPage-CircularProgress">
                    <CircularProgress style={styles}/>
                </div>
                <div className="LoadingPage-text">
                    <p className="LoadingPage-p">Checking...</p>
                </div>
            </div>
        </div>
    )
}