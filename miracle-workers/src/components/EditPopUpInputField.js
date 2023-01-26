import { useState,useEffect } from "react";

const PopUpInputField = (props) => {
    const [fieldName,setFieldName]=useState(' ');
    const [fieldValue,setFieldValue]=useState(props.editTestStep);

    console.log('Griggs');
    //let fieldName;
    const inputHandler=(event) => {
      setFieldValue(event.target.value);
      setFieldName(event.target.getAttribute("name"));
      //fieldName = event.target.getAttribute("name");
      //const fieldValue = event.target.value;
      console.log(fieldName);
      console.log('Miller'+fieldName);
      // if(props.id<=2){
      //   props.onDataChange(fieldName,fieldData);
      // }else{
      //   props.onDataChange2(fieldName,fieldData);
      // }
    }

    useEffect(()=>{
        console.log("My data is"+ fieldValue);
        console.log("Field name is "+fieldName);
         if(props.id<=2){
           props.onDataChange(fieldName,fieldValue);
         }else{
           props.onDataChange2(fieldName,fieldValue);
         }
    },[fieldValue]);

    return(
        <div className="form-group">
            <label>{props.title}</label>
            <input type={props.inputType} className="form-control" name={props.title}  value={fieldValue} onChange={inputHandler}></input>
        </div>
    );
}

export default PopUpInputField;