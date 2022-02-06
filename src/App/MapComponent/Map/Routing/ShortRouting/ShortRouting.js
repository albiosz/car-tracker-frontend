import RoutingMachine from "./RoutingMachine/RoutingMachine";
import React, { useEffect, useState, useRef } from "react";
import store from "../../../../../store/store";
import L from "leaflet";
import convertEndpointHistory from '../../../../DataConverters/history';
import { ReactSession } from 'react-client-session';

export default function ShortRouting() {
  const [showHistory, setShowHistory] = useState(store.getState().showHistory);
  const [historyType, setHistoryType] = useState(store.getState().historyType);
  const [waypoints, setWaypoints] = useState([]);


  useEffect(() => {
    const unsubscribe = store.subscribe(() =>  {
      setShowHistory(store.getState().showHistory);
      setHistoryType(store.getState().historyType);
      
      if (store.getState().showHistory && store.getState().historyId !== null && store.getState().vehicles !== undefined) {

        let currentVehicle = store.getState().vehicles.find(vehicle => vehicle.id === store.getState().historyId);
        if (currentVehicle !== undefined && currentVehicle.latitude !== null && currentVehicle.longtitude !== null ) {

          let currentPosition = currentVehicle.position;
          if (currentPosition !== undefined && currentPosition !== null) {

            setWaypoints(oldWaypoints => {
              
              let lastPosition = oldWaypoints[oldWaypoints.length-1];
              if (lastPosition === undefined || lastPosition === null ||
                currentPosition.latitude !== lastPosition.lat || currentPosition.longtitude !== lastPosition.lng) {
                return [...oldWaypoints.slice(1), L.latLng(currentPosition.latitude, currentPosition.longtitude)];
              } else {
                return oldWaypoints;
              }
            }); 
          }
        }
      }
    })

    return unsubscribe;
  }, [])

  useEffect(() => {
    async function fetchData() {
      let id = store.getState().historyId;
      if (showHistory) {
        try {
          let idToName = store.getState().idName.idToName;

          const response = await fetch(`https://aimtrack.eastus2.azurecontainer.io:8080/historyShort?vehicle=${idToName[id]}`, {
            mode: 'cors',
            headers: {
              'jwt': ReactSession.get("token"),
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            const json = await response.json();
            let history = convertEndpointHistory(json)
            history = history.sort((veh1, veh2) => veh1.timestamp > veh2.timestamp);
            let waypoints = history.map(location => {
              if (location !== undefined) {
                return L.latLng(location.latitude, location.longtitude);
              }
              else{
                return null;
              }
            })
            let currentPosition = store.getState().vehicles.find(vehicle => vehicle.id === store.getState().historyId);
            if (currentPosition !== undefined && currentPosition !== null && currentPosition.latitude !== null && currentPosition.longtitude !== null) {
              waypoints = [...waypoints, L.latLng(currentPosition.latitude, currentPosition.longtitude)]
            }
            setWaypoints(waypoints);
            store.dispatch({type: "SET_HISTORY_WAYPOINTS", historyWaypoints: waypoints});
          }
        } catch(e) {
        }
      } else {
        setWaypoints([]);
      }
    }

    fetchData();
  }, [showHistory, historyType])

  if (waypoints.includes(undefined) || waypoints.includes(null)) {
    setWaypoints(waypoints.filter(waypoint => {
      return waypoint !== undefined && waypoint !== null;
    }));
  }
  
  const rMachine = useRef();
  if (rMachine.current && !waypoints.includes(undefined) && !waypoints.includes(null)) {
    try {
      console.log("History", waypoints)
      rMachine.current.setWaypoints(waypoints);
      rMachine.current.route();
      rMachine.current.hide();
    } catch (e) {
    }
  }

  return (
    <div>
      <RoutingMachine ref={rMachine} waypoints={waypoints}/>
    </div>
  )
}