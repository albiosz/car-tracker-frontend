import React, { useEffect } from "react";
import checkToken from "../CheckToken/CheckToken";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import LoadingPage from "../LoadingPage/LoadingPage";


export default function CheckLogin({ element }) {
    const [loading, setLoading] = useState(true);
    const [isTokenOk, setIsTokenOk] = useState(false);

    useEffect(() => {
        async function fetchToken() {
            const token = await checkToken();
            setIsTokenOk(token);
            setLoading(false);
        }

        fetchToken();
    }, [])

    return (loading)? <LoadingPage/>: (isTokenOk)? <Navigate to="/map" replace/>  : element;
}