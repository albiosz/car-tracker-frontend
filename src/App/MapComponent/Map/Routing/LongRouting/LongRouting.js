import React, { useEffect, useState } from "react";
import store from "../../../../../store/store";
import L from "leaflet";
import convertEndpointHistory from '../../../../DataConverters/history';
import { ReactSession } from 'react-client-session';
import { Marker } from 'react-leaflet';
import "./LongRouting.scss"

export default function LongRouting() {

  const [waypoints, setWaypoints] = useState([])
  const [showHistory, setShowHistory] = useState(store.getState().showHistory)
  const [historyType, setHistoryType] = useState(store.getState().historyType)
  const [dateTime, setDateTime] = useState(store.getState().dateTime)


  useEffect(() => {
    const unsubscribe = store.subscribe(() =>  {
      setShowHistory(store.getState().showHistory);
      setHistoryType(store.getState().historyType);
      setDateTime(store.getState().dateTime);
    })

    return unsubscribe;
  }, [])

  useEffect(() => {
    async function fetchData() {
      let id = store.getState().historyId;
      if (showHistory) {
        try {
          let idToName = store.getState().idName.idToName;
          let dateTime = store.getState().dateTime;

          const response = await fetch(`https://aimtrack.eastus2.azurecontainer.io:8080/historyBetween?vehicle=${idToName[id]}&from=${Math.floor(dateTime.from.getTime()/1000)}&to=${Math.floor(dateTime.to.getTime()/1000)}`, {
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
            setWaypoints(waypoints);
            store.dispatch({type: "SET_HISTORY_WAYPOINTS", historyWaypoints: waypoints});
          }
        } catch(e) {
        }
      } else {
        setWaypoints([]);
      }
    }

    fetchData()
  }, [showHistory, historyType, dateTime])

  if (showHistory) {
    return (
      waypoints.map(waypoint => {
        return (
          <Marker
            position={[waypoint.lat, waypoint.lng]}
            icon={L.divIcon({
              className: "my-custom-pin",
              iconAnchor: [0, 0],
              html: `<span class="circle">`
            })}
          />
        )
      })
    )
  } else {
    return null;
  }
  
}