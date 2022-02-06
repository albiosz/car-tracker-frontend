import React from "react";
import store from "./../../../../../store/store"
import "./Entry.scss";
import HandleCarClick from "../../../Map/MarkerDetails/HandleCarClick/HandleCarClick";
import LastUpdate from "./LastUpdate/LastUpdate";
import ShowVehicleSwitch from "./ShowVehicleSwitch/ShowVehicleSwitch";
import {ReactComponent as Car} from "../../../../../Assets/Icons/directions_car_black_24dp.svg";

class Entry extends React.Component {

  constructor(props) {
    super(props);

    let vehicle = store.getState().vehicles.find(vehicle => {
      return vehicle.id === props.id;
    });

    this.state = {
      id: vehicle.id,
      name: vehicle.name
    }

    this.getPosition = this.getPosition.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.unsubscribe = store.subscribe(() => {
      if (this._isMounted) {
        let vehicleToChange = store.getState().vehicles.find(vehicle => {
          return vehicle.id === this.state.id;
        });
        
        if (vehicleToChange === undefined) {
          return;
        }

        if (vehicleToChange.name !== this.state.name) {
          this.setState({
            name: vehicleToChange.name
          })
        }
      }
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.unsubscribe();
  }

  getPosition(id) {
    return store.getState().vehicles.find(vehicle => vehicle.id === id).position
  }

  render() {
    return (
      <div className="entry" onClick={() => {
        let position = this.getPosition(this.state.id);
        HandleCarClick({id: this.state.id, latlng: {lat: position.latitude, lng: position.longtitude}})
      }}>
        <div className="icon-container">
          <div className="icon-icon">
            <Car/>
          </div>
        </div>
        <div className="title-container">
          <div className="title-title">
            <div className="name">
              {this.state.name}
            </div>
            <LastUpdate id={this.state.id} />
          </div>
        </div>
        <div className="switch-container">
          <ShowVehicleSwitch id={this.state.id} />
        </div>
      </div>
    )
  }
}
export default Entry;
