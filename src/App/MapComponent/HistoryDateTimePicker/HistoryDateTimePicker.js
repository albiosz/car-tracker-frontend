import { useEffect, useState } from "react";
import store from "../../../store/store";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Button from "../../Button/Button";
import "./HistoryDateTimePicker.scss"
import { ReactComponent as Back } from "../../../Assets/Icons/arrow_circle_left_white_24dp.svg";
import {ReactComponent as Close } from "../../../Assets/Icons/close_white_24dp.svg";
import HandleHistoryClick from "../Map/Routing/HandleHistoryClick/HandleHistoryClick";


export default function HistoryDateTimePicker(props) {
  const [dateTimeFrom, setDateTimeFrom] = useState(new Date(Date.now() - 24* 3600 * 1000));
  const [dateTimeTo, setDateTimeTo] = useState(new Date());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      
    })

    return unsubscribe;
  })

  
  return (
    <div className="DateTimePicker-container">
      <div className="DateTimePicker-subcontainer">
        <div className="DateTimePicker-top">
          <div className="DateTimePicker-name">
            <p className='DateTimePicker-name'>{ props.name }</p>
          </div>
          <div className="MarkerDetails-closebutton">
            <div>
              <Close className="MarkerDetails-closebutton" fill="#636363" onClick={() => {
                  props.setDateTimePicker(false);
                  store.dispatch({type: "MARKER_DETAIL", markerDetail: false});
                  store.dispatch({type: "CURRENT_MARKER", currentMarker: null});
                  store.dispatch({type: "MARKER_CLICKED", markerClicked: false});
              }}/>
            </div>
          </div>
        </div>
        <div className="DateTimePicker-longHistory">
          <div className="DateTimePicker-left-container">
            <div className="DateTimePicker-label">
              Long time history
            </div>
            <div className="DateTimePicker-left-dateTime">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="From"
                  value={dateTimeFrom}
                  onChange={(newDateTimeFrom) => {
                    setDateTimeFrom(newDateTimeFrom);
                  }}
                />
              </LocalizationProvider>
            </div>
            <div className="DateTimePicker-left-dateTime">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="To"
                  value={dateTimeTo}
                  onChange={(newDateTimeTo) => {
                    setDateTimeTo(newDateTimeTo);
                  }}
                />
              </LocalizationProvider>
            </div>
            <div className="DateTimePicker-left-button">
                <Button text={"Show"} onClick={() => {
                  HandleHistoryClick({
                    id: store.getState().currentVehicle.id,
                    showHistory: true,
                    historyType: "long",
                    dateTimeFrom: dateTimeFrom,
                    dateTimeTo: dateTimeTo});
                }}/>
            </div>
          </div>
        </div>
        {/* <div className="DateTimePicker-line"></div> */}
        <div className="DateTimePicker-shortHistory">
          <div className="DateTimePicker-label">
            Short time history
          </div>
          <div className="DateTimePicker-right-button">
            <Button text={"Show"} onClick={() => {
              HandleHistoryClick({
                id: store.getState().currentVehicle.id,
                showHistory: true,
                historyType: "short"});
            }}/>
          </div>
        </div>
        <div className="DateTimePicker-bottom">
          <div className="DateTimePicker-backButton">
            <Button text={"Back to details"} icon={<Back />} onClick={() => {props.setDateTimePicker(false)}}/>
          </div>
          <div className="DateTimePicker-hideHistoryButton">
            <Button text={"Hide history"} icon={<Close />} onClick={() => {store.dispatch({type: "SHOW_HISTORY", showHistory: false})}}/>
          </div>
        </div>
      </div>
    </div>
  )
}