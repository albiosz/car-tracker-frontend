import { useEffect, useState } from "react";
import store from "../../../../../../store/store";
import "./ShowVehicleSwitch.scss";
import Switch from '@mui/material/Switch';

export default function ShowVehicleSwitch(props) {

  const [checked, setChecked] = useState(store.getState().vehicles.find(vehicle => vehicle.id === props.id).visible)
  

  useEffect(() => {
    let unsubscribe = store.subscribe(() => {
      let newChecked = store.getState().vehicles.find(vehicle => vehicle.id === props.id).visible;
      setChecked(newChecked);
    })

    return unsubscribe;
  }, [props.id])

  const handleSwitchChange = (event) => {
    const position = store.getState().vehicles.find(vehicle => vehicle.id === props.id).position;
    if (position.latitude !==  null && position.longtitude !==  null) {
      store.dispatch({type: "CHANGE_VISIBILITY", vehicle_id: props.id});
    }
  }

  return (
    <div className="switch">
      <Switch 
            checked={checked}
            onChange={handleSwitchChange}
            onClick={(e) => e.stopPropagation()}
          />
    </div>
  )
}