import React from "react";
import Entry from "./Entry/Entry";
import store from "../../../../store/store"
import "./VehicleList.scss"

class VehicleList extends React.Component {

  constructor(props) {
    super(props);
    
    this.renderEntries = this.renderEntries.bind(this);

    this.state = {
      ids: store.getState().vehicles.map(vehicle => {
        if (vehicle.displayEntry) {
          return vehicle.id;
        }
        else{
          return null;
        }
      })
    }
  }

  componentDidMount(){
    this._isMounted = true;
    this.unsubscribe = store.subscribe(() => {
      if (this._isMounted) {

        let newIds = [];
        store.getState().vehicles.map(vehicle => {
          if (vehicle.displayEntry) {
            newIds.push(vehicle.id);
          }
          return null;
        });
        
        let equalArrays = newIds.length === this.state.ids.length &&
          this.state.ids.every(id => {
            return newIds.includes(id);
          })
        
        if (!equalArrays) {
          this.setState({
            ids: newIds
          })
        }
      }
    });
  }

  componentWillUnmount(){
    this._isMounted = false;
    this.unsubscribe();
  }

  renderEntries() {
    let vehicles = store.getState().vehicles;
    if (vehicles.length > 0) {
      return (
        store.getState().vehicles.map(vehicle => {
          if (vehicle.displayEntry) {
            // TODO STORAGE data.state.vehicles.map(vehicle => {
            return <Entry
              key={vehicle.id}
              id={vehicle.id}
            />
          }
          else {
            return null;
          }
        })
      )
    } else {
      return (
        <div>
          No cars available. Try to refresh!
        </div>
      )
    }
    
  }

  render() {
    return (
      <div className="vehiclesList" style={!this.props.display ? {display: 'none'} : {}}>
        {this.renderEntries()}
      </div>
    )
  }

}
export default VehicleList;
