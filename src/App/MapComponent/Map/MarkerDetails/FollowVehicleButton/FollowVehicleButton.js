import { useEffect } from "react"
import { useState } from "react"
import store from "../../../../../store/store"
import {ReactComponent as Location} from "../../../../../Assets/Icons/location_on_white_24dp.svg"

import Button from '../../../../Button/Button';


export default function FollowVehicleButton() {

  const [followVehicle, setFollowVehicle] = useState(store.getState().followVehicle);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setFollowVehicle(store.getState().followVehicle);
    })

    return unsubscribe;
  }, [])

  let text, onClickChange;
  if (followVehicle) {
    text = "Stop following";
    onClickChange = false;
  } else {
    text = "Follow";
    onClickChange = true;
  }

  return (
    <Button text={text} icon={<Location />} onClick={() => {
      store.dispatch({type: "FOLLOW", followVehicle: onClickChange})
    }} />
  )
}