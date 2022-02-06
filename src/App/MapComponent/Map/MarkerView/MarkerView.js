import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import store from "../../../../store/store";

export default function MarkerView() {
  const mapRef = useMap();

  const [map, setMap] = useState(store.getState().map);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      let newMap = store.getState().map;
      if (newMap !== undefined && newMap !== null && newMap.center[0] !== null && newMap.center[1] !== null) {
        setMap(newMap);
      }
    })
    return unsubscribe;
  }, [])

  mapRef.flyTo(map.center, map.zoom, {
    animate: true,
    duration: 0.5
  });

  return null;
}