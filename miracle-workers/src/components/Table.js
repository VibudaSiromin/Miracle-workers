import React from "react";
import Raw from "./Raw";
import { useEffect,useState } from "react";
import ModalDialog from "./PopUpWindow";
import './Table.css'
import { Button } from "react-bootstrap";
import { saveAs } from 'file-saver';
import Card from "./Card"
import {MdClose} from 'react-icons/md';
import Box from '@mui/material/Box';
import './TableV1.css' 

const Table = (props) => {
  let count = false;
  let indexOfRaw;
  let tableFields=[];
  const [testSteps, settestSteps] = useState([]);

  useEffect(() => {
    console.log('nissan ',props.initialData);
    settestSteps(props.initialData);
  }, [props.initialData]);
  
  const updateTestSteps = (tableData) => {
    const newTableData = [...testSteps,tableData];
    console.log(newTableData);
    settestSteps(newTableData);
  };

  const updateGeneralData = (tableData) => {
    console.log('Glock');
    const newTableData = [...testSteps,tableData];
    console.log('student ',newTableData);
    settestSteps(newTableData);
  };

   const editHandler = (editedTableData,index) => {
     const applyEditedData=[...testSteps];
     applyEditedData[index]=editedTableData;
     settestSteps(applyEditedData);
     console.log("Hello");
     console.log("index in table "+index);

   }

  const jsonHandler=() => {
    // console.log(testSteps);
    const json = JSON.stringify(testSteps);
    saveAs(new Blob([json], { type: 'application/json;charset=utf-8' }), 'file.json');
  }

  const deleteHandler=(index) => {
    const tableDataAfterDelete=[...testSteps];
    tableDataAfterDelete.splice(index,1);
    settestSteps(tableDataAfterDelete);
  }

  const arrowClickHandler=(upOrDown,rawIndex) => {
    const presentData=[...testSteps];
    const dataAfterArrowClick=[...testSteps];
    const numOfRaws=testSteps.length;
    console.log(numOfRaws);
    if(upOrDown===0 && rawIndex!==0){
      // console.log("move up",rawIndex,testStep);
      dataAfterArrowClick[rawIndex-1]=presentData[rawIndex];
      dataAfterArrowClick[rawIndex]=presentData[rawIndex-1];
      settestSteps(dataAfterArrowClick);
    }
    if(upOrDown===1 && rawIndex!==(numOfRaws-1)){
      // console.log("move down",rawIndex,testStep);
      dataAfterArrowClick[rawIndex]=presentData[rawIndex+1];
      dataAfterArrowClick[rawIndex+1]=presentData[rawIndex];
      settestSteps(dataAfterArrowClick);
    }   
  }

  const removeHeading = (headingIndex) => {
    const selectedHeading=props.title[headingIndex];
    let editedTestSteps=[];
    for(let i=0;i<testSteps.length;i++){
      console.log('Removing');
      const testStep=testSteps[i];
      delete testStep[selectedHeading];
      editedTestSteps.push(testStep);
    }
    props.dropHeading(headingIndex);
    console.log('After removing headings: ',props.title);
    console.log('cutter :: ',testSteps);
    settestSteps(editedTestSteps);
  }

  if(props.title.length!==0){
    console.log('Ajina Motto');
    if(props.removeHeading===true){
      props.title.map((heading,headingIndex)=>{
        tableFields.push(<th>{heading}<MdClose onClick={()=>removeHeading(headingIndex)}></MdClose></th>);
      });
    }else{
      for(let i=0;i<props.title.length;i++){
        tableFields.push(<th>{props.title[i]}</th>);
      }
    }
    
  }

  console.log('Willson');
  console.log('No of feilds: ',props.noFields);

  return (
    <div className="App">
      <div>
        <ModalDialog
          enableChainPopUps={props.enableChainPopUps}//false
          editTestStep={testSteps[indexOfRaw]}
          title={props.title}
          noFields={props.noFields}
          saveNewData={updateTestSteps}
          saveNewGeneralData={updateGeneralData}
          generalPurpose={props.generalPurpose}
          rawNumber={null}
          addingFields={false}
          buttonValue="Add"
          purpose="fillData"
          formID={["myFormTwoPart1", "myFormTwoPart2"]}
        ></ModalDialog>
      </div>
      <div className="version-01">
        <table className="table table-hover table-dark text-center table-striped">
          <thead>
          <tr>
              <th style={{width:"40px"}}></th>
              <th style={{width:"40px"}}></th>
              <th></th>
              {tableFields}
              
            </tr>
          </thead>
          <tbody>
            {testSteps.map((testStep,index) => (
                  <Raw testStep={testStep} rawIndex={index} onDelete={deleteHandler} onEdit={editHandler} onArrowClick={arrowClickHandler} title={props.title} generalPurpose={props.generalPurpose} enableChainPopUps={props.enableChainPopUps}/>
            ))}
          </tbody>
        </table>
      </div>
      <Button onClick={jsonHandler}>
              Generate JSON
      </Button>
      
    </div>
  );
};

export default Table;
