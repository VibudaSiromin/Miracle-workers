import React from "react";
import Raw from "./Raw";
import { useState } from "react";
import ModalDialog from "./PopUpWindow";
import './Table.css'

const Table = () => {
  let count = false;
  let indexOfRaw=null;
  const [testSteps, settestSteps] = useState([]);
  
  const updateTestSteps = (tableData) => {
    const newTableData = [...testSteps,tableData];
    console.log(newTableData);
    settestSteps(newTableData);
  };

  

  const deleteHandler=(index) => {
    const tableDataAfterDelete=[...testSteps]
    tableDataAfterDelete.splice(index,1);
    settestSteps(tableDataAfterDelete);
  }

  return (
    <div className="App">
      <div>
        <ModalDialog
          enableChainPopUps={true}
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
                  <Raw testStep={testStep} index={index}   onDelete={deleteHandler}/>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
