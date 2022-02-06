import React from "react";
import Button from "../../Button/Button";
import { useNavigate } from "react-router";
import "./AddNewButton.scss"
import { ReactComponent as Add } from "../../../Assets/Icons/add_white_24dp.svg";

export default function AddNewButton() {
  const navigate = useNavigate();

  return (
    <div className="addNewButton">
      <Button text={"Add new vehicle"} icon={<Add />} onClick={() => {navigate("/form", {state:{type: "add"}})}}/>
    </div>
  )
}


