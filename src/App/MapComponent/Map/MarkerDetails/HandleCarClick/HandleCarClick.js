import store from "../../../../../store/store";

export default function HandleCarClick(e) {
  
  if(store.getState().currentMarker !== e.id){

    let vehicle = store.getState().vehicles.find(vehicle => {
      return vehicle.id === e.id;
    })

    const zoom = e.zoom !== undefined ? e.zoom : 11;

    let moveRatio = 0.05
    if (zoom > 9) {
      moveRatio *= Math.pow((11 / zoom), 9);
    }
    store.dispatch({type: "MAP", 
      map: {
        center: [e.latlng.lat - moveRatio, e.latlng.lng],
        zoom: zoom
      }
    })
    
    if (!vehicle.visible && vehicle.position.latitude !== null && vehicle.position.longtitude !== null) {
      store.dispatch({type: "CHANGE_VISIBILITY", vehicle_id: vehicle.id});
    }
    store.dispatch({type: "CURRENT_VEHICLE", currentVehicle: vehicle})
    store.dispatch({type: "MARKER_DETAIL", markerDetail: true});
    store.dispatch({type: "CURRENT_MARKER", currentMarker: e.id});
    store.dispatch({type: "MARKER_CLICKED", markerClicked: true});
    store.dispatch({type: "FOLLOW", followVehicle: false});
    store.dispatch({type: "SHOW_HISTORY", showHistory: false});
    store.dispatch({type: "HISTORY_TYPE", historyType: null});
  }
  else {
    store.dispatch({type: "MARKER_DETAIL", markerDetail: false});
    store.dispatch({type: "CURRENT_MARKER", currentMarker: null});
    store.dispatch({type: "MARKER_CLICKED", markerClicked: false});
  }
}