import "../../FormPage/FormPage.scss"
import "./Record.scss"

export default function Record(props) {

  return (
    <div className="Record-container">
      <p className="Record-label-p">{props.label} </p>
      <div className="Record-data-container">
        <div className="Record-data-box"> 
          {props.data}
        </div>
      </div>
    </div>
  )
}