import React from "react";
import Entry from "./Entry/Entry";
import store from "../../../../store/store";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./VehicleList.scss"

class VehicleList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      ids: store.getState().vehicles.map(vehicle => {
        if (vehicle.displayEntry) {
          return vehicle.id;
        }
        else{
          return null;
        }
      }),
      vehicles: store.getState().vehicles
    }

    this.renderEntries = this.renderEntries.bind(this);
    this.handleOnDragEnd = this.handleOnDragEnd.bind(this);
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
            ids: newIds,
            vehicles: store.getState().vehicles
          })
        }
      }
    });
  }

  componentWillUnmount(){
    this._isMounted = false;
    this.unsubscribe();
  }

  handleOnDragEnd(result) {
    const items = Array.from(this.state.vehicles);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    this.setState({
      vehicles: items
    })
  }

  renderEntries() {
    if (this.state.vehicles.length > 0) {
      return (
        this.state.vehicles.map((vehicle, index) => {
          if (vehicle.displayEntry) {
            // TODO STORAGE data.state.vehicles.map(vehicle => {
            return (
              <Draggable key={vehicle.id} draggableId={String(vehicle.id)} index={index}>
                {provided => (
                  <div className="entryVehicleList" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <Entry
                      key={vehicle.id}
                      id={vehicle.id}
                    />
                  </div>
                )}
              </Draggable>
            )
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
      <DragDropContext onDragEnd={this.handleOnDragEnd}>
        <Droppable droppableId="vehicles">
          {(provided) => (
            <div className="vehiclesList" style={!this.props.display ? {display: 'none'} : {}} {...provided.droppableProps} ref={provided.innerRef}>
              {this.renderEntries()}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
  }

}
export default VehicleList;
