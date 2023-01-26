import { useState } from "react";

const PopUpInputField = (props) => {

    const inputHandler=(event) => {
      const fieldName = event.target.getAttribute("name");
      const fieldValue = event.target.value;
      console.log(fieldName);
      console.log(fieldValue);
      if(props.id<=2){
        props.onDataChange(fieldName,fieldValue);
      }else{
        props.onDataChange2(fieldName,fieldValue);
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