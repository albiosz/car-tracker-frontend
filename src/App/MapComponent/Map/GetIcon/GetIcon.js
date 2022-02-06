import L from "leaflet";

export default function GetIcon(size){
  return L.icon({
    iconUrl: '/Markers/car_marker.png',
    iconSize: [size],
    iconAnchor: [size/2, size]
  })
}