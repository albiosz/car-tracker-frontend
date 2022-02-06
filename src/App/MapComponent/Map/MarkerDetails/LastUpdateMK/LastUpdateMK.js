import { useEffect, useState } from "react";
import store from "../../../../../store/store";
import getFormatedTimestamp from "../../../../getFromattedTimestamp/getFormattedTimestamp"

export default function LastUpdate(props) {

  const [timestamp, setTimestamp] = useState(store.getState().vehicles.find(vehicle => vehicle.id === props.id).timestamp);

  useEffect(() => {
    let unsubscribe = store.subscribe(() => {
      let currentMarker = store.getState().currentMarker;
      if (currentMarker !== null) {
        let newTimestamp = store.getState().vehicles.find(vehicle => vehicle.id === currentMarker).timestamp;
        setTimestamp(newTimestamp);
      }
    })

    return unsubscribe;
  }, []);

  return (
    <div className={props.styleName}>
      Last update: {timestamp - new Date(0) !== 0 ? getFormatedTimestamp(timestamp) : "No data available"}
    </div>
  )
}
