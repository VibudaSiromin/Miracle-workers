import React from "react";
import { Modal, Button } from "react-bootstrap";
import EditPopUpInputField from "./EditPopUpInputField";
import EditPopUpSelection from "./EditPopUpSelection";
import { forwardRef,useImperativeHandle, useEffect,useRef} from "react";


function EditModalDialog(props,ref) {

  const [toggleOneModal, setToggleOneModal]  = React.useState(false);
  const [toggleTwoModal, setToggleTwoModal]  = React.useState(false);
  const [modalOneDataSet,setModalOneDataSet] = React.useState({});
  const [modalTwoDataSet,setModalTwoDataSet] = React.useState(props.raw);
  
  
  console.log(props.raw);
  console.log("Ghost "+props.showState);
  let inputFieldArrayModalOne = [];
  let inputFieldArrayModalTwo = [];
  let btnValue;

  const testStepsData = {};
  const testStepsData2 = {};

  useImperativeHandle(ref,()=> ({
    log(){
      console.log('Roach');
      initModalOne();
    }
  }));


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
                editTestStep={props.raw[props.title[props.noFields[0] + i]]}
                title={props.title[props.noFields[0] + i]}
                inputType="text"
                onDataChange2={inputHandler2}
              ></EditPopUpInputField>
            );
          }else{
             inputFieldArrayModalTwo.push(
               <EditPopUpSelection
               id={props.noFields[0] + i}
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
    setModalTwoDataSet(Object.assign(modalOneDataSet,testStepsData2));
    console.log("Piyal");
    console.log(modalTwoDataSet);
    return setToggleTwoModal(false);
  };

  const NextStep = () => {
    setModalOneDataSet(testStepsData);
    console.log(modalOneDataSet);
    console.log('Samantha');
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

  const submitHandlerOne = (event) => {
    event.preventDefault();
    console.log('Prison Break');
    if(props.enableChainPopUps===false){
      props.onEdit(modalOneDataSet);
      TerminateModalOne();
    }
  };

  const submitHandlerTwo = (event) => {
    event.preventDefault();
    console.log('breaking bad');
    if(props.enableChainPopUps===true){
      TerminateModalOne();
    }
  };

  useEffect(()=>{
    console.log('santha santha');
    props.onEdit(modalTwoDataSet);
    console.log("Sia ");
    console.log(modalTwoDataSet);
     
},[modalTwoDataSet]);


  console.log('GAZ'+toggleOneModal);

  return (
    <>
      <form onSubmit={submitHandlerOne} id="myEditedFormOne">
        <Modal show={toggleOneModal} tabIndex="-1">
          <Modal.Header closeButton onClick={TerminateModalOne}>
            <Modal.Title>Feed Data to Test</Modal.Title>
          </Modal.Header>
          <Modal.Body>{inputFieldArrayModalOne}</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={TerminateModalOne}>
              Close
            </Button>
            <Button variant="dark" onClick={NextStep} form="myEditedFormOne" type="submit">
              {btnValue}
            </Button>
          </Modal.Footer>
        </Modal>
      </form>

      <form onSubmit={submitHandlerTwo} id="myEditedFormTwo">
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
            form="myEditedFormTwo"
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
