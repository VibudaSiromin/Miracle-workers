import { useState,useEffect } from "react";
import Mapper from "./Mapper";
import { connect } from 'react-redux';
import axios from "axios";
import { useParams } from "react-router-dom";

const PopUpInputField =(props) => {

    const [fieldName,setFieldName] = useState('');
    const [fieldValue,setFieldValue]=useState('');
    const [isMount,setIsMount]  = useState(false);
    const [command,setCommand]  = useState(null);
    const [data,setData] = useState(null);
    const [isMountTwo,setIsMountTwo] = useState(false);
    const [list,setList] = useState([]);
    const [reportNormal,setReportNormal] = useState(false);
    const [whileEndLoopValue,setWhileEndLoopValue] = useState([]);
    const [launcherDetails,setLauncherDetails] = useState(null);

    const {lname,tname,cname,dname} =useParams();

    console.log('mySheet',props.dataSheetName);
    console.log('myCmd',props.command);
    console.log('myType',props.testType);

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
      console.log('TATA');
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


  useEffect(()=>{
    axios
    .get('http://localhost:5000/launcher/getLauncherContent',{
      params:{
                testPageName:tname+"M"
           }
    })
    .then((res)=>{
      const launcherDetails=res.data.getLauncherDetails;
      setLauncherDetails(launcherDetails);
      
    })
    .catch((err)=>{
      console.log(err);
    })
  },[tname])

    /////////////////////////Mapping part/////////////////
    const applyDataFieldValue = (sectionName,sheetName,heading,rawNumber,usage,loopName) => {

      if(sectionName==='data'){
          const dataValueReference=('#'+sectionName+'.'+sheetName+'.'+heading+'.'+rawNumber);
          setFieldValue(dataValueReference);
          setFieldName('data');
            
      }else if(sectionName==='locator'){
        const dataValueReference=('#'+sectionName+'.'+sheetName+'.'+heading+'.'+rawNumber);
        setFieldValue(dataValueReference);
        setFieldName('locator');
      }      
      //setReferenceValue(dataValueReference);
  }

  const applyLoopReferenceValue = (sectionName,sheetName,loopName) => {
    if(sectionName==='data'){
          const dataValueReference=('sheet:'+sheetName+'|'+'name:'+loopName);
          setFieldValue(dataValueReference);
          setFieldName('data'); 

    }
  }

  const applyDataValueFromSelector = (dataValue) => {
      console.log('optimus',dataValue);
      setFieldValue(dataValue);
      setFieldName('data'); 
  }

  const applyWhileEndValuesFromSelector = (dataValue) => {
      setFieldValue(dataValue);
      setFieldName('data'); 
  }

  useEffect(()=>{
    if(isMountTwo){
      if(command==='While.DataExists'){
        const parts = data.split(':');
        const loopName = parts[2];
        const dataPageName = parts[1].split('|')[0];
        console.log('stAr',loopName,dataPageName);

  

      }else if(command==="While.End"){
        setReportNormal(true);
      }else if(command==="While.Count"){
        setReportNormal(true);
      }

    }else{
      setIsMountTwo(true)
    }

  },[command])


    if(props.title==='data'){


      if(launcherDetails!==null && launcherDetails.type==='Sequential'){
      console.log('myCommand',props.command)
      if(props.command==="While.DataExists"){
        return(
          <div className="form-group">
              <label>{props.title}</label>
              <input type={props.inputType} className="form-control" name={props.title}  onChange={inputHandler} value={fieldValue}></input>
              <Mapper usage={'iteration-data'}  assignLoopRef={applyLoopReferenceValue} browseBtnId={'data'} URLForGettingSheets='http://localhost:5000/data/getDatasheets' URLForGettingHeadings='http://localhost:5000/data/datasheets/getHeadings' URLForGettingNoofRaws='http://localhost:5000/data/datasheets/getNoofRaws' reqDetailsforDB={['dataPageNames','dataPageName','getHeadings']}></Mapper>
          </div>
      );
      }else if(list.length!==0){
        return(
          <div className="form-group">
            <label>{props.title}</label>
            <select name="var-list" id="var-list" className="form-select" aria-label="Default select example" onChange={(event) => applyDataValueFromSelector(event.target.value)}>{list}</select>
          </div>
        )
      }else if(reportNormal){
        return(
          <div className="form-group">
          <label>{props.title}</label>
          <input type={props.inputType} className="form-control" name={props.title}  onChange={inputHandler}></input>
        </div>
        )
      }else if(props.command==="Report.Info"){ 
        axios
        .get('http://localhost:5000/testPages/getLoopName',{
           params:{
            testPageName:tname
          }
        })
        .then((res)=>{
          const command=res.data.command;
          const data=res.data.data;

          setCommand(command);
          setData(data);

        })
        .catch((err)=>{
          console.log(err);
        })
      }else if(whileEndLoopValue.length!==0){
        return(
          <div className="form-group">
            <label>{props.title}</label>
            <select name="loop-list" id="loop-list" className="form-select" aria-label="Default select example" onChange={(event)=>applyWhileEndValuesFromSelector(event.target.value)}>{whileEndLoopValue}</select>
          </div>
        )

      }else if(props.command==="While.End"){

        axios
        .get('http://localhost:5000/testPages/getAllLoopNames',{
           params:{
            testPageName:tname
          }
        })
        .then((res)=>{
          const loopArr=res.data.loopArray;
          console.log('myArr',loopArr);
          const loopOptionList = [];
          for(let i=0;i<loopArr.length;i++){
            loopOptionList.push(
              <option value={"name:"+loopArr[i]}>{"name:"+loopArr[i]}</option>
            )
          }
          setWhileEndLoopValue(loopOptionList);

        })
        .catch((err)=>{
          console.log(err);
        })
      }else{
        return(
          <div className="form-group">
            <label>{props.title}</label>
            <input type={props.inputType} className="form-control" name={props.title}  onChange={inputHandler} value={fieldValue}></input>
            <Mapper usage={'basic'}  selectedHeading={applyDataFieldValue} browseBtnId={'data'} URLForGettingSheets='http://localhost:5000/data/getDatasheets' URLForGettingHeadings='http://localhost:5000/data/datasheets/getHeadings' URLForGettingNoofRaws='http://localhost:5000/data/datasheets/getNoofRaws' reqDetailsforDB={['dataPageNames','dataPageName','getHeadings']}></Mapper>
          </div>
        )    
      }    
    }else if(launcherDetails!==null && launcherDetails.type==='Data Driven'){
      return(
        <div className="form-group">
            <label>{props.title}</label>
            <Mapper usage={'Data Driven'}  setSelectorValues={applyDataValueFromSelector} browseBtnId={'data'} dataSheetName={launcherDetails.dataSheet} URLForGettingHeadings='http://localhost:5000/data/datasheets/getHeadings'  reqDetailsforDB={['locatorsPageNames','locatorPageName','getHeadings']}></Mapper>
        </div>
    );
    }
    }else if(props.title==='locator'){
      return(
        <div className="form-group">
            <label>{props.title}</label>
            <input type={props.inputType} className="form-control" name={props.title}  onChange={inputHandler} value={fieldValue}></input>
            <Mapper usage={'basic'}  selectedHeading={applyDataFieldValue} browseBtnId={'locator'} URLForGettingSheets='http://localhost:5000/locators' URLForGettingHeadings='http://localhost:5000/locators/getHeadings' URLForGettingNoofRaws='http://localhost:5000/locators/getNoofRaws' reqDetailsforDB={['locatorsPageNames','locatorPageName','getHeadings']}></Mapper>
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

const mapStateToProps = (state) => {
  return{
    command: state.getCommand.command,
    testType: state.getTestType.testType,
    dataSheetName:state.getDataSheetName.dataSheet
  }
};


export default connect(mapStateToProps)(PopUpInputField);

//export default PopUpInputField;