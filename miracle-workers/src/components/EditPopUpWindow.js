import React from "react";
import { Modal, Button } from "react-bootstrap";
import EditPopUpInputField from "./EditPopUpInputField";
import EditPopUpSelection from "./EditPopUpSelection";
import { forwardRef,useImperativeHandle, useEffect,useRef,useState} from "react";
import axios from "axios";

function EditModalDialog(props,ref) {

  const [toggleOneModal, setToggleOneModal]  = React.useState(false);
  const [toggleTwoModal, setToggleTwoModal]  = React.useState(false);
  const [modalOneDataSet,setModalOneDataSet] = React.useState({});
  const [modalTwoDataSet,setModalTwoDataSet] = React.useState(props.raw);
  const [modalOneGeneralDataSet,setModalOneGeneralDataSet] = React.useState({});
  const [isMountModalOneGeneralDataSet,setIsMountModalOneGeneralDataSet]=React.useState(false);//Use for handle the unexpected behaviour
  const [isMountModalTwoDataSet,setIsmountModalTwoDataSet]=React.useState(false);//Use for handle the unexpected behaviour
  const [commandBasedFields,setCommandBasedFields]=useState([]);
  const [commandSet,setCommandSet]=useState([]);

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

  useEffect(() => {
    getCommands();
  }, []);

  const inputHandler = (name, value) => {
    console.log("ppppppppp",name, value);
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
    console.log("pppppppppp",testStepsData);
  };

  const getCommands= () => {
    axios
      .get("http://localhost:5000/settings/commands")
      .then((res) => {
        setCommandSet(res.data.settingItem); 
        console.log("gft");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCommands();
  }, []);

  useEffect(() => {
    console.log("aaaaaaaa",modalOneDataSet)
    let matchedBinaryValue;
    for(let i=0;i<commandSet.length;i++){
      console.log("bbbbbbb")
      if(commandSet[i].name==modalOneDataSet["command"]){
        matchedBinaryValue=commandSet[i].binaryValue;        ;
      }
    }
    console.log("hloo",matchedBinaryValue)
    switch(matchedBinaryValue){
      case "000":
        setCommandBasedFields(["swapResult","action","comment"]);
        break;
      case "001":
        setCommandBasedFields(["swapResult","branchSelection","action","comment"]);  
        break;
      case "010":
        setCommandBasedFields(["data","swapResult","action","comment"]);  
        break;
      case "011":
        setCommandBasedFields(["data","swapResult","branchSelection","action","comment"]);  
        break;
      case "100":
        setCommandBasedFields(["locator","locatorParameter","swapResult","action","comment"]);  
        break;
      case "101":
        setCommandBasedFields(["locator","locatorParameter","swapResult","branchSelection","action","comment"]);  
        break;
      case "110":
        setCommandBasedFields(["locator","locatorParameter","data","swapResult","action","comment"]);  
        break;
      case "111":
        setCommandBasedFields(["locator","locatorParameter","data","swapResult","branchSelection","action","comment"]);  
        break;

      default:
        setCommandBasedFields([]);
    }
  }, [modalOneDataSet["command"]]);

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
      for (let i = 0; i < commandBasedFields.length; i++) {
          if(commandBasedFields[i]!=='instruction' && commandBasedFields[i]!=='command' && commandBasedFields[i]!=='swapResult' && commandBasedFields[i]!=='action'){
            inputFieldArrayModalTwo.push(
              <EditPopUpInputField
                id={3+i}
                title={commandBasedFields[i]}
                inputType="text"
                generalPurpose={props.generalPurpose}
                onDataChange2={inputHandler2}
              ></EditPopUpInputField>
            );
          }else{
             inputFieldArrayModalTwo.push(
               <EditPopUpSelection
               id={3+i}
               title={commandBasedFields[i]}
               generalPurpose={props.generalPurpose}
               onDataChange2={inputHandler2}
               ></EditPopUpSelection>
            );
          }
   
      }
    }
    
    // if (props.enableChainPopUps) {
    //   for (let i = 0; i < props.noFields[1]; i++) {
    //       if(props.title[props.noFields[0] + i]!=='instruction' && props.title[props.noFields[0] + i]!=='command' && props.title[props.noFields[0] + i]!=='swapResult' && props.title[props.noFields[0] + i]!=='action'){
    //         inputFieldArrayModalTwo.push(
    //           <EditPopUpInputField
    //             id={props.noFields[0] + i}
    //             editTestStep={props.raw[props.title[props.noFields[0] + i]]}
    //             title={props.title[props.noFields[0] + i]}
    //             generalPurpose={props.generalPurpose}
    //             inputType="text"
    //             onDataChange2={inputHandler2}
    //           ></EditPopUpInputField>
    //         );
    //       }else{
    //          inputFieldArrayModalTwo.push(
    //            <EditPopUpSelection
    //            id={props.noFields[0] + i}
    //            editTestStep={props.raw[props.title[props.noFields[0] + i]]}
    //            generalPurpose={props.generalPurpose}
    //            title={props.title[props.noFields[0] + i]}
    //            onDataChange2={inputHandler2}
    //            ></EditPopUpSelection>
    //         );
    //       }
   
    //   }
    // }

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
