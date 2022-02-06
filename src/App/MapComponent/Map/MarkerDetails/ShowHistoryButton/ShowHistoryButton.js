import { useEffect } from "react"
import { useState } from "react"
import store from "../../../../../store/store"
import {ReactComponent as Location} from "../../../../../Assets/Icons/location_on_white_24dp.svg"

import Button from '../../../../Button/Button';

export default function ShowHistoryButton(props) {

  const [showHistory, setShowHistory] = useState(store.getState().showHistory);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setShowHistory(store.getState().showHistory);
    })

    return unsubscribe;
  }, [])

  let text;
  if (showHistory) {
    text = "Hide History";
  } else {
    text = "Show History";
  }

  return (
    <Button text={text} icon={<Location />} onClick={() => {
      if (showHistory) {
        store.dispatch({type: "SHOW_HISTORY", showHistory: false});
      } else {
        props.setDateTimePicker(true);
      }
    }} />
  )
}