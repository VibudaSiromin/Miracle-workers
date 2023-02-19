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
      console.log('Morrise',fieldName);
      console.log('Non Fat',props.generalPurpose);
    }

    useEffect(()=>{
        console.log("My data is", fieldValue);
        console.log("Field name is ", fieldName);
        console.log('Land Rover',props.id);
         if(props.id<=2 && props.generalPurpose===false){
           console.log('F22-Raptor');
           props.onDataChange(fieldName,fieldValue);
         }else if(props.id>2 && props.generalPurpose===false){
           console.log('B2-stealth Bomber');
           props.onDataChange2(fieldName,fieldValue);
         }if(props.generalPurpose===true){
           console.log('AK47');
          props.onDataChange(fieldName,fieldValue);
        }
    },[fieldValue]);

    if(changeState===false){
      console.log('Giya giya 1');
      if(props.id<=2 && props.generalPurpose===false){
        props.onDataChange(fieldName,fieldValue);
      }else if(props.id>2 && props.generalPurpose===false){
        props.onDataChange2(fieldName,fieldValue);
      }if(props.generalPurpose===true){
        console.log('fresh Milk:');
        props.onDataChange(fieldName,fieldValue);
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