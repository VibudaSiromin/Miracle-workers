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
  const [modalOneGeneralDataSet,setModalOneGeneralDataSet] = React.useState({});
  const [isMountModalOneGeneralDataSet,setIsMountModalOneGeneralDataSet]=React.useState(false);//Use for handle the unexpected behaviour
  const [isMountModalTwoDataSet,setIsmountModalTwoDataSet]=React.useState(false);//Use for handle the unexpected behaviour

  console.log(props.raw);
  console.log("Ghost "+props.showState);
  let inputFieldArrayModalOne = [];
  let inputFieldArrayModalTwo = [];
  let btnValue;

  const testStepsData = {};
  const testStepsData2 = {};
  const generalPurposeInputData={};

  useImperativeHandle(ref,()=> ({
    log(){
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

  const inputHandler3 = (name,value) => {
    generalPurposeInputData[name]=value;
    console.log('inputHandler3 edit', generalPurposeInputData);
  }

  const myLoop = () => {
    for (let i = 0; i < props.title.length; i++) {//This code should be refined!works fine for now
      if(props.title[i]!=='instruction' && props.title[i]!=='command' && props.title[i]!=='swapResult' && props.title[i]!=='action' && props.generalPurpose===false && i<props.noFields[0]){
        inputFieldArrayModalOne.push(
          <EditPopUpInputField
            id={i}
            editTestStep={props.raw[props.title[i]]}
            title={props.title[i]}
            inputType="text"
            generalPurpose={props.generalPurpose}
            onDataChange={inputHandler}
          ></EditPopUpInputField>
        );
      }else if(props.generalPurpose===true){//section for all general purpose data inputs such as data section,login,locator section ect...
        inputFieldArrayModalOne.push(
          <EditPopUpInputField
            id={i}
            editTestStep={props.raw[props.title[i]]}
            title={props.title[i]}
            inputType="text"
            generalPurpose={props.generalPurpose}
            onDataChange={inputHandler3}
          ></EditPopUpInputField>
        );  
      }
      else if(props.generalPurpose===false && i<props.noFields[0]){
         inputFieldArrayModalOne.push(
             <EditPopUpSelection
             id={i}
             editTestStep={props.raw[props.title[i]]}
             title={props.title[i]}
             generalPurpose={props.generalPurpose}
             onDataChange={inputHandler}
             ></EditPopUpSelection>
         );
      }
      
    }

    
    if (props.enableChainPopUps) {
      for (let i = 0; i < props.noFields[1]; i++) {
          if(props.title[props.noFields[0] + i]!=='instruction' && props.title[props.noFields[0] + i]!=='command' && props.title[props.noFields[0] + i]!=='swapResult' && props.title[props.noFields[0] + i]!=='action'){
            inputFieldArrayModalTwo.push(
              <EditPopUpInputField
                id={props.noFields[0] + i}
                editTestStep={props.raw[props.title[props.noFields[0] + i]]}
                title={props.title[props.noFields[0] + i]}
                generalPurpose={props.generalPurpose}
                inputType="text"
                onDataChange2={inputHandler2}
              ></EditPopUpInputField>
            );
          }else{
             inputFieldArrayModalTwo.push(
               <EditPopUpSelection
               id={props.noFields[0] + i}
               editTestStep={props.raw[props.title[props.noFields[0] + i]]}
               generalPurpose={props.generalPurpose}
               title={props.title[props.noFields[0] + i]}
               onDataChange2={inputHandler2}
               ></EditPopUpSelection>
            );
          }
   
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
    setModalTwoDataSet(Object.assign(modalOneDataSet,testStepsData2));
    console.log(modalTwoDataSet);
    return setToggleTwoModal(false);
  };

  const NextStep = () => {
    if(props.generalPurpose===false){
      setModalOneDataSet(testStepsData);
    }
    if(props.generalPurpose===true){
      setModalOneGeneralDataSet(generalPurposeInputData);
      console.log('Go Live!!! ',generalPurposeInputData);
    }
    console.log(modalOneDataSet);
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
    if(props.enableChainPopUps===false){
      if(props.generalPurpose===false){
        console.log('University',modalOneDataSet);
        props.onEdit(modalOneDataSet);
      }
      
      TerminateModalOne();
    }
  };

  const submitHandlerTwo = (event) => {
    event.preventDefault();
    if(props.enableChainPopUps===true){
      TerminateModalOne();
    }
  };

  useEffect(()=>{
    if(isMountModalOneGeneralDataSet){
      if(props.enableChainPopUps===false && props.generalPurpose===true){
        console.log('modalOneGeneralDataSet',modalOneGeneralDataSet);
        props.onEdit(modalOneGeneralDataSet);
      }
    }else{
      setIsMountModalOneGeneralDataSet(true);
    }
    
},[modalOneGeneralDataSet]);

  useEffect(()=>{
    if(isMountModalTwoDataSet){
      console.log('modalTwoDataSet',modalTwoDataSet);
      props.onEdit(modalTwoDataSet);
      console.log(modalTwoDataSet);
    }else{
      setIsmountModalTwoDataSet(true);
    }
   
     
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
