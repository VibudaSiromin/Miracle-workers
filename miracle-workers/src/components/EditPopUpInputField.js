import { useState,useEffect } from "react";

const PopUpInputField = (props) => {
    const [fieldName,setFieldName]=useState(props.title);
    const [fieldValue,setFieldValue]=useState(props.editTestStep);
    const [changeState,setChangeState]=useState(false);

    console.log('Griggs');
    const inputHandler=(event) => {
      setFieldValue(event.target.value);
      setFieldName(event.target.getAttribute("name"));
      setChangeState(true);
      console.log(fieldName);
      console.log('Miller'+fieldName);
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

    if(changeState===false){
      console.log('Giya giya 1');
      if(props.id<=2){
        props.onDataChange(fieldName,fieldValue);
      }else{
        props.onDataChange2(fieldName,fieldValue);
      }
    }

    return(
        <div className="form-group">
            <label>{props.title}</label>
            <input type={props.inputType} className="form-control" name={props.title}  value={fieldValue} onChange={inputHandler}></input>
        </div>
    );
}

export default PopUpInputField;