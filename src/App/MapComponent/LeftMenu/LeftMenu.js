import React from "react";
import VehicleList from "./VehicleList/VehicleList";
import SearchBar from "./SearchBar/SearchBar";
import ShowListSwitch from "./ShowListSwitch/ShowListSwitch"
import "./LeftMenu.scss";
import store from "../../../store/store"

class LeftMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showList: store.getState().showList,
      searchBar: "" 
    }
  }

  componentDidMount(){
    this._isMounted = true;
    this.unsubscribe = store.subscribe(() => {
      let updatedShowList = store.getState().showList
      if (this.state.showList !== updatedShowList)
      this.setState({
        showList: updatedShowList
      })
    })
  }

  componentWillUnmount(){
    this._isMounted = false;
    this.unsubscribe();
  }

  render() {
    return (
      <div className="leftMenu">
        <SearchBar display={this.state.showList}/>
        <VehicleList display={this.state.showList}/>
      </div>
    )
  }
}
export default LeftMenu;