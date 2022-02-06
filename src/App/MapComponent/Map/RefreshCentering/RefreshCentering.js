import { useEffect, useState } from "react";
import { latLngBounds } from "leaflet";

import FollowVehicle from "./FollowVehicle/FollowVehicle";
import DisplayAllVehicles from "./DisplayAllVehicles/DisplayAllVehicles";
import store from "../../../../store/store";

function RefreshCentering() {
  
  const [followVehicle, setFollowVehicle] = useState(store.getState().followVehicle);
  const [showHistory, setShowHistory] = useState(store.getState().showHistory);
  const [refreshCentering, setRefreshCentering] = useState(store.getState().refreshCentering);
  const [historyWaypoints, setHistoryWaypoints] = useState(store.getState().historyWaypoints);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setFollowVehicle(store.getState().followVehicle);
      setShowHistory(store.getState().showHistory);
      setRefreshCentering(store.getState().refreshCentering);
      setHistoryWaypoints(store.getState().historyWaypoints);
    })

    return unsubscribe;
  }, []);

  useEffect(() => {
    store.dispatch({type: 'CHANGE_REFRESH_VIEW', refreshCentering: false});
  }, [refreshCentering])


  if (followVehicle) {
    return <FollowVehicle />
  } else if (refreshCentering) {
    let waypoints = store.getState().vehicles.map(vehicle => {
      if (vehicle.displayEntry && vehicle.visible) {
        return [vehicle.position.latitude, vehicle.position.longtitude]
      }
      return null;
    })
    let markerBounds = latLngBounds(waypoints);
    return <DisplayAllVehicles markerBounds={markerBounds}/>
  } else if (showHistory) {
    if (historyWaypoints.length > 0) {
      let waypoints = latLngBounds(historyWaypoints);
      return <DisplayAllVehicles markerBounds={waypoints}/>
    }
  }
  return null;
}
export default RefreshCentering;