import React from "react";
import { Modal, Button } from "react-bootstrap";
import PopUpInputField from "./PopUpInputField";
import { useState } from "react";

// let isShow=false;
//let countRepetition=0;
function ModalDialog(props) {
  //const [isShow, invokeModal] = React.useState(false);
  const [toggleOneModal, setToggleOneModal] = React.useState(false);
  //let [countRepetition,setCountRepetition]=React.useState(0);
  const [toggleTwoModal, setToggleTwoModal] = React.useState(false);
  let inputFieldArrayModalOne = [];
  let inputFieldArrayModalTwo = [];
  let btnValue;

  const [formData, setformData] = useState("");
  
  const testStepsData = {};
  const testStepsData2 = ["", "", "", "", "", "", ""];

  // const [addFormData, setaddFormData] = useState({
  //     group:"",
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

  let addFormDataHandler = (addFormData) => {
    setformData(addFormData);
  };

  const inputHandler = (name, value) => {
    console.log(name, value);
    switch (name) {
      case "group":
        testStepsData[name] = value;
        break;
      case "instruction":
        testStepsData[name] = value;
        break;
      case "command":
        testStepsData[name] = value;
        break;
    }
    // const newTestStep = {

    // };
    console.log(testStepsData);
  };

  const inputHandler2 = (name, value) => {
    console.log(name, value);
    switch (name) {
      case "locator":
        testStepsData2[0] = value;
        break;
      case "locatorParameter":
        testStepsData2[1] = value;
        break;
      case "data":
        testStepsData2[2] = value;
        break;
      case "swapResult":
        testStepsData2[3] = value;
        break;
      case "branchSelection":
        testStepsData2[4] = value;
        break;
      case "action":
        testStepsData2[5] = value;
        break;
      case "comment":
        testStepsData2[6] = value;
        break;
    }
    // const newTestStep = {

    // };
    console.log(testStepsData2);
    
    const final = [
      testStepsData[0],
      testStepsData[1],
      testStepsData[2],
      testStepsData2[0],
      testStepsData2[1],
      testStepsData2[2],
      testStepsData2[3],
      testStepsData2[4],
      testStepsData2[5],
      testStepsData2[6],
    ];
    console.log(final);
  };

  const myLoop = () => {
    for (let i = 0; i < props.noFields[0]; i++) {
      inputFieldArrayModalOne.push(
        <PopUpInputField
          id={i}
          title={props.title[i]}
          inputType="text"
          onSaveAddFormData={addFormDataHandler}
          onDataChange={inputHandler}
        ></PopUpInputField>
      );
      console.log("Bye");
    }
    if (props.enableChainPopUps) {
      console.log("hello koola");
      for (let i = 0; i < props.noFields[1]; i++) {
        console.log("Hi");
        inputFieldArrayModalTwo.push(
          <PopUpInputField
            id={props.noFields[0] + i}
            title={props.title[props.noFields[0] + i]}
            inputType="text"
            onSaveAddFormData={addFormDataHandler}
            onDataChange2={inputHandler2}
          ></PopUpInputField>
        );
      }
    }

  };

  
    // const inputHandler = (event) => {

    //     event.preventDefault();

    //     const fieldName = event.target.getAttribute("name");
    //     const fieldValue = event.target.value;

    //     const newFormData = { ...addFormData };
    //     newFormData[fieldName] = fieldValue;
    //     console.log(newFormData);
    //     // setaddFormData(newFormData);
    //     props.onSaveAddFormData(newFormData);
    //     // console.log(addFormData);
    //   };

  myLoop();
  const initModalOne = () => {
    return setToggleOneModal(true);
  };
  const TerminateModalOne = () => {
    return setToggleOneModal(false);
  };
  const initModalTwo = () => {
    return setToggleTwoModal(true);
  };
  const TerminateModalTwo = () => {
    return setToggleTwoModal(false);
  };

  const NextStep = () => {
    TerminateModalOne();
    if (props.enableChainPopUps) {
      setTimeout(() => {
        setToggleTwoModal(true);
      }, 400);
    }
  };

  const ApplyBtnValue = () => {
    if (props.enableChainPopUps) {
      btnValue = "Next";
    } else {
      btnValue = "Finish";
    }
  };
  ApplyBtnValue();

  // const [testSteps, settestSteps] = useState();

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("Test Step");
    // const addFormData = testStepsData;
    console.log(testStepsData);
    // const newTestStep = {
    //   group: addFormData.group,
    //   instruction: addFormData.instruction,
    //   command: addFormData.command,
    //   locator: addFormData.locator,
    //   locatorParameter: addFormData.locatorParameter,
    //   data: addFormData.data,
    //   swapResult: addFormData.swapResult,
    //   branchSelection: addFormData.branchSelection,
    //   action: addFormData.action,
    //   comment: addFormData.comment,
    // };
    // const newTestSteps = [...testSteps, newTestStep];
    // console.log(newTestSteps);
    // settestSteps(newTestSteps);
    props.saveNewData(testStepsData);
    TerminateModalOne();
  };

  return (
    <>
      <Button variant="success" onClick={initModalOne}>
        Add
      </Button>
      <form onSubmit={submitHandler} id="myForm">
        <Modal show={toggleOneModal} tabIndex="-1">
          <Modal.Header closeButton onClick={TerminateModalOne}>
            <Modal.Title>Feed Data to Test</Modal.Title>
          </Modal.Header>
          <Modal.Body>{inputFieldArrayModalOne}</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={TerminateModalOne}>
              Close
            </Button>
            <Button variant="dark" /*onClick={NextStep}*/ form="myForm" type="submit">
              {btnValue}
            </Button>
          </Modal.Footer>
        </Modal>
      </form>

      <Modal show={toggleTwoModal} tabIndex="-1">
        <Modal.Header closeButton onClick={TerminateModalTwo}>
          <Modal.Title>Feed Data to Test</Modal.Title>
        </Modal.Header>
        <Modal.Body>{inputFieldArrayModalTwo}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={TerminateModalTwo}>
            Close
          </Button>
          <Button
            form="myForm"
            type="submit"
            variant="dark"
            onClick={TerminateModalTwo}
          >
            Finish
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalDialog;
