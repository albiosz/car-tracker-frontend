import React from "react";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import "./ShowListSwitch.scss";
import store from "../../../../store/store"

class ShowListSwitch extends React.Component {

  constructor(props) { 
    super(props);
    this.state = {
      checked: true
    }

    this.handleShowListSwitchChange = this.handleShowListSwitchChange.bind(this);
  }

  handleShowListSwitchChange() {
    let newState = !this.state.checked
    this.setState({
      checked: newState
    })
    store.dispatch({type: 'SHOW_LIST', showList: newState})
  }

  render() {
    let switchText = this.state.checked ? "Hide list" : "Show list";
    return (
      <div className="showListSwitch">
         <FormControlLabel control={
            <Switch checked={this.state.checked} onChange={this.handleShowListSwitchChange}/>
          } label={switchText}/>
      </div>
    )
  }
}
export default ShowListSwitch ;
