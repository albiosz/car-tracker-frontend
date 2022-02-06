import store from "../../../../store/store";
import "./MarkerDetails.scss";
import Button from '../../../Button/Button';
import {ReactComponent as Car} from "../../../../Assets/Icons/directions_car_white_24dp.svg"
import {ReactComponent as Location} from "../../../../Assets/Icons/location_on_white_24dp.svg"
import {ReactComponent as VIN} from "../../../../Assets/Icons/manage_search_white_24dp.svg"
import {ReactComponent as Driver} from "../../../../Assets/Icons/account_circle_white_24dp.svg"
import {ReactComponent as Timestamp} from "../../../../Assets/Icons/schedule_white_24dp.svg"
import {ReactComponent as Search } from "../../../../Assets/Icons/search_white_24dp.svg";
import {ReactComponent as Close } from "../../../../Assets/Icons/close_white_24dp.svg";
import LastUpdateMK from "./LastUpdateMK/LastUpdateMK";
import LocationGeocoding from './LocationGeocoding/Location.Geocoding';
import FollowVehicleButton from './FollowVehicleButton/FollowVehicleButton';
import ShowHistoryButton from './ShowHistoryButton/ShowHistoryButton';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import HistoryDateTimePicker from "../../HistoryDateTimePicker/HistoryDateTimePicker";
import FetchVehicleDetails from "../../../FetchVehicleDetails/FetchVehicleDetails";

export default function MarkerDetails() {
    const [currentVehicle, setcurrentVehicle] = useState(store.getState().currentVehicle);
    const [markerDetail, setMarkerDetail] = useState(store.getState().markerDetail);
    const [dateTimePicker, setDateTimePicker] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [vehicleDetails, setVehicleDetails] = useState({type: "", vin: "", driver: ""});
    
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setcurrentVehicle(store.getState().currentVehicle);
            setMarkerDetail(store.getState().markerDetail);
        })
        
        return unsubscribe;
    }, []);

    useEffect(() => {
        async function vechicleD(){
            if (currentVehicle !== undefined && currentVehicle !== null) {
                let tempVehicleDetails = await FetchVehicleDetails(currentVehicle.id);
                setVehicleDetails({
                    type: tempVehicleDetails.type,
                    vin: tempVehicleDetails.vin,
                    driver: tempVehicleDetails.driver
                })
            }
        }
        
        vechicleD()
    }, [currentVehicle])

    if (!markerDetail) {
        return null;
    } else if(dateTimePicker) {
        return (
            <HistoryDateTimePicker setDateTimePicker={setDateTimePicker} setShowHistory={setShowHistory} name={currentVehicle.name}/>
        )
    } else {
        return (
            <div className="MarkerDetails-container">
                <div className="MarkerDetails-subcontainer">
                    <div className="MarkerDetails-title-container">
                        <div className="MarkerDetails-title-subcontainer">
                            <div className="MarkerDetails-name">
                                <p className='MarkerDetails-name'>{ currentVehicle.name }</p>
                            </div>
                            <div className="MarkerDetails-closebutton">
                                <div>
                                    <Close className="MarkerDetails-closebutton" fill="#636363" onClick={() => {
                                        store.dispatch({type: "MARKER_DETAIL", markerDetail: false});
                                        store.dispatch({type: "CURRENT_MARKER", currentMarker: null});
                                        store.dispatch({type: "MARKER_CLICKED", markerClicked: false});
                                    }}/>
                                </div>
                            </div>
                        </div>
                        <div className="MarkerDetails-hr_container">
                            <hr className="MarkerDetails-hr" />
                        </div>
                    </div>
                    <div className="MarkerDetails-info-container">
                        <div className="MarkerDetails-info-subcontainer">
                            <div className="MarkerDetails-vehicle">
                                <div className="MarkerDetails-icon">
                                    <Car fill="#636363"/>
                                </div>
                                <div>
                                    {/* <p className='MarkerDetails-p-type'>Typ: {this.props.vehicle.type}</p> */}
                                    <p className='MarkerDetails-p'>Type: {vehicleDetails.type}</p>
                                </div>
                            </div>
                            <div className="MarkerDetails-vehicle">
                                <div className="MarkerDetails-icon">
                                    <Location fill="#636363"/>
                                </div>
                                <div>
                                    {/* <p className='MarkerDetails-p-location'>Lokalizacja: {this.props.vehicle.location}</p> */}
                                    {/* <p className='MarkerDetails-p'>Location: Nowogrodzka Street 24</p> */}
                                    <LocationGeocoding id={currentVehicle.id} styleName={'MarkerDetails-p'}/>
                                </div>
                            </div>
                            <div className="MarkerDetails-vehicle">
                                <div className="MarkerDetails-icon">
                                    <VIN fill="#636363"/>
                                </div>
                                <div>
                                    {/* <p className='MarkerDetails-p-VIN'>Nr VIN: {this.props.vehicle.VIN}</p> */}
                                    <p className='MarkerDetails-p'>VIN: {vehicleDetails.vin}</p>
                                </div>
                            </div>
                            <div className="MarkerDetails-vehicle">
                                <div className="MarkerDetails-icon">
                                    <Driver fill="#636363"/>
                                </div>
                                <div>
                                    {/* <p className='MarkerDetails-p-driver'>Kiwrowca: {this.props.vehicle.driver}</p> */}
                                    <p className='MarkerDetails-p'>Driver: {vehicleDetails.driver}</p>
                                </div>
                            </div>
                            <div className="MarkerDetails-vehicle">
                                <div className="MarkerDetails-icon">
                                    <Timestamp fill="#636363"/>
                                </div>
                                <div>
                                    {/* <p className='MarkerDetails-p-hour'>Data: {this.props.vehicle.hour}</p> */}
                                    <LastUpdateMK id={currentVehicle.id} styleName={'MarkerDetails-p'}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="MarkerDetails-button-container">
                        <div className="MarkerDetails-button-subcontainer">
                            <ShowHistoryButton setDateTimePicker={setDateTimePicker} showHistory={showHistory}/>
                            <FollowVehicleButton />
                            <Button text={"Show More"} icon={<Search />} onClick={() => {navigate("/details", {state:{id: currentVehicle.id}})}}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
