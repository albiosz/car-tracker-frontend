import React from "react";
import TextField from "@mui/material/TextField";
import store from "../../../../store/store";
import "./SearchBar.scss"


class SearchBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      textField: ""
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this._isMounted = true;
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  handleChange(event) {
    this.setState({
      textField: event.target.value
    })

    let regEx;
    try {
      regEx = new RegExp(event.target.value);
    } catch {
      regEx = new RegExp("$a");
    } 
    
    let refreshedVehicles = store.getState().vehicles.map(vehicle => {
      vehicle.displayEntry = regEx.test(vehicle.name);
      
      return vehicle;
    })

    store.dispatch({type: "REFREASH_VEHICLES", vehicles: refreshedVehicles});
    store.dispatch({type: 'CHANGE_REFRESH_VIEW', refreshCentering: true});
  }

  render() {
    return (
      <div className="searchBar" style={!this.props.display ? {display: 'none'} : {}}>
        <TextField fullWidth label="Search by name" id="searchBar" value={this.state.textField} onChange={this.handleChange}/>
      </div>
    )
  }

}
export default SearchBar;
