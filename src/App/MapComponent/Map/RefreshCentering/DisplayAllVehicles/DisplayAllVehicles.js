import { useMap } from "react-leaflet";


export default function DisplayAllVehicles({markerBounds}) {

  const map = useMap();

  if (markerBounds === undefined || markerBounds.length <= 0 || !markerBounds.isValid()) {
    return null;
  }

  if (markerBounds.getNorth() - markerBounds.getSouth() === 0 && markerBounds.getEast() - markerBounds.getWest() === 0) {
    map.flyTo([markerBounds.getNorth(), markerBounds.getEast()], 11, {
      animate: true,
      duration: 0.5
    });
  } else {
    map.fitBounds(markerBounds);
  }
  
  return null;
}