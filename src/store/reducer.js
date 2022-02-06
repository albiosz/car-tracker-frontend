import update from 'react-addons-update';

const initState = {
  vehicles: [],
  loadingData: true,
  markerDetail: false,
  currentMarker: null,
  currentVehicle: null,
  markerClicked: false,
  map: {
    center: [51.9194, 19.1451],
    zoom: 7
  },
  showHistory: false,
  historyId: null,
  refreshCentering: false,
  loginState: null,
  login: "User2412",
  cars: ["Car", "Mini Truck", "Suv", "VAN", "Big Truck", "Pickup"],
  followVehicle: false,
  historyWaypoints: [],
  showList: true,
  idName: null,
  historyType: null,
  dateTime: {
    from: null,
    to: null
  }
}

export default function reducer(state = initState, action) {
  
  switch (action.type) {
    case 'CHANGE_VISIBILITY':
      return {
        ...state,
        refreshCentering: true,
        vehicles: state.vehicles.map(vehicle => {
          if (vehicle.id === action.vehicle_id) {
            vehicle.visible = !vehicle.visible;
          }
          return vehicle;
        })
      }

    case 'CHANGE_REFRESH_VIEW':
      return {
        ...state,
        refreshCentering: action.refreshCentering
      }

    case 'ADD_VEHICLE':
      return {
        ...state,
        vehicles: [...state.vehicles, {...action.newVehicle, displayEntry: true}]
      }

    case 'LOAD_VEHICLES':
      let newVehicles = action.vehicles.map(vehicle => {
        return {...vehicle, displayEntry: true}
      })

      return {
        ...state,
        vehicles: newVehicles,
        loadingData: false
      }

    case 'REFREASH_VEHICLES':
      return {
        ...state,
        vehicles: action.vehicles
      }

    case 'MARKER_DETAIL':
      return {
        ...state,
        markerDetail: action.markerDetail
      }

    case 'CURRENT_MARKER':
      return {
        ...state,
        currentMarker: action.currentMarker
      }

      case 'CURRENT_VEHICLE':
      return {
        ...state,
        currentVehicle: action.currentVehicle
      }

    case 'MARKER_CLICKED':
      return {
        ...state,
        markerClicked: action.markerClicked
      }

    case 'MAP':
      return {
        ...state,
        map: action.map
    }

    case 'SHOW_HISTORY':
      return {
        ...state,
        showHistory: action.showHistory
      }

    case 'HISTORY_ID':
      return {
        ...state,
        historyId: action.historyId
      }

    case 'SET_HISTORY_WAYPOINTS':
      return {
        ...state,
        historyWaypoints: action.historyWaypoints
      }

    case 'FOLLOW':
      return {
        ...state,
        followVehicle: action.followVehicle
      }

    case 'SHOW_LIST':
      return {
        ...state,
        showList: action.showList
      }

    case 'SET_NAMES_TO_ID':
      return {
        ...state,
        idName: action.idName
      }

    case 'UPDATE_VEHICLE':

      let vehicle_idx = state.vehicles.findIndex(vehicle => vehicle.id === action.vehicle.id);

      if (vehicle_idx === -1) {
        return {    
          ...state,
          refreshCentering: true,
          vehicles: [...state.vehicles, {...action.vehicle, displayEntry:true}]
        };
      }

      return update(state, {
        vehicles: {
          [vehicle_idx]: {
            name: {$set: action.vehicle.name},
            position: {
              latitude: {$set: action.vehicle.position.latitude},
              longtitude: {$set: action.vehicle.position.longtitude}
            },
            timestamp: {$set: action.vehicle.timestamp}
          }
        }
      });

    case 'UPDATE_VEHICLES':
      let refreshCentering = state.refreshCentering;  

      let vehiclesToAdd = [];
      let updatedVehicles = state.vehicles;
      for (let updated_vehicle of action.vehicles) {
        let vehicle_idx = state.vehicles.findIndex(vehicle => vehicle.id === updated_vehicle.id);

        if (vehicle_idx === -1) {
          refreshCentering = true;
          vehiclesToAdd.push({...updated_vehicle, displayEntry: true});
        } else {
          updatedVehicles = update(updatedVehicles, {
            [vehicle_idx]: {
              name: {$set: updated_vehicle.name},
              position: {
                latitude: {$set: updated_vehicle.position.latitude},
                longtitude: {$set: updated_vehicle.position.longtitude}
              },
              timestamp: {$set: new Date(updated_vehicle.timestamp)}
            }
          });
        }
      }
      
      return {
        ...state,
        refreshCentering: refreshCentering,
        vehicles: [...updatedVehicles, ...vehiclesToAdd]
      }

    case 'LOGIN_STATE':
      return {
        ...state,
        loginState: action.loginState
      }

    case 'LOGIN':
      return {
        ...state,
        login: action.login
      }

    case "HISTORY_TYPE":
      return {
        ...state,
        historyType: action.historyType
      }
    
    case "DATE_TIME":
      return {
        ...state,
        dateTime: {
            from: action.from,
            to: action.to
          }
      }

    default:
      return {
        ...state
      }
    
  }
}

