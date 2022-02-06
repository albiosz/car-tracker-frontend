import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "./RoutingMachine.scss";

const CreateRoutingMachineLayer = (props) => {

  try {
    return L.Routing.control({
      waypoints: props.waypoints,
      routeWhileDragging: false,
      serviceUrl: "https://routing.openstreetmap.de/routed-car/route/v1",
      autoRoute: false,
      fitSelectedRoutes: false,
      show: false, // TODO should close the plan that appears on the screen, but it doesn't, css class added instead  
      createMarker: (i, point) => {
        return L.marker (point.latLng, {
          draggable: false,
          icon: L.divIcon({className: 'my-div-icon'})
        })
      }
    });
  } catch (e) {
    return null;
  }
  
};

const RoutingMachine = createControlComponent(CreateRoutingMachineLayer);

export default RoutingMachine;