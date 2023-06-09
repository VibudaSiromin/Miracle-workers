import { useState,useEffect } from "react";
import Mapper from "./Mapper";

const PopUpInputField = (props) => {

    const [fieldName,setFieldName] = useState('');
    const [fieldValue,setFieldValue]=useState('');
    const [isMount,setIsMount]  = useState(false);

    const inputHandler=(event) => {
      // const fieldName = event.target.getAttribute("name");
      // const fieldValue = event.target.value;
      // console.log(fieldName);
      // console.log(fieldValue);
      console.log('Input id: '+ props.id);
      console.log('generalPurpose: '+ props.generalPurpose);

      setFieldValue(event.target.value);
      setFieldName(event.target.getAttribute("name"));
      // if(props.id<=2 && props.generalPurpose===false){
      //   props.onDataChange(fieldName,fieldValue);
      // }else if(props.id>2 && props.generalPurpose===false){
      //   props.onDataChange2(fieldName,fieldValue);
      // }
      // if(props.generalPurpose===true){
      //   props.onDataChange(fieldName,fieldValue);
      // }
    }

    useEffect(()=>{
      if(isMount){
        if(props.id<=2 && props.generalPurpose===false){
          props.onDataChange(fieldName,fieldValue);
        }else if(props.id>2 && props.generalPurpose===false){
          props.onDataChange2(fieldName,fieldValue);
        }
        if(props.generalPurpose===true){
          props.onDataChange(fieldName,fieldValue);
        }
      }else{
        setIsMount(true);
      } 
  },[fieldValue]);

    /////////////////////////Mapping part/////////////////
    const applyDataFieldValue = (sectionName,sheetName,heading) => {

      if(sectionName==='data'){
        const dataValueReference=('#'+sectionName+'.'+sheetName+'.'+heading);
        setFieldValue(dataValueReference);
        setFieldName('data');
      }else if(sectionName==='locator'){
        const dataValueReference=('#'+sectionName+'.'+sheetName+'.'+heading);
        setFieldValue(dataValueReference);
        setFieldName('locator');
      }
      
      //setReferenceValue(dataValueReference);
  }

    console.log("Moon",props.title);
    if(props.title==='data'){
      return(
        <div className="form-group">
            <label>{props.title}</label>
            <input type={props.inputType} className="form-control" name={props.title}  onChange={inputHandler} value={fieldValue}></input>
            <Mapper selectedHeading={applyDataFieldValue} browseBtnId={'data'} URLForGettingSheets='http://localhost:5000/data/getDatasheets' URLForGettingHeadings='http://localhost:5000/data/datasheets/getHeadings' reqDetailsforDB={['dataPageNames','dataPageName','getHeadings']}></Mapper>
        </div>
    );
    }else if(props.title==='locator'){
      return(
        <div className="form-group">
            <label>{props.title}</label>
            <input type={props.inputType} className="form-control" name={props.title}  onChange={inputHandler} value={fieldValue}></input>
            <Mapper selectedHeading={applyDataFieldValue} browseBtnId={'locator'} URLForGettingSheets='http://localhost:5000/locators' URLForGettingHeadings='http://localhost:5000/locators/getHeadings' reqDetailsforDB={['locatorsPageNames','locatorPageName','getHeadings']}></Mapper>
        </div>
    );
    }else{
      return(
        <div className="form-group">
            <label>{props.title}</label>
            <input type={props.inputType} className="form-control" name={props.title}  onChange={inputHandler}></input>
        </div>
    );
    }
    
}

export default PopUpInputField;