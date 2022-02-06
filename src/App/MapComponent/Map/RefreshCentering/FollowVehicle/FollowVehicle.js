import { useState } from "react";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

import store from "../../../../../store/store";

export default function FollowVehicle() {

  const map = useMap();

  const currentId = store.getState().currentVehicle.id;
  const [position, setPosition] = useState(store.getState().vehicles.find(vehicle => vehicle.id === currentId).position);

  useEffect(() => {
    let unsubscribe = store.subscribe(() => {
      setPosition(store.getState().vehicles.find(vehicle => vehicle.id === currentId).position);
    })

    return unsubscribe;
  }, [currentId])

  map.flyTo([position.latitude, position.longtitude]);

  return null;
}