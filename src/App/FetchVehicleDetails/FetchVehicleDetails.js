import { ReactSession } from 'react-client-session';
import store from "../../store/store";

export default async function FetchVehicleDetails(id) {

  let vehicleDetails = {
    type: null,
    vin: null,
    driver: null,
    registerPlates: null,
    model: null
  }

  let name = "";
  if (store.getState().idName) {
    name = store.getState().idName.idToName[id];
  } else {
    return vehicleDetails;
  }
  try {
    const response = await fetch(`https://aimtrack.eastus2.azurecontainer.io:8080/vehicleDetails?vehicle=${name}`, {
      mode: 'cors',
      headers: {
        'jwt': ReactSession.get("token")
      }
    });
    if (response.ok) {
      const details = await response.json();
      vehicleDetails.type = details.vehicle_type;
      vehicleDetails.vin = details.vin;
      vehicleDetails.driver = details.driver;
      vehicleDetails.registerPlates = details.register_plates;
      vehicleDetails.model = details.model;
    }
  } catch(e) {

  }

  return vehicleDetails;
}