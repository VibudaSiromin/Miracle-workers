import { useState } from "react";

const PopUpInputField = (props) => {

    const inputHandler=(event) => {
      const fieldName = event.target.getAttribute("name");
      const fieldValue = event.target.value;
      console.log(fieldName);
      console.log(fieldValue);
      console.log('Input id: '+ props.id);
      console.log('generalPurpose: '+ props.generalPurpose);
      if(props.id<=2 && props.generalPurpose===false){
        props.onDataChange(fieldName,fieldValue);
      }else if(props.id>2 && props.generalPurpose===false){
        props.onDataChange2(fieldName,fieldValue);
      }
      if(props.generalPurpose===true){
        props.onDataChange(fieldName,fieldValue);
      }
    }

    return(
        <div className="form-group">
            <label>{props.title}</label>
            <input type={props.inputType} className="form-control" name={props.title}  onChange={inputHandler}></input>
        </div>
    );
}

export default PopUpInputField;