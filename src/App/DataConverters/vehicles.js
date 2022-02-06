
export default function convertEndpointVehicles(vehiclesNames) {
  let idName = {nameToId: {}, idToName: {}}

  let id = -1;
  let vehicles = vehiclesNames.map(name => {
    id++;
    idName.nameToId[name] = id;
    idName.idToName[id] = name;
    return {
        id: id,
        name: name,
        position: {
          latitude: null,
          longtitude: null,
        },
        timestamp: new Date(0),
        visible: false
    }
  })

  return {
    idName: idName,
    vehicles: vehicles
  }
}
