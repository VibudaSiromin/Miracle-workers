import React from "react";
import { Modal, Button } from "react-bootstrap";
import EditPopUpInputField from "./EditPopUpInputField";
import EditPopUpSelection from "./EditPopUpSelection";
import { forwardRef,useImperativeHandle,useState} from "react";


function EditModalDialog(props,ref) {

  const [toggleOneModal, setToggleOneModal]  = React.useState(false);
  const [toggleTwoModal, setToggleTwoModal]  = React.useState(false);
  const [modalOneDataSet,setModalOneDataSet] = React.useState({});
  const [modalTwoDataSet,setModalTwoDataSet] = React.useState({});
  //const [editStatus,setEditStatus] = React.useState('false');

  
  console.log(props.raw);
  console.log("Ghost "+props.showState);
  let inputFieldArrayModalOne = [];
  let inputFieldArrayModalTwo = [];
  let btnValue;
  // const getEditTestStep=props.editTestStep;
  // console.log('car car car');
  // console.log(getEditTestStep);

  const testStepsData = {};
  const testStepsData2 = {};

  useImperativeHandle(ref,()=> ({
    log(){
      console.log('Roach');
      initModalOne();
    }
  }));

  // useImperativeHandle(ref,()=> ({
  //   log(){
  //     initModalOne();
  //     setEditStatus(true);
  //   }
  // }));

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
  
    console.log(testStepsData);
  };

  const inputHandler2 = (name, value) => {
    console.log(name, value);
    switch (name) {
      case "locator":
        testStepsData2[name] = value;
        break;
      case "locatorParameter":
        testStepsData2[name] = value;
        break;
      case "data":
        testStepsData2[name] = value;
        break;
      case "swapResult":
        testStepsData2[name] = value;
        break;
      case "branchSelection":
        testStepsData2[name] = value;
        break;
      case "action":
        testStepsData2[name] = value;
        break;
      case "comment":
        testStepsData2[name] = value;
        break;
    }
  
    console.log(testStepsData2);
  };

  const myLoop = () => {
    for (let i = 0; i < props.noFields[0]; i++) {
      if(props.title[i]!=='instruction' && props.title[i]!=='command' && props.title[i]!=='swapResult' && props.title[i]!=='action'){
        inputFieldArrayModalOne.push(
          <EditPopUpInputField
            id={i}
            //editStatus={editStatus}
            editTestStep={props.raw[props.title[i]]}
            title={props.title[i]}
            inputType="text"
            onDataChange={inputHandler}
          ></EditPopUpInputField>
        );
        console.log("Bye");
      }else{
         inputFieldArrayModalOne.push(
             <EditPopUpSelection
             id={i}
             //editStatus={editStatus}
             editTestStep={props.raw[props.title[i]]}
             title={props.title[i]}
             onDataChange={inputHandler}
             ></EditPopUpSelection>
         );
      }
      
    }
    if (props.enableChainPopUps) {
      console.log("hello koola");
      for (let i = 0; i < props.noFields[1]; i++) {
          if(props.title[props.noFields[0] + i]!=='instruction' && props.title[props.noFields[0] + i]!=='command' && props.title[props.noFields[0] + i]!=='swapResult' && props.title[props.noFields[0] + i]!=='action'){
            console.log("Hi");
            inputFieldArrayModalTwo.push(
              <EditPopUpInputField
                id={props.noFields[0] + i}
                //editStatus={editStatus}
                editTestStep={props.raw[props.title[props.noFields[0] + i]]}
                title={props.title[props.noFields[0] + i]}
                inputType="text"
                //onSaveAddFormData={addFormDataHandler}
                onDataChange2={inputHandler2}
              ></EditPopUpInputField>
            );
          }else{
             inputFieldArrayModalTwo.push(
               <EditPopUpSelection
               id={props.noFields[0] + i}
               //editStatus={editStatus}
               editTestStep={props.raw[props.title[props.noFields[0] + i]]}
               title={props.title[props.noFields[0] + i]}
               onDataChange2={inputHandler2}
               ></EditPopUpSelection>
            );
          }
   
      }
    }

  };
  
  console.log('eliye');

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
    console.log(testStepsData2)
    setModalTwoDataSet(Object.assign(modalOneDataSet,testStepsData2));
    return setToggleTwoModal(false);
  };

  const NextStep = () => {
    setModalOneDataSet(testStepsData);
    TerminateModalOne();
    if (props.enableChainPopUps) {
      setTimeout(() => {
        setToggleTwoModal(true);
      }, 400);
    }
  };
  console.log(modalOneDataSet);
  console.log('Samantha'+ modalOneDataSet);

  const ApplyBtnValue = () => {
    if (props.enableChainPopUps) {
      btnValue = "Next";
    } else {
      btnValue = "Finish";
    }
  };
  ApplyBtnValue();

  const submitHandlerOne = (event) => {
    event.preventDefault();
    if(props.enableChainPopUps===false){
    props.saveNewData(modalOneDataSet);
    TerminateModalOne();
    }
  };

  const submitHandlerTwo = (event) => {
    event.preventDefault();
    if(props.enableChainPopUps===true){
    props.saveNewData(modalTwoDataSet);
    TerminateModalOne();
    }
  };

  console.log('GAZ'+toggleOneModal);

  return (
    <>
      {/* <Button variant="success" onClick={initModalOne}>
        Add
      </Button> */}
      <form onSubmit={submitHandlerOne} id="myFormOne">
        <Modal show={toggleOneModal} tabIndex="-1">
          <Modal.Header closeButton onClick={TerminateModalOne}>
            <Modal.Title>Feed Data to Test</Modal.Title>
          </Modal.Header>
          <Modal.Body>{inputFieldArrayModalOne}</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={TerminateModalOne}>
              Close
            </Button>
            <Button variant="dark" onClick={NextStep} form="myFormOne" type="submit">
              {btnValue}
            </Button>
          </Modal.Footer>
        </Modal>
      </form>

      <form onSubmit={submitHandlerTwo} id="myFormTwo">
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
            form="myFormTwo"
            type="submit"
            variant="dark"
            onClick={TerminateModalTwo}
          >
            Finish
          </Button>
        </Modal.Footer>
      </Modal>
      </form>
    </>
  );
}
export default forwardRef(EditModalDialog);
