import React, { useEffect, useState } from "react";
import store from "../../../../store/store";
import { Marker, useMap } from 'react-leaflet';
import GetIcon from "../GetIcon/GetIcon";
import HandleCarClick from "../MarkerDetails/HandleCarClick/HandleCarClick";

export default function Markers() {
  const [vehicles, setVehicles] = useState(store.getState().vehicles);

  const mapRef = useMap();

  useEffect(() => {
    const unsubscribe = store.subscribe(() => { 
      setVehicles(store.getState().vehicles);
    })
    return unsubscribe;
  }, [])

  return (
    vehicles.map(vehicle => {
      if(vehicle.visible && vehicle.displayEntry && vehicle.position.latitude !== null && vehicle.position.longtitude !== null) {
        return (
          <div key={vehicle.id}>
            <Marker
              position={[vehicle.position.latitude, vehicle.position.longtitude]} 
              icon={GetIcon(30)}
              id={vehicle.id}
              eventHandlers={{
                click: (e) => {
                  HandleCarClick({id: e.target.options.id, latlng: e.latlng, zoom: mapRef.getZoom()});
                },
              }}
              />
          </div>
        )
      }
      else {
        return null;
      }
    })
  )
}