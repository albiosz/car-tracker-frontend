import React from "react";
import Select from 'react-select';
import "./InputSelect.scss";

const customStyles = {
    container: (provided, state) => ({
        ...provided,
        width: "100%"
    }),
    placeholder: (provided, state) => ({
        ...provided,
        color: "#636363"
    }),
    dropdownIndicator: (provided, state) => ({
        ...provided,
        color: "#636363"
    }),
    noOptionsMessage: (provided, state) => ({
        ...provided,
        color: "#636363"
    }),
    valueContainer: (provided, state) => ({
        ...provided,
        color: "#636363",
        margin: "7px"
    }),
    control: (provided, state) => ({
        ...provided,
        borderRadius: "11px",
        border: state.isFocused ? "1px solid #1976D2": "1px solid #A5A5A5",
        boxShadow: "none",
        '&:hover': {
            borderColor: '0 !important'
        }
    }),
    option: (provided, state) => ({
      ...provided,
      fontFamily: "bold 1em Arial, Helvetica, sans-serif",
      fontSize: "20px",
      fontWeight: state.isSelected ? "bold" : "normal",
      color: "#636363",
      backgroundColor: state.data.color
    }),
    singleValue: (provided, state) => ({
      ...provided,
      fontFamily: "bold 1em Arial, Helvetica, sans-serif",
      fontSize: "15px",
      fontWeight: state.isSelected ? "bold" : "normal",
      color: "#636363"
    }),
    menu: (provided, state) => ({
        ...provided,
        borderRadius: "11px",
        border: "1px solid #A5A5A5"
      })
  };

  const options = [
    { value: 'Car', label: 'Car' },
    { value: 'Mini Truck', label: 'Mini Truck' },
    { value: 'Suv', label: 'Suv' },
    { value: 'VAN', label: 'VAN' },
    { value: 'Big Truck', label: 'Big Truck' },
    { value: 'Pickup', label: 'Pickup' }
  ]

export default function ImputSelect(props) {
    const onChange = (value) => {
        props.onChange(value.value);
    }

    return(
        <div className="InputSelect-container">
            <div className="InputSelect-label-container">
                <p className="InputSelect-label-p">{props.label}</p>
            </div>
            <div className="InputSelect-input-container">
                <div className="InputSelect-input-in">
                    <Select value={props.value} placeholder={"Car"} options={options} styles={customStyles} onChange={onChange}/>
                </div>
            </div>
        </div>
        
    )
}