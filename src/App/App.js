import './App.css';
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import MapComponent from "./MapComponent/MapComponent";
import LoginPage from "./LoginPage/LoginPage";
// import FormPage from './FormPage/FormPage';
import { ReactSession } from 'react-client-session';
import ReqAuthRout from "./ReqAuthRoute/ReqAuthRoute";
import NotFoundPage from './NotFoundPage/NotFoundPage';
import CheckLogin from './CheckLogin/CheckLogin';
import ShowMore from "./ShowMore/ShowMore";

export default function App() {

  ReactSession.setStoreType("sessionStorage");

  return (
    <div className="App-wrapper">
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>}/>
        <Route path="/login" element={<CheckLogin element={<LoginPage/>}/>}/>
        {/* <Route path="/form" element={<ReqAuthRout element={<FormPage/>}/>}/> */}
        <Route path="/details" element={<ReqAuthRout element={<ShowMore/>}/>}/>
        <Route path="/map" element={<ReqAuthRout element={<MapComponent/>}/>}/>
        <Route path="/*" element={<NotFoundPage/>}/>
      </Routes>
    </div>
  )
}
