import React from "react";
import store from "../../../store/store";
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import History from "./Routing/Routing";
import RefreshCentering from "./RefreshCentering/RefreshCentering";
import Markers from "./Markers/Markers";
import MarkerView from "./MarkerView/MarkerView"

function MapClick(){
  useMapEvents({
    click: () => {
      store.dispatch({type: "MARKER_DETAIL", markerDetail: false});
      store.dispatch({type: "CURRENT_MARKER", currentMarker: null});
      store.dispatch({type: "MARKER_CLICKED", markerClicked: false});
      store.dispatch({type: "FOLLOW", followVehicle: false})
    }
  });
  return null;
}

export default function Map() {

  return (
    <div styles={{positon: 'fixed', zIndex: 1}}>
      <MapContainer center={store.getState().map.center} zoom={store.getState().map.zoom} scrollWheelZoom={true} zoomControl={false}>
        <MapClick />    
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Markers/>
        <History/>

        <RefreshCentering />
        <MarkerView />
      </MapContainer>
    </div>
  );
}
