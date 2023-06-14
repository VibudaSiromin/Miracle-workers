import React ,{useEffect}from "react";
import { Modal, Button } from "react-bootstrap";
import PopUpInputField from "./PopUpInputField";
import PopUpSelection from "./PopUpSelection";
import {MdTableRows} from 'react-icons/md';
import { forwardRef,useImperativeHandle,useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Lan } from "@mui/icons-material";

function ModalDialog(props,ref) {
  const [toggleOneModal, setToggleOneModal]  = React.useState(false);
  const [toggleTwoModal, setToggleTwoModal]  = React.useState(false);
  const [modalOneDataSet,setModalOneDataSet] = React.useState({});
  const [modalTwoDataSet,setModalTwoDataSet] = React.useState({});
  const [modalOneGeneralDataSet,setModalOneGeneralDataSet] = React.useState({});
  const [editStatus,setEditStatus] = React.useState('false');
  const [commandBasedFields,setCommandBasedFields]=useState([[],""]);
  const [commandSet,setCommandSet]=useState([]);
  const [dataError,setDataError]=useState("");
  const [locatorError,setLocatorError]=useState("");
  const [branchError,setBranchError]=useState("");
  const [locNameErr,setLocNameErr]=useState("");
  const [locValue,setLocValue]=useState("");

  let inputFieldArrayModalOne = [];
  let inputFieldArrayModalTwo = [];
  let btnValue;
  const getEditTestStep=props.editTestStep;
  
  const testStepsData = {};
  const testStepsData2 = {};
  const generalPurposeInputData={};

  const {lname}=useParams();
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
        testStepsData[name] = value;
        break;
      case "instruction":
        testStepsData[name] = value;
        break;
      case "command":
        testStepsData[name] = value;
        break;
    }
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
    console.log("aaaaaaaa")
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
        setCommandBasedFields([["swapResult","action","comment"],"000"]);
        break;
      case "001":
        setCommandBasedFields([["swapResult","branchSelection","action","comment"],"001"]);  
        break;
      case "010":
        setCommandBasedFields([["data","swapResult","action","comment"],"010"]);  
        break;
      case "011":
        setCommandBasedFields([["data","swapResult","branchSelection","action","comment"],"011"]);  
        break;
      case "100":
        setCommandBasedFields([["locator","locatorParameter","swapResult","action","comment"],"100"]);  
        break;
      case "101":
        setCommandBasedFields([["locator","locatorParameter","swapResult","branchSelection","action","comment"],"101"]);  
        break;
      case "110":
        setCommandBasedFields([["locator","locatorParameter","data","swapResult","action","comment"],"110"]);  
        break;
      case "111":
        setCommandBasedFields([["locator","locatorParameter","data","swapResult","branchSelection","action","comment"],"111"]);  
        break;

      default:
        setCommandBasedFields([[],""]);
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
            locNameErr={locNameErr}
            locValue={locValue}
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
      for (let i = 0; i < commandBasedFields[0].length; i++) {
          if(commandBasedFields[0][i]!=='instruction' && commandBasedFields[0][i]!=='command' && commandBasedFields[0][i]!=='swapResult' && commandBasedFields[0][i]!=='action'){
            inputFieldArrayModalTwo.push(
              <PopUpInputField
                id={3+i}
                title={commandBasedFields[0][i]}
                inputType="text"
                generalPurpose={props.generalPurpose}
                onDataChange2={inputHandler2}
                dataError={dataError}
                locatorError={locatorError}
                branchError={branchError}
              ></PopUpInputField>
            );
          }else{
             inputFieldArrayModalTwo.push(
               <PopUpSelection
               id={3+i}
               title={commandBasedFields[0][i]}
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

  const closeModalTwo=()=>{
    return setToggleTwoModal(false);
  }
  const TerminateModalTwo = () => {
    setModalTwoDataSet(Object.assign(modalOneDataSet,testStepsData2));
    console.log(modalTwoDataSet)
    const {data,locator,branchSelection}=modalTwoDataSet;
    setDataError("");
    setLocatorError("");
    setBranchError("");
    switch(commandBasedFields[1]){
      case "001":
        if(branchSelection==undefined){
          setBranchError("Branch Selection cannot be empty");
          return;
        }
        // break;
      case "010":
        if(locator==undefined){
          setLocatorError("Locator cannot be empty");
          return;
        }
        // break;
      case "011":
        if(branchSelection==undefined){
          setBranchError("Branch Selection cannot be empty");

        }
        if(locator==undefined){
          setLocatorError("Locator cannot be empty");
        }
        break;
      case "100":
        if(data==undefined){
          setDataError("Data cannot be empty");
          return;
        }
        // break;
      case "101":
        if(data==undefined){
          setDataError("Data cannot be empty");
        }
        if(branchSelection==undefined){
          setBranchError("Branch Selection be empty");
        }
        break;
      case "110":
        if(data==undefined){
          setDataError("Data cannot be empty");
        }
        if(locator==undefined){
          setLocatorError("Locator cannot be empty");
        }
        break;
      case "111":
        if(data==undefined){
          setDataError("Data cannot be empty");
        }
        if(locator==undefined){
          setLocatorError("Locator cannot be empty");
        }
        if(branchSelection==undefined){
          setBranchError("Branch Selection be empty");
        }
        break;
    }
      // return setToggleTwoModal(false);
  };

  const NextStep = () => {
    if(props.generalPurpose===false){
      setModalOneDataSet(testStepsData);
    }
    if(props.generalPurpose===true){
      console.log('Next step',props.purpose);

      if(lname[0]==='L'){
        const {"Locator Name":name,"Locator Value":value}=generalPurposeInputData
        if(name===undefined){
          setModalOneGeneralDataSet({...modalOneGeneralDataSet,"Locator Value":value})
        }else if(value==undefined){
          setModalOneGeneralDataSet({...modalOneGeneralDataSet,"Locator Name":name})
        }else{
          setModalOneGeneralDataSet(generalPurposeInputData);
        }
        return;
      }
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
            setLocNameErr("");
            setLocValue("");
            console.log('fillData AX1');
            if(lname[0]==="L"){
                const {"Locator Name":name,"Locator Value":value}=modalOneGeneralDataSet
                console.log(modalOneGeneralDataSet)
                if(name===undefined){
                  setLocNameErr("Locator name cannot be empty")
                  console.log("aaaaa")
                }
                if(value===undefined){
                  setLocValue("Locator Value cannot be empty")
                  console.log("aaaaa")
                }
                if(name==undefined || name==="" || value===undefined|| value===""){
                  return;
                }
                console.log("eeee",name,value)
                props.saveNewGeneralData(modalOneGeneralDataSet);// calling from heading component
                setModalOneGeneralDataSet({})
            }
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
      if(dataError=="" && locatorError=="" && branchError==""){
        props.saveNewData(modalTwoDataSet);
        console.log("kkkkkkk")
        setToggleTwoModal(false)
      }

    }
  };

  return (
    <>
      <Button variant="success" onClick={initModalOne}>
        <MdTableRows></MdTableRows>
        {props.buttonValue}
      </Button>
        <Modal show={toggleOneModal} tabIndex="-1">
        <form onSubmit={submitHandlerOne} id={props.formID[0]}>
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
          </form>
        </Modal>

      <Modal show={toggleTwoModal} tabIndex="-1">
      <form onSubmit={submitHandlerTwo} id={props.formID[1]}>
        <Modal.Header closeButton onClick={TerminateModalTwo}>
          <Modal.Title>Feed Data to Test</Modal.Title>
        </Modal.Header>
        <Modal.Body>{inputFieldArrayModalTwo}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModalTwo}>
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
        </form>
      </Modal>
    </>
  );
}
export default forwardRef(ModalDialog);
