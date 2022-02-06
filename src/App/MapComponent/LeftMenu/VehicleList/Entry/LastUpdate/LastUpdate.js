import { useEffect, useState } from "react";
import store from "../../../../../../store/store";
import getFormatedTimestamp from "../../../../../getFromattedTimestamp/getFormattedTimestamp"
import "./LastUpdate.scss"

export default function LastUpdate(props) {
  
  const [timestamp, setTimestamp] = useState(store.getState().vehicles.find(vehicle => vehicle.id === props.id).timestamp);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      let newTimestamp = store.getState().vehicles.find(vehicle => vehicle.id === props.id).timestamp;
      if (newTimestamp !== timestamp) {
        setTimestamp(newTimestamp)
      }
    })

    return unsubscribe;
  }, [props.id, timestamp]);

  return (
    <div className="timestamp">
      {timestamp - new Date(0) !== 0 ? getFormatedTimestamp(timestamp) : "No data available"}
    </div>
  )
}
