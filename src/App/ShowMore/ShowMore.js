import { useLocation } from "react-router-dom"
import "../FormPage/FormPage.scss";
import "./ShowMore.scss"
import Record from "./Record/Record";
import Button from "../Button/Button";
import { useNavigate } from "react-router";
import FetchVehicleDetails from "../FetchVehicleDetails/FetchVehicleDetails";

import {ReactComponent as Back} from "../../Assets/Icons/arrow_circle_left_white_24dp.svg";
import { useEffect, useState } from "react";

export default function ShowMore() {

  const [vehicle, setVehicle] = useState({
    type: null,
    vin: null,
    registerPlates: null,
    model: null,
    driver: null
  })

  const navigate = useNavigate();
  const state = useLocation();

  useEffect(() => {
    async function fetchData() {
      if (state.id !== undefined || state.id !== null) {
        let tempVehicleDetails = await FetchVehicleDetails(state.state.id);
        setVehicle({
          type: tempVehicleDetails.type,
          vin: tempVehicleDetails.vin,
          registerPlates: tempVehicleDetails.registerPlates,
          model: tempVehicleDetails.model,
          driver: tempVehicleDetails.driver
        })
      }
      
    }

    fetchData();
  }, [state.id, state.state.id])

  const noData = "No data available";
  return (
    <div className="FormPage-site">
      <div className="ShowMore-container">
        <div className="FormPageLogo-container">
          <div className="FormPageLogo-image-container">
            <img className="FormPageLogo-image-img" src="./Logo/logo.png" alt="Logo.png"></img>
          </div>
          <div className="FormPageLogo-text-container">
            <p className="FormPageLogo-text-txt">Details</p>
          </div>
          <div className="ShowMore-dataContainer">
            <Record label={"Vehicle type"}
              data={vehicle.type !== null ? vehicle.type : noData}/>
            <Record label={"VIN"}
              data={vehicle.vin !== null ? vehicle.vin : noData}/>
            <Record label={"Register plates"}
              data={vehicle.registerPlates !== null ? vehicle.registerPlates : noData}/>
            <Record label={"Model"}
              data={vehicle.model !== null ? vehicle.model : noData}/>
            <Record label={"Driver"}
              data={vehicle.driver !== null ? vehicle.driver : noData}/>
          </div>
        </div>
        <div className="ShowMore-button">
          <Button text={"Back to map"} icon={<Back />} onClick={() => {navigate("/map")}} />
        </div>
      </div>
    </div>
  )
}