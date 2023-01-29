import React from "react";
import Raw from "./Raw";
import { useRef,useState } from "react";
import ModalDialog from "./PopUpWindow";
import './Table.css'
import { Button } from "react-bootstrap";
import { saveAs } from 'file-saver';
import Card from "./Card"

const Table = () => {
  let count = false;
  let indexOfRaw;
  const [testSteps, settestSteps] = useState([]);
  //const modalRef=useRef();
  
  const updateTestSteps = (tableData) => {
    const newTableData = [...testSteps,tableData];
    console.log(newTableData);
    settestSteps(newTableData);
  };

   const editHandler = (editedTableData,index) => {
     const applyEditedData=[...testSteps]
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

  return (
    <div className="App">
      <div>
        <ModalDialog
          enableChainPopUps={true}
          editTestStep={testSteps[indexOfRaw]}
          title={[
            "group",
            "instruction",
            "command",
            "locator",
            "locatorParameter",
            "data",
            "swapResult",
            "branchSelection",
            "action",
            "comment",
          ]}
          noFields={[3, 7]}
          saveNewData={updateTestSteps}
          rawNumber={null}
        ></ModalDialog>
      </div>
      <div className="w-100">
        <table className="table table-dark table-bordered text-center table-striped">
          <thead>
          <tr>
              <th>Group</th>
              <th>Instruction</th>
              <th>Command</th>
              <th>Locator</th>
              <th>LocatorParameter</th>
              <th>Data</th>
              <th>SwapResult</th>
              <th>Branch Selection</th>
              <th>Action</th>
              <th>Comment</th>
              
            </tr>
          </thead>
          <tbody>
            {testSteps.map((testStep,index) => (
                  <Raw testStep={testStep} rawIndex={index} onDelete={deleteHandler} onEdit={editHandler} onArrowClick={arrowClickHandler}/>
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
