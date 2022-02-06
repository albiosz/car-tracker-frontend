import { useEffect, useState } from "react";
import store from "../../../../../store/store";

export default function LocationGeocoding(props) {
  const [location, setLocation] = useState(store.getState().vehicles.find(vehicle => vehicle.id === props.id).position);
  const [position, setPosition] = useState("")
  
  useEffect(() => {
    let controller = new AbortController();
    let unsubscribe = store.subscribe(async () => {
      let currentMarker = store.getState().currentMarker;
      if (currentMarker !== null) {
        let newLocation = await store.getState().vehicles.find(vehicle => vehicle.id === currentMarker).position;
        if (newLocation.latitude !== location.latitude || newLocation.longtitude !== location.longtitude || position === "") {
          try{
            setLocation(newLocation);
            const result = await fetch(`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=${newLocation.longtitude},${newLocation.latitude}`, {
                                        signal: controller.signal
                                    })
                                    .then(data => data.json())
                                    .then(data => data.hasOwnProperty("error")? "Unknown" : data.address.Address + " " + data.address.City);
            setPosition(result.toString());
          }
          catch(e){
            if (!controller.signal.aborted) {
            }
          }
          
        }
      }
    })

    return () => { 
      unsubscribe();
      controller.abort()} ;
  }, [location.latitude, location.longtitude, position]);


  return (
    <div className={props.styleName}>
      Location: {position}
    </div>
  )
}