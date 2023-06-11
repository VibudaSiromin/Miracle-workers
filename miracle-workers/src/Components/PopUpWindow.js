import React ,{useEffect}from "react";
import { Modal, Button } from "react-bootstrap";
import PopUpInputField from "./PopUpInputField";
import PopUpSelection from "./PopUpSelection";
import {MdTableRows} from 'react-icons/md';
import { forwardRef,useImperativeHandle,useState } from "react";
import axios from "axios";

function ModalDialog(props,ref) {
  const [toggleOneModal, setToggleOneModal]  = React.useState(false);
  const [toggleTwoModal, setToggleTwoModal]  = React.useState(false);
  const [modalOneDataSet,setModalOneDataSet] = React.useState({});
  const [modalTwoDataSet,setModalTwoDataSet] = React.useState({});
  const [modalOneGeneralDataSet,setModalOneGeneralDataSet] = React.useState({});
  const [editStatus,setEditStatus] = React.useState('false');
  const [commandBasedFields,setCommandBasedFields]=useState([]);
  const [commandSet,setCommandSet]=useState([]);


  let inputFieldArrayModalOne = [];
  let inputFieldArrayModalTwo = [];
  let btnValue;
  const getEditTestStep=props.editTestStep;
  
  const testStepsData = {};
  const testStepsData2 = {};
  const generalPurposeInputData={};

  const [testSteps,setTestSteps]=useState({
    "group":"",
    "instruction":"",
    "command":""
  });
  // useImperativeHandle(ref,()=> ({
  //   log(){
  //     initModalOne();
  //     setEditStatus(true);
  //   }
  // }));

  const inputHandler = (name, value) => {
    console.log("ppppppppp",name, value);
    switch (name) {
      case "group":
        setTestSteps({...testSteps,[name]:value});
        break;
      case "instruction":
        setTestSteps({...testSteps,[name]:value});
        break;
      case "command":
        setTestSteps({...testSteps,[name]:value});
        break;
    }
    console.log("pppppppppp",testSteps);
  };

  // const inputHandler = (name, value) => {
  //   console.log(name, value);
  //   switch (name) {
  //     case "group":
  //       testStepsData[name] = value;
  //       break;
  //     case "instruction":
  //       testStepsData[name] = value;
  //       break;
  //     case "command":
  //       testStepsData[name] = value;
  //       break;
  //   }
  //   console.log(testStepsData);
  // };
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
    let matchedBinaryValue;
    for(let i=0;i<commandSet.length;i++){
      if(commandSet[i].name==testSteps["command"]){
        matchedBinaryValue=commandSet[i].matchedBinary;
        return;
      }
    }

    switch(matchedBinaryValue){
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
    // switch(testSteps["command"]){
    //   case "Branch.BasedOnData":
    //     setCommandBasedFields(["locator","locatorParameter","action","comment"]);  
    //     break;
    //   case "Branch.OnElementAttribute":
    //     setCommandBasedFields(["action","comment"]);  
    //     break;
    //   default:
    //     setCommandBasedFields([]);
    // }
    // console.log("ppppppppppp",commandBasedFields);
  }, [testSteps["command"]]);



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
  
    console.log("ppppppppppp",testStepsData2);
  };

  const inputHandler3 = (name,value) => {
      console.log('inputHandler3: '+name,value);
      generalPurposeInputData[name]=value;
      console.log('inputHandler3:',props.purpose);
  }

  const myLoop = () => {
    for (let i = 0; i < props.noFields[0]; i++) {
      if(props.title[i]!=='instruction' && props.title[i]!=='command' && props.title[i]!=='swapResult' && props.title[i]!=='action' && props.generalPurpose===false){
        inputFieldArrayModalOne.push(
          <PopUpInputField
            id={i}
            title={props.title[i]}
            inputType="text"
            generalPurpose={props.generalPurpose}
            onDataChange={inputHandler}
          ></PopUpInputField>
        );
      }else if(props.generalPurpose===true){//section for all general purpose data inputs such as data section,login,locator section ect...
        console.log('jazz ',props.title);
        console.log('jazz weke');
        inputFieldArrayModalOne.push(
          <PopUpInputField
            id={i}
            title={props.title[i]}
            inputType="text"
            generalPurpose={props.generalPurpose}
            onDataChange={inputHandler3}
          ></PopUpInputField>
        ); 
        
      }else if(props.generalPurpose===false){
         inputFieldArrayModalOne.push(
             <PopUpSelection
             id={i}
             title={props.title[i]}
             generalPurpose={props.generalPurpose}
             onDataChange={inputHandler}
             ></PopUpSelection>
         );
      }
      
    }
    if (props.enableChainPopUps) {
      for (let i = 0; i < commandBasedFields.length; i++) {
          if(commandBasedFields[i]!=='instruction' && commandBasedFields[i]!=='command' && commandBasedFields[i]!=='swapResult' && commandBasedFields[i]!=='action'){
            inputFieldArrayModalTwo.push(
              <PopUpInputField
                id={3+i}
                title={commandBasedFields[i]}
                inputType="text"
                generalPurpose={props.generalPurpose}
                onDataChange2={inputHandler2}
              ></PopUpInputField>
            );
          }else{
             inputFieldArrayModalTwo.push(
               <PopUpSelection
               id={3+i}
               title={commandBasedFields[i]}
               generalPurpose={props.generalPurpose}
               onDataChange2={inputHandler2}
               ></PopUpSelection>
            );
          }
   
      }
    }
    // if (props.enableChainPopUps) {
    //   for (let i = 0; i < props.noFields[1]; i++) {
    //       if(props.title[props.noFields[0] + i]!=='instruction' && props.title[props.noFields[0] + i]!=='command' && props.title[props.noFields[0] + i]!=='swapResult' && props.title[props.noFields[0] + i]!=='action'){
    //         inputFieldArrayModalTwo.push(
    //           <PopUpInputField
    //             id={props.noFields[0] + i}
    //             title={props.title[props.noFields[0] + i]}
    //             inputType="text"
    //             generalPurpose={props.generalPurpose}
    //             onDataChange2={inputHandler2}
    //           ></PopUpInputField>
    //         );
    //       }else{
    //          inputFieldArrayModalTwo.push(
    //            <PopUpSelection
    //            id={props.noFields[0] + i}
    //            title={props.title[props.noFields[0] + i]}
    //            generalPurpose={props.generalPurpose}
    //            onDataChange2={inputHandler2}
    //            ></PopUpSelection>
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
    console.log(testStepsData2)
    setModalTwoDataSet(Object.assign(modalOneDataSet,testStepsData2));
    return setToggleTwoModal(false);
  };

  const NextStep = () => {
    if(props.generalPurpose===false){
      // setModalOneDataSet(testStepsData);
      setModalOneDataSet(testSteps);
    }
    if(props.generalPurpose===true){
      console.log('Next step',props.purpose);
      setModalOneGeneralDataSet(generalPurposeInputData);
    }
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
          props.saveNewData(modalOneDataSet);
        }
        if(props.generalPurpose===true){
          if(props.purpose==='fillData'){
            console.log('fillData AX1');
            props.saveNewGeneralData(modalOneGeneralDataSet);// calling from heading component
          }
          if(props.purpose==='addHeading'){
            console.log('triple H')
            props.saveNewHeadingData(modalOneGeneralDataSet);
          }          
        }
        

    TerminateModalOne();
    }
  };

  const submitHandlerTwo = (event) => {
    event.preventDefault();
    if(props.enableChainPopUps===true){
    props.saveNewData(modalTwoDataSet);
    TerminateModalOne();
    }
    setTestSteps({
      "group":"",
      "instruction":"",
      "command":""
    })
  };

  return (
    <>
      <Button variant="success" onClick={initModalOne}>
        <MdTableRows></MdTableRows>
        {props.buttonValue}
      </Button>
      <form onSubmit={submitHandlerOne} id={props.formID[0]}>
        <Modal show={toggleOneModal} tabIndex="-1">
          <Modal.Header closeButton onClick={TerminateModalOne}>
            <Modal.Title>Feed Data to Test</Modal.Title>
          </Modal.Header>
          <Modal.Body>{inputFieldArrayModalOne}</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={TerminateModalOne}>
              Close
            </Button>
            <Button variant="dark" onClick={NextStep} form={props.formID[0]} type="submit">
              {btnValue}
            </Button>
          </Modal.Footer>
        </Modal>
      </form>

      <form onSubmit={submitHandlerTwo} id={props.formID[1]}>
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
            form={props.formID[1]}
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
export default forwardRef(ModalDialog);
