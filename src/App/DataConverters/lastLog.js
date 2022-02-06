export default function convertEndpointLastLog(vehicles, idName) {
  let vehiclesToUpdate = [];
  vehicles.changes.forEach(vehicle => {
    let castedVehicle = {
      id: idName.nameToId[vehicle.lastRecord.vehicle],
      name: vehicle.lastRecord.vehicle,
      position: {
        latitude: vehicle.lastRecord.latitude,
        longtitude: vehicle.lastRecord.longitude
      },
      timestamp: new Date(vehicle.lastRecord.device_timestamp*1000)
    }
    vehiclesToUpdate.push(castedVehicle);
    })
  
  return vehiclesToUpdate;
}