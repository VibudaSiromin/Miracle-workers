import { useState } from "react";
import Mapper from "./Mapper";
import { useDispatch } from "react-redux";

const PopUpInputField = (props) => {

    const [referenceValue,setReferenceValue]=useState('');
    let error;
    const inputHandler= (event) => {
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


    /////////////////////////Mapping part/////////////////
    const applyDataFieldValue = (sectionName,sheetName,heading) => {
      const dataValueReference=('#'+sectionName+'.'+sheetName+'.'+heading);
      console.log("DiamondHead",dataValueReference);
      setReferenceValue(dataValueReference);
  }

    console.log("Moon",props.errors);

    if(props.title==='data'){
      return(
        <div className="form-group">
            <label>{props.title}</label>
            <input type={props.inputType} className="form-control" name={props.title}  onChange={inputHandler} value={referenceValue}></input>
            <Mapper selectedHeading={applyDataFieldValue} browseBtnId={'data'}></Mapper>
          
            <div><small className="text-danger">{props.dataError}</small></div>
        </div>
    );
    }else{
      return(
        <div className="form-group">
            <label>{props.title}</label>
            <input type={props.inputType} className="form-control" name={props.title}  onChange={inputHandler}></input>

            {props.title=='Locator Name'
            ?<small className="text-danger">{props.locNameErr}</small>:null
            }
            {props.title=='Locator Value'
            ?<small className="text-danger">{props.locValue}</small>:null
            }
            {props.title=='locator'
            ?<small className="text-danger">{props.locatorError}</small>:null
            }
            {props.title=='branchSelection'
            ?<small className="text-danger">{props.branchError}</small>:null
            }
        </div>
    );
    }
    
}

export default PopUpInputField;