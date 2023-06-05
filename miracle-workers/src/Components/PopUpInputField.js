import { useState } from "react";
import Mapper from "./Mapper";
import { useDispatch } from "react-redux";

const PopUpInputField = (props) => {

    // let validation;
    // let error;

    // switch(props.title){
    //   case "group":
    //     validation=yup.string().required().min(3).max(10);
    //     break;
    // }
    const [fieldValue,setFieldValue]=useState({
      "group":"",
      "instruction":"",
      "command":"",
      "locator":"",
      "locatorParameter":"",
      "data":"",
      "swapResult":"",
      "branchSelection":"",
      "action":"",
      "comment":""     
    })

    const [error,setError]=useState({
      "group":null,
      "instruction":null,
      "command":null,
      "locator":null,
      "locatorParameter":null,
      "data":null,
      "swapResult":null,
      "branchSelection":null,
      "action":null,
      "comment":null  
    })
    const [referenceValue,setReferenceValue]=useState('');

    const inputHandler= (event) => {
      const fieldName = event.target.getAttribute("name");
      const fieldValue = event.target.value;
      console.log(fieldName);
      console.log(fieldValue);
      console.log('Input id: '+ props.id);
      console.log('generalPurpose: '+ props.generalPurpose);

      // try{
      //   const isValid=await validation.validate(fieldValue);
      //   console.log("valiiiiiiiiiii",isValid);
      //   // error=null;
      // }catch(err){
      //   error=err
      // }
      switch(props.title){
        case "group":
          setFieldValue({
            ...fieldValue,
            "group":fieldValue
          })
          break;
        case "instruction":
          setFieldValue({
            ...fieldValue,
            "instruction":fieldValue
          })
          break;
        case "command":
        case "locator":
        case "locatorParameter":
        case "data":
        case "swapResult":
        case "branchSelection":
        case "action":
        case "comment":
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

    const blurHandler=()=>{
      switch(props.title){
        case "group":
          // if(validation.group[0]==""){
          //   console.log("Group cannot be empty");
          // }
          console.log(fieldValue.group);
          if(fieldValue.group==""){
            setError({
              "group":"Field cannot be null"
            })
          }else{
            setError({
              ...error,
              "group":null
            })
          }
          break;
        case "instruction":
          console.log("AAAAAAAA");

          if(fieldValue.instruction==""){
            setError({
              "instruction":"Field cannot be null"
            })
          }else{
            setError({
              ...error,
              "instruction":null
            })
          }
          break;

        case "command":
        case "locator":
        case "locatorParameter":
        case "data":
        case "swapResult":
        case "branchSelection":
        case "action":
        case "comment":
    }
  }
  console.log(error);

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
            <input type={props.inputType} className="form-control" name={props.title}  onChange={inputHandler} onBlur={blurHandler}></input>
            {(error[props.title] ? <small className="text-danger">{error[props.title]}</small>:null)}
        </div>
    );
    }
    
}

export default PopUpInputField;