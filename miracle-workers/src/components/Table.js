import React from "react";
import Raw from "./Raw";
import { useRef,useState } from "react";
import ModalDialog from "./PopUpWindow";
import './Table.css'
import { Button } from "react-bootstrap";
import { saveAs } from 'file-saver';
import Card from "./Card"
import './TableV1.css' 

const Table = (props) => {
  let count = false;
  let indexOfRaw;
  let tableFields=[];
  const [testSteps, settestSteps] = useState([]);
  //const modalRef=useRef();
  
  const updateTestSteps = (tableData) => {
    console.log('liquid death');
    const newTableData = [...testSteps,tableData];
    console.log(newTableData);
    settestSteps(newTableData);
  };

  const updateGeneralData = (tableData) => {
    console.log('Glock');
    const newTableData = [...testSteps,tableData];
    console.log(newTableData);
    settestSteps(newTableData);
  };

   const editHandler = (editedTableData,index) => {
     const applyEditedData=[...testSteps];
     console.log('Oxford',editedTableData,'index is ',index);
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
    console.log('Aiyo delete una');
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

  if(props.title.length!==0){
    console.log('Ajina Motto');
    for(let i=0;i<props.title.length;i++){
      tableFields.push(<th>{props.title[i]}</th>);
    }
  }

  console.log('Willson',props.purpose);

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
        <table className="table table-dark table-bordered text-center table-striped">
          <thead>
          <tr>
              <th></th>
              <th></th>
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
