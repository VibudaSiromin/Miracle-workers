import { useState } from "react";
import Mapper from "./Mapper";
import * as yup from "yup";

const PopUpInputField = (props) => {

    let validation;
    let error;

    switch(props.title){
      case "group":
        validation=yup.string().required().min(3).max(10);
        break;
    }



    const [referenceValue,setReferenceValue]=useState('');

    const inputHandler=async (event) => {
      const fieldName = event.target.getAttribute("name");
      const fieldValue = event.target.value;
      console.log(fieldName);
      console.log(fieldValue);
      console.log('Input id: '+ props.id);
      console.log('generalPurpose: '+ props.generalPurpose);

      try{
        const isValid=await validation.validate(fieldValue);
        console.log("valiiiiiiiiiii",isValid);
        // error=null;
      }catch(err){
        error=err
      }

      if(props.id<=2 && props.generalPurpose===false){
        props.onDataChange(fieldName,fieldValue);
      }else if(props.id>2 && props.generalPurpose===false){
        props.onDataChange2(fieldName,fieldValue);
      }
      if(props.generalPurpose===true){
        props.onDataChange(fieldName,fieldValue);
      }
    }

    /////////////////////////Mapping part/////////////////
    const applyDataFieldValue = (sectionName,sheetName,heading) => {
      const dataValueReference=('#'+sectionName+'.'+sheetName+'.'+heading);
      console.log("DiamondHead",dataValueReference);
      setReferenceValue(dataValueReference);
  }

    console.log("Moon",props.title);

    if(props.title==='data'){
      return(
        <div className="form-group">
            <label>{props.title}</label>
            <input type={props.inputType} className="form-control" name={props.title}  onChange={inputHandler} value={referenceValue}></input>
            <Mapper selectedHeading={applyDataFieldValue} browseBtnId={'data'}></Mapper>
        </div>
    );
    }else{
      return(
        <div className="form-group">
            <label>{props.title}</label>
            <input type={props.inputType} className="form-control" name={props.title}  onChange={inputHandler}></input>
            {error?<small className="text-danger">{error}</small>:null}
        </div>
    );
    }
    
}

export default PopUpInputField;