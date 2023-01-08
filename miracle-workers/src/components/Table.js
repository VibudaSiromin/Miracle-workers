import React from "react";
import Raw from "./Raw";
import { useState } from "react";
import ModalDialog from "./PopUpWindow";

const Table = () => {
  let count = false;
  let indexOfRaw=null;
  const [testSteps, settestSteps] = useState([]);
  
  const updateTestSteps = (tableData) => {
    const newTableData = [...testSteps,tableData];
    console.log(newTableData);
    settestSteps(newTableData);
  };

  const editHandler=(index) => {
    count=true;
    indexOfRaw=index;
    console.log(indexOfRaw);
  }

  // const testStepsData = [
  //     {
  //       group: "",
  //       instruction: "",
  //       command: "",
  //       locator: "",
  //       locatorParameter: "",
  //       data: "",
  //       swapResult: "",
  //       branchSelection: "",
  //       action: "",
  //       comment: "",
  //     },
  //   ];

  //   const [addFormData, setaddFormData] = useState({
  //     group: "",
  //     instruction: "",
  //     command: "",
  //     locator: "",
  //     locatorParameter: "",
  //     data: "",
  //     swapResult: "",
  //     branchSelection: "",
  //     action: "",
  //     comment: "",
  //   });

  //   const inputHandler = (event) => {
  //     event.preventDefault();

  //     const fieldName = event.target.getAttribute("name");
  //     const fieldValue = event.target.value;

  //     const newFormData = { ...addFormData };
  //     newFormData[fieldName] = fieldValue;

  //     setaddFormData(newFormData);
  //   };
  //   const [testSteps, settestSteps] = useState(testStepsData);

  //   const submitHandler = (event) => {
  //     event.preventDefault();
  //     console.log('fr')
  //     const newTestStep = {
  //       group: addFormData.group,
  //       instruction: addFormData.instruction,
  //       command: addFormData.command,
  //     };
  //     const newTestSteps = [...testSteps, newTestStep];

  //     settestSteps(newTestSteps);
  //     // console.log(testSteps);
  // }
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
        <table className="table table-bordered">
          <thead></thead>
          <tbody>
            {testSteps.map((testStep,index) => (
                  <Raw testStep={testStep} index={index}   isEditButtonClicked={editHandler}/>
            ))}
          </tbody>
        </table>
      </div>

      {/* <form onSubmit={submitHandler}>
        <input
          type="text"
          name="group"
          placeholder="Enter group"
          onChange={inputHandler}
        />
        <input
          type="text"
          name="instruction"
          placeholder="Enter instruction"
          onChange={inputHandler}
        />
        <input
          type="text"
          name="command"
          placeholder="Enter command"
          onChange={inputHandler}
        />
        <button type="submit">Submit</button>
      </form> */}
    </div>
  );
};

export default Table;
