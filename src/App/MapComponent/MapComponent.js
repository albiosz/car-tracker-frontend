import React, {useEffect } from "react";
import Map from "./Map/Map";
import LeftMenu from "./LeftMenu/LeftMenu";
// import AddNewButton from "./AddNewButton/AddNewButton";
import store from "./../../store/store";
import "./MapComponent.scss";
import MarkerDetails from "./Map/MarkerDetails/MarkerDetails";
import UserInfo from "./UserInfo/UserInfo";
import EventSource from "eventsource";
import convertEndpointVehicles from "../DataConverters/vehicles";
import convertEndpointLastLog from "../DataConverters/lastLog";
import { ReactSession } from 'react-client-session';
import ShowListSwitch from "./LeftMenu/ShowListSwitch/ShowListSwitch";

export default function MapComponent() {
  useEffect(() => {
    let idName = {};
    async function fetchData() {
      try {
        const response = await fetch(`https://aimtrack.eastus2.azurecontainer.io:8080/vehicles`, {
          mode: 'cors',
          headers: {
            'jwt': ReactSession.get("token")
          }
        });
        if (response.ok) {
          const vehiclesNames = await response.json();
          let converted = convertEndpointVehicles(vehiclesNames);
          idName = converted.idName;
          store.dispatch({type: 'SET_NAMES_TO_ID', idName: idName})
          store.dispatch({type: 'UPDATE_VEHICLES', vehicles: converted.vehicles});

        }
      } catch(e) {
      }
    }
    
    fetchData();
    
    // debugger;
    let url = new URL("https://aimtrack.eastus2.azurecontainer.io:8080/lastLog");
    let params = {duration: 2}
    url.search = new URLSearchParams(params).toString();

    let vehiclesToUpdate = [];
    let eventSource = new EventSource(url.toString(), {
      headers: {
        'jwt': ReactSession.get("token")
      }
    });
    eventSource.onmessage = event => {
      let vehicles = JSON.parse(event.data);
      vehiclesToUpdate = convertEndpointLastLog(vehicles, idName);
    }

    let interval = setInterval(() => {
      if (vehiclesToUpdate.length > 0) {
        
        store.dispatch({type: 'UPDATE_VEHICLES', vehicles: vehiclesToUpdate});
      }
      vehiclesToUpdate = [];
    }, 5000)

    return () => {
      eventSource.close();
      clearInterval(interval);
    };
  }, [])

  return (
    <div>
      <div className="map">
        <Map/>
      </div>
      <div className="leftSide">
        <ShowListSwitch/>
        <LeftMenu/>
      </div>
      <MarkerDetails/>
      <UserInfo/>
      {/* <AddNewButton/> */}
    </div>
  )
}
