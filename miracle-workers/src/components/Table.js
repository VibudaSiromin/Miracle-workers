import React from "react";
import Raw from "./Raw";
import { useRef,useState } from "react";
import ModalDialog from "./PopUpWindow";
import './Table.css'
import { Button } from "react-bootstrap";
import { saveAs } from 'file-saver';

const Table = () => {
  let count = false;
  let indexOfRaw;
  const [testSteps, settestSteps] = useState([]);
  const modalRef=useRef();
  
  const updateTestSteps = (tableData) => {
    const newTableData = [...testSteps,tableData];
    console.log(newTableData);
    settestSteps(newTableData);
  };

  const editHandler = (index) => {
    console.log("Hello");
    console.log(index);
    indexOfRaw=index;
    modalRef.current.log();
  }

  const jsonHandler=() => {
    // console.log(testSteps);
    const json = JSON.stringify(testSteps);
    saveAs(new Blob([json], { type: 'application/json;charset=utf-8' }), 'file.json');
  }

  const deleteHandler=(index) => {
    const tableDataAfterDelete=[...testSteps]
    console.log('Aiyo delete una');
    tableDataAfterDelete.splice(index,1);
    settestSteps(tableDataAfterDelete);
  }

  return (
    <div className="App">
      <div>
        <ModalDialog
          ref={modalRef}
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
          isEditButtonClicked={count}
          rawNumber={null}
        ></ModalDialog>
      </div>
      <div className="w-100">
        <table className="table table-bordered text-center">
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
                  <Raw testStep={testStep} index={index} onDelete={deleteHandler} onEdit={editHandler}/>
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
