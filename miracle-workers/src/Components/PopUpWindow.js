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

  const [formData,setformData]=useState('');

  let addFormDataHandler = (addFormData) => {
    setformData(addFormData);
  };

  const myLoop = () => {
    for (let i = 0; i < props.noFields[0]; i++) {
      inputFieldArrayModalOne.push(
        <PopUpInputField
          title={props.title[i]}
          inputType="text"
          onSaveAddFormData={addFormDataHandler}
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
            title={props.title[props.noFields[0] + i]}
            inputType="text"
            onSaveAddFormData={addFormDataHandler}
          ></PopUpInputField>
        );
      }
    }

  
  };
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

  const testStepsData = [
    {
      group: "",
      instruction: "",
      command: "",
      locator: "",
      locatorParameter: "",
      data: "",
      swapResult: "",
      branchSelection: "",
      action: "",
      comment: "",
    },
  ];

   const [testSteps, settestSteps] = useState(testStepsData);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log('Test Step');
    const addFormData = formData;
    console.log(addFormData);
    const newTestStep = {
      group: addFormData.group,
      instruction: addFormData.instruction,
      command: addFormData.command,
      locator: addFormData.locator,
      locatorParameter: addFormData.locatorParameter,
      data: addFormData.data,
      swapResult: addFormData.swapResult,
      branchSelection: addFormData.branchSelection,
      action: addFormData.action,
      comment: addFormData.comment,
    };
     const newTestSteps = [...testSteps, newTestStep];

     settestSteps(newTestSteps);
    props.saveNewData(newTestSteps);
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
          <Modal.Body>
            {inputFieldArrayModalOne}      
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={TerminateModalOne}>
              Close
            </Button>
            <Button variant="dark" onClick={NextStep}>
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
