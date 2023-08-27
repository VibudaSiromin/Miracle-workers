import React from "react";
import { Modal, Button } from "react-bootstrap";
import EditPopUpInputField from "./EditPopUpInputField";
import EditPopUpSelection from "./EditPopUpSelection";
import { forwardRef,useImperativeHandle, useEffect,useState,useReducer} from "react";
import { useDispatch } from "react-redux";
import commandArray from '../assets/commands';
import { setEditModalOneData } from "../store";
import { setEditModalTwoData } from "../store";
import { connect } from "react-redux";
import { validationSetOne } from '../assets/validation/validationSetOne';
import { validationSetTwo } from '../assets/validation/validationSetTwo';
import { validationSetThree } from '../assets/validation/validationSetThree';
import { validationSetFour } from '../assets/validation/validationSetFour';
import { validationSetFive } from '../assets/validation/validationSetFive';
import { validationSetSix } from '../assets/validation/validationSetSix';
import { useSelector } from "react-redux";

const modalOneDataSet2 = {
  group: '',
  instruction: '',
  command: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CLEAR':
      return { ...state, group: '', instruction: '', command: '' };
    case 'CHANGE_GROUP':
      return { ...state, group: action.payload };
    case 'CHANGE_INSTRUCTION':
      return { ...state, instruction: action.payload };
    case 'CHANGE_COMMAND':
      return { ...state, command: action.payload };
    case 'RE_RENDER':
      return { ...state };
    default:
      return { ...state };
  }
};

const modalTwoDataSetValOne = {
  data:'',
  branchSelection:''
}

const valOneReducer = (state, action) => {//validationSetOne
  switch (action.type) {
    case 'CLEAR':
      return { ...state, data: '', branchSelection: ''};
    case 'CHANGE_DATA':
      return { ...state, data: action.payload };
    case 'CHANGE_BRANCH_SELECTION':
      return { ...state, branchSelection: action.payload };
    case 'RE_RENDER':
      return { ...state };
    default:
      return { ...state };
  }
};



const modalTwoDataSetValTwo = {
  locator:'',
  data:'',
  branchSelection:''
}

const valTwoReducer = (state, action) => {//validationSetTwo
  switch (action.type) {
    case 'CLEAR':
      return { ...state, locator:'',data: '', branchSelection: ''};
    case 'CHANGE_LOCATOR':
      return { ...state, locator: action.payload };
    case 'CHANGE_DATA':
      return { ...state, data: action.payload };
    case 'CHANGE_BRANCH_SELECTION':
      return { ...state, branchSelection: action.payload };
    case 'RE_RENDER':
      return { ...state };
    default:
      return { ...state };
  }
};


const modalTwoDataSetValThree = {
  locator:'',
  data:'',
}

const valThreeReducer = (state, action) => {//validationSetThree
  switch (action.type) {
    case 'CLEAR':
      return { ...state, locator:'',data: ''};
    case 'CHANGE_LOCATOR':
      return { ...state, locator: action.payload };
    case 'CHANGE_DATA':
      return { ...state, data: action.payload };
    case 'RE_RENDER':
      return { ...state };
    default:
      return { ...state };
  }
};

const modalTwoDataSetValFour = {
  locator:''
}

const valFourReducer = (state, action) => {//validationSetThree
  switch (action.type) {
    case 'CLEAR':
      return { ...state, locator:''};
    case 'CHANGE_LOCATOR':
      return { ...state, locator: action.payload };
    case 'RE_RENDER':
      return { ...state };
    default:
      return { ...state };
  }
};

const modalTwoDataSetValFive = {
  data:''
}

const valFiveReducer = (state, action) => {//validationSetThree
  switch (action.type) {
    case 'CLEAR':
      return { ...state, data:''};
    case 'CHANGE_DATA':
      return { ...state, data: action.payload };
    case 'RE_RENDER':
      return { ...state };
    default:
      return { ...state };
  }
};

const modalTwoDataSetValSix = {
  branchSelection:''
}

const valSixReducer = (state, action) => {//validationSetThree
  switch (action.type) {
    case 'CLEAR':
      return { ...state, data:''};
    case 'CHANGE_BRANCH_SELECTION':
      return { ...state, branchSelection: action.payload };
    case 'RE_RENDER':
      return { ...state };
    default:
      return { ...state };
  }
};

const EditModalDialog = forwardRef((props,ref)=> {

  const [toggleOneModal, setToggleOneModal]  = React.useState(false);
  const [toggleTwoModal, setToggleTwoModal]  = React.useState(false);
  const [modalOneDataSet,setModalOneDataSet] = React.useState({});
  const [modalTwoDataSet,setModalTwoDataSet] = React.useState(props.raw);
  const [modalOneGeneralDataSet,setModalOneGeneralDataSet] = React.useState({});
  const [isMountModalOneGeneralDataSet,setIsMountModalOneGeneralDataSet]=React.useState(false);//Use for handle the unexpected behaviour
  const [isMountModalTwoDataSet,setIsmountModalTwoDataSet]=React.useState(false);//Use for handle the unexpected behaviour
  const [isCmdEmpty, setIsCmdEmpty] = useState(false);
  const [isInstEmpty, setIsInstEmpty] = useState(false);
  const [isDataEmpty, setIsDataEmpty] = useState(false);
  const [isLocatorEmpty,setIsLocatorEmpty] = useState(false);
  const [isBranchSelection,setIsBranchSelection] = useState(false);
  const [modalOneDetails, dispatchModalOne] = useReducer(reducer,modalOneDataSet2);
  const [validationOne,dispatchValidationOne] = useReducer(valOneReducer,modalTwoDataSetValOne);
  const [validationTwo,dispatchValidationTwo] = useReducer(valTwoReducer,modalTwoDataSetValTwo);
  const [validationThree,dispatchValidationThree] = useReducer(valThreeReducer,modalTwoDataSetValThree);
  const [validationFour,dispatchValidationFour] = useReducer(valFourReducer,modalTwoDataSetValFour);
  const [validationFive,dispatchValidationFive] = useReducer(valFiveReducer,modalTwoDataSetValFive);
  const [validationSix,dispatchValidationSix] = useReducer(valSixReducer,modalTwoDataSetValSix);
  const [commandBasedFields, setCommandBasedFields] = useState([[], '']);
  const [isMountOne,setIsMountOne] = useState(false);
  const [isMountTwo,setIsMountTwo] = useState(false);
  const [isMountThree,setIsMountThree] = useState(false);
  const [isMountFour,setIsMountFour] = useState(false);
  const [isMountFive,setIsMountFive] = useState(false);
  const [isMountSix,setIsMountSix] = useState(false);
  const [isMountSeven,setIsMountSeven] = useState(false);
  const [state,setState] = useState(false);
  const [stateTwo,setStateTwo] = useState(false);
  const [isMountEight,setIsMountEight] = useState(false);

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

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('aaaaaaaa');
    let matchedBinaryValue;
    for (let i = 0; i < commandArray.length; i++) {
      if (commandArray[i][0] === modalOneDataSet['command']) {
        matchedBinaryValue =
          commandArray[i][1].toString() +
          commandArray[i][2].toString() +
          commandArray[i][3].toString();
      }
    }
    console.log('hloo', matchedBinaryValue);
    switch (matchedBinaryValue) {
      case '000':
        setCommandBasedFields([['swapResult', 'action', 'comment'], '000']);
        break;
      case '001':
        setCommandBasedFields([
          ['swapResult', 'branchSelection', 'action', 'comment'],
          '001',
        ]);
        break;
      case '010':
        setCommandBasedFields([
          ['data', 'swapResult', 'action', 'comment'],
          '010',
        ]);
        break;
      case '011':
        setCommandBasedFields([
          ['data', 'swapResult', 'branchSelection', 'action', 'comment'],
          '011',
        ]);
        break;
      case '100':
        setCommandBasedFields([
          ['locator', 'locatorParameter', 'swapResult', 'action', 'comment'],
          '100',
        ]);
        break;
      case '101':
        setCommandBasedFields([
          [
            'locator',
            'locatorParameter',
            'swapResult',
            'branchSelection',
            'action',
            'comment',
          ],
          '101',
        ]);
        break;
      case '110':
        setCommandBasedFields([
          [
            'locator',
            'locatorParameter',
            'data',
            'swapResult',
            'action',
            'comment',
          ],
          '110',
        ]);
        break;
      case '111':
        setCommandBasedFields([
          [
            'locator',
            'locatorParameter',
            'data',
            'swapResult',
            'branchSelection',
            'action',
            'comment',
          ],
          '111',
        ]);
        break;

      default:
        setCommandBasedFields([[], '']);
    }
  }, [modalOneDataSet['command']]);

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
    switch (name) {
      case "locator":
        console.log('spider',name, value);
        testStepsData2[name] = value;
        break;
      case "locatorParameter":
        console.log('spider',name, value);
        testStepsData2[name] = value;
        break;
      case "data":
        console.log('spider',name, value);
        testStepsData2[name] = value;
        break;
      case "swapResult":
        console.log('spider',name, value);
        testStepsData2[name] = value;
        break;
      case "branchSelection":
        console.log('spider',name, value);
        testStepsData2[name] = value;
        break;
      case "action":
        console.log('spider',name, value);
        testStepsData2[name] = value;
        break;
      case "comment":
        console.log('spider',name, value);
        testStepsData2[name] = value;
        break;
    }
  
    console.log('rhino',testStepsData2);
  };

  const inputHandler3 = (name,value) => {
    generalPurposeInputData[name]=value;
    console.log('inputHandler3 edit', generalPurposeInputData);
  }

  const fieldLoop = () => {
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
             isCmdEmpty={isCmdEmpty}
             isInstEmpty={isInstEmpty}
             ></EditPopUpSelection>
         );
      }
      
    }
   
    if (props.enableChainPopUps) {
      // for (let i = 0; i < props.noFields[1]; i++) {
      //     if(props.title[props.noFields[0] + i]!=='instruction' && props.title[props.noFields[0] + i]!=='command' && props.title[props.noFields[0] + i]!=='swapResult' && props.title[props.noFields[0] + i]!=='action'){
      //       inputFieldArrayModalTwo.push(
      //         <EditPopUpInputField
      //           id={props.noFields[0] + i}
      //           editTestStep={props.raw[props.title[props.noFields[0] + i]]}
      //           title={props.title[props.noFields[0] + i]}
      //           generalPurpose={props.generalPurpose}
      //           inputType="text"
      //           onDataChange2={inputHandler2}
      //         ></EditPopUpInputField>
      //       );
      //     }else{
      //        inputFieldArrayModalTwo.push(
      //          <EditPopUpSelection
      //          id={props.noFields[0] + i}
      //          editTestStep={props.raw[props.title[props.noFields[0] + i]]}
      //          generalPurpose={props.generalPurpose}
      //          title={props.title[props.noFields[0] + i]}
      //          onDataChange2={inputHandler2}
      //          ></EditPopUpSelection>
      //       );
      //     }
   
      // }

      for (let i = 0; i < commandBasedFields[0].length; i++) {
        if (
          commandBasedFields[0][i] !== 'instruction' &&
          commandBasedFields[0][i] !== 'command' &&
          commandBasedFields[0][i] !== 'swapResult' &&
          commandBasedFields[0][i] !== 'action'
        ) {
          inputFieldArrayModalTwo.push(
            <EditPopUpInputField
              id={3 + i}
              editTestStep={props.raw[commandBasedFields[0][i]]}
              title={commandBasedFields[0][i]}
              inputType="text"
              generalPurpose={props.generalPurpose}
              onDataChange2={inputHandler2}
              isDataEmpty={isDataEmpty}
              isBranchSelection={isBranchSelection}
              isLocatorEmpty={isLocatorEmpty}
            ></EditPopUpInputField>
          );
        } else {
          inputFieldArrayModalTwo.push(
            <EditPopUpSelection
              id={3 + i}
              editTestStep={props.raw[commandBasedFields[0][i]]}
              title={commandBasedFields[0][i]}
              generalPurpose={props.generalPurpose}
              onDataChange2={inputHandler2}
            ></EditPopUpSelection>
          );
        }
      } 


    }

  };
  

  fieldLoop();
  const initModalOne = () => {
    return setToggleOneModal(true);
  };
  const TerminateModalOne = () => {
    setIsCmdEmpty(false);
    setIsInstEmpty(false);
    return setToggleOneModal(false);
  };
  const initModalTwo = () => {
    return setToggleTwoModal(true);
  };
  const TerminateModalTwo = () => {
    //setModalTwoDataSet(Object.assign(modalOneDataSet,testStepsData2));
    setIsCmdEmpty(false);
    setIsInstEmpty(false);
    setIsBranchSelection(false);
    setIsLocatorEmpty(false);
    setIsDataEmpty(false);
    dispatchValidationOne({
      type:'CLEAR'
    });
    dispatchValidationTwo({
      type:'CLEAR'
    });
    dispatchValidationThree({
      type:'CLEAR'
    });
    dispatchValidationFour({
      type:'CLEAR'
    });
    dispatchValidationFive({
      type:'CLEAR'
    });
    dispatchValidationSix({
      type:'CLEAR'
    });
    return setToggleTwoModal(false);
  };

  const NextStep = () => {
    dispatch(setEditModalOneData(testStepsData));
    if(props.generalPurpose===false){
      setModalOneDataSet(testStepsData);
      console.log('lighter',testStepsData);
       
      if ('group' in testStepsData) {
        dispatchModalOne({
          type: 'CHANGE_GROUP',
          payload: testStepsData.group,
        });
      }
      if ('instruction' in testStepsData) {
        dispatchModalOne({
          type: 'CHANGE_INSTRUCTION',
          payload: testStepsData.instruction,
        });
      }
      if ('command' in testStepsData) {
        dispatchModalOne({
          type: 'CHANGE_COMMAND',
          payload: testStepsData.command,
        });
      }
      if (
        modalOneDetails.instruction === '' ||
        modalOneDetails.command === ''
      ) {
        dispatchModalOne({ type: 'RE_RENDER' });
      }
    }
    if(props.generalPurpose===true){
      setModalOneGeneralDataSet(generalPurposeInputData);
      console.log('Go Live!!! ',generalPurposeInputData);

      TerminateModalOne();
      if (props.enableChainPopUps) {
        setTimeout(() => {
          setToggleTwoModal(true);
        }, 400);
      }
    }
  };
  
  useEffect(() => {
    if(isMountTwo){

      if (modalOneDetails.instruction === '' || modalOneDetails.instruction === undefined) {
        console.log('mohauk')
        setIsInstEmpty(true);
      } else {
        setIsInstEmpty(false);
      }
      if (modalOneDetails.command === '' || modalOneDetails.command === undefined) {
        setIsCmdEmpty(true);
      } else {
        console.log('bee');
        setIsCmdEmpty(false);
      }
      setState(!state);

    }else{
      setIsMountTwo(true);
    }
   
  }, [modalOneDetails]);


  useEffect(()=>{
    console.log('launch space',modalOneDetails.instruction);
    if (modalOneDetails.instruction !== '' && modalOneDetails.instruction !== undefined && modalOneDetails.command !== '' && modalOneDetails.command !==undefined) {
      TerminateModalOne();
      if (props.enableChainPopUps) {
        setTimeout(() => {
          setToggleTwoModal(true);
        }, 400);
      }
    }
  },[state])


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
      //modified
      if(props.generalPurpose===false){
        console.log('University',modalOneDataSet);
        props.onEdit(modalOneDataSet);
      }
      
      TerminateModalOne();
    }
  };

  const submitHandlerTwo = () => {
    //event.preventDefault();
    console.log(testStepsData2,'titan');
    console.log(modalOneDataSet,'titan2');
    // dispatch(setEditModalTwoData(testStepsData2));
    // console.log('redux1',props.modalTwoData);
    

    ///////////////////////////////////////
    // console.log('MEG',testStepsData2);
    // 
    if(props.enableChainPopUps===true){
      setModalTwoDataSet(Object.assign(props.modalOneData, testStepsData2));
      ////////////////////////////////////////
      
      if(validationSetOne.includes(modalOneDataSet.command)){
        console.log('fight');
        if ('data' in testStepsData2) {
          dispatchValidationOne({
            type: 'CHANGE_DATA',
            payload: testStepsData2.data,
          });
        }
        if ('branchSelection' in testStepsData2) {
          dispatchValidationOne({
            type: 'CHANGE_BRANCH_SELECTION',
            payload: testStepsData2.branchSelection,
          });
        }
        if (!('data' in testStepsData2) && !('branchSelection' in testStepsData2)) {
          //dispatchModalOne({ type: 'RE_RENDER' });
          if(validationOne.data==='' || validationOne.data===undefined){
            setIsDataEmpty(true)
          }
          if(validationOne.branchSelection==='' || validationOne.branchSelection===undefined){
            setIsBranchSelection(true);
          }
        }
      }
      else if(validationSetTwo.includes(modalOneDataSet.command)){
        console.log('vest')
        if ('data' in testStepsData2) {
          dispatchValidationTwo({
            type: 'CHANGE_DATA',
            payload: testStepsData2.data,
          });
        }
        if ('branchSelection' in testStepsData2) {
          dispatchValidationTwo({
            type: 'CHANGE_BRANCH_SELECTION',
            payload: testStepsData2.branchSelection,
          });
        }
        if ('locator' in testStepsData2) {
          dispatchValidationTwo({
            type: 'CHANGE_LOCATOR',
            payload: testStepsData2.locator,
          });
        }
        if (!('data' in testStepsData2) && !('branchSelection' in testStepsData2) && !('locator' in testStepsData2)) {
          //dispatchModalOne({ type: 'RE_RENDER' });
          if(validationTwo.data==='' || validationTwo.data===undefined){
            setIsDataEmpty(true)
          }
          if(validationTwo.branchSelection==='' || validationTwo.branchSelection===undefined){
            setIsBranchSelection(true);
          }
          if(validationTwo.locator==='' || validationTwo.locator===undefined){
            setIsLocatorEmpty(true)
          }
        }
      }else if(validationSetThree.includes(modalOneDataSet.command)){
        if ('data' in testStepsData2) {
          dispatchValidationThree({
            type: 'CHANGE_DATA',
            payload: testStepsData2.data,
          });
        }
        if ('locator' in testStepsData2) {
          dispatchValidationThree({
            type: 'CHANGE_LOCATOR',
            payload: testStepsData2.locator,
          });
        }
        if (!('data' in testStepsData2) && !('locator' in testStepsData2)) {
          //dispatchModalOne({ type: 'RE_RENDER' });
          if(validationThree.data==='' || validationThree.data===undefined){
            setIsDataEmpty(true)
          }
          if(validationThree.locator==='' || validationThree.locator===undefined){
            setIsLocatorEmpty(true);
          }
        }
      }else if(validationSetFour.includes(modalOneDataSet.command)){
        if ('locator' in testStepsData2) {
          dispatchValidationFour({
            type: 'CHANGE_LOCATOR',
            payload: testStepsData2.locator,
          });
        }
        if (!('locator' in testStepsData2)) {
          //dispatchModalOne({ type: 'RE_RENDER' });
          if(validationFour.locator==='' || validationFour.locator===undefined){
            setIsLocatorEmpty(true);
          }
        }
      }else if(validationSetFive.includes(modalOneDataSet.command)){
        if ('data' in testStepsData2) {
          dispatchValidationFive({
            type: 'CHANGE_DATA',
            payload: testStepsData2.locator,
          });
        }
        if (!('data' in testStepsData2)) {
          //dispatchModalOne({ type: 'RE_RENDER' });
          if(validationFive.data==='' || validationFive.data===undefined){
            setIsDataEmpty(true);
          }
        }
      }else if(validationSetSix.includes(modalOneDataSet.command)){
        if ('branchSelection' in testStepsData2) {
          dispatchValidationSix({
            type: 'CHANGE_BRANCH_SELECTION',
            payload: testStepsData2.branchSelection,
          });
        }
        if (!('branchSelection' in testStepsData2)) {
          //dispatchModalOne({ type: 'RE_RENDER' });
          if(validationSix.branchSelection==='' || validationSix.branchSelection===undefined){
            setIsBranchSelection(true);
          }
        }
      }
      else{
          console.log('tiper')
          props.onEdit(Object.assign(modalOneDataSet, testStepsData2));
          dispatchModalOne({ type: 'CLEAR' });
          TerminateModalTwo();
      }
    }

  }

  useEffect(() => {
    console.log(validationOne.data,'fire');
    if(isMountOne){
      if (validationOne.data === '' || validationOne.data === undefined ) {
        setIsDataEmpty(true);
      } else {
        setIsDataEmpty(false);
      }
      if (validationOne.branchSelection === '' || validationOne.branchSelection === undefined) {
        setIsBranchSelection(true);
      } else {
        setIsBranchSelection(false);
      }
      setStateTwo(!stateTwo);
    }else{
      setIsMountOne(true)
    }
  }, [validationOne]);


  useEffect(() => {
    console.log(validationTwo,'water');
    if(isMountThree){
      if (validationTwo.data === '' || validationTwo.data === undefined) {
        setIsDataEmpty(true);
      } else {
        setIsDataEmpty(false);
      }
      if(validationTwo.locator === '' || validationTwo.locator === undefined){
        setIsLocatorEmpty(true);
      }else{
        setIsLocatorEmpty(false);
      }
      if (validationTwo.branchSelection === '' || validationTwo.branchSelection === undefined) {
        setIsBranchSelection(true);
      } else {
        setIsBranchSelection(false);
      }
      setStateTwo(!stateTwo);

    }else{
      setIsMountThree(true)
    }
  }, [validationTwo]);

  useEffect(() => {
    console.log(validationOne.data,'fire');
    if(isMountFour){
      if (validationThree.data === '' || validationThree.data === undefined) {
        setIsDataEmpty(true);
      } else {
        setIsDataEmpty(false);
      }
      if (validationThree.locator === '' || validationThree.locator === undefined) {
        setIsLocatorEmpty(true);
      } else {
        setIsLocatorEmpty(false);
      }
      setStateTwo(!stateTwo);
    }else{
      setIsMountFour(true)
    }
  }, [validationThree]);

  useEffect(() => {
    if(isMountFive){
      if (validationFour.locator === '' || validationFour.locator === undefined) {
        setIsLocatorEmpty(true);
      } else {
        setIsLocatorEmpty(false);
      }
      setStateTwo(!stateTwo);
    }else{
      setIsMountFive(true)
    }
  }, [validationFour]);

  useEffect(() => {
    if(isMountSix){
      if (validationFive.data === '' || validationFive.data === undefined) {
        setIsDataEmpty(true);
      } else {
        setIsDataEmpty(false);
      }
      setStateTwo(!stateTwo);
    }else{
      setIsMountSix(true)
    }
  }, [validationFive]);

  useEffect(() => {
    if(isMountSeven){
      if (validationSix.branchSelection === '' || validationSix.branchSelection === undefined) {
        setIsBranchSelection(true);
      } else {
        setIsBranchSelection(false);
      }
      setStateTwo(!stateTwo);
    }else{
      setIsMountSeven(true)
    }
  }, [validationSix]);


  useEffect(() => {
    console.log('tap',props.modalOneData);

    if(validationSetOne.includes(modalOneDataSet.command)){
      console.log('vital',modalOneDataSet);
      if (validationOne.data !== '' && validationOne.data !== undefined && validationOne.branchSelection !== '' && validationOne.branchSelection !== undefined) {
        console.log('thunder');
        props.onEdit(modalTwoDataSet);
        dispatchModalOne({ type: 'CLEAR' });
        TerminateModalTwo();
      }
    }else if(validationSetTwo.includes(modalOneDataSet.command)){
      if (validationTwo.data !== '' && validationTwo.data !==undefined && validationTwo.branchSelection !== '' && validationTwo.branchSelection !==undefined && validationTwo.locator !=='' && validationTwo.locator !== undefined) {
        console.log('thunder');
        props.onEdit(modalTwoDataSet);
        dispatchModalOne({ type: 'CLEAR' });
        TerminateModalTwo();
      }
    }else if(validationSetThree.includes(modalOneDataSet.command)){
      if (validationThree.data !== '' && validationThree.data !== undefined && validationThree.locator !== '' && validationThree.locator !== undefined) {
        console.log('thunder');
        props.onEdit(modalTwoDataSet);
        dispatchModalOne({ type: 'CLEAR' });
        TerminateModalTwo();
      }
    }else if(validationSetFour.includes(modalOneDataSet.command)){
      if(validationFour.locator !== '' && validationFour.locator !== undefined){
        props.onEdit(modalTwoDataSet);
        dispatchModalOne({ type: 'CLEAR' });
        TerminateModalTwo();
      }
    }else if(validationSetFive.includes(modalOneDataSet.command)){
      if(validationFive.data !== '' && validationFive.data !== undefined){
        props.onEdit(modalTwoDataSet);
        dispatchModalOne({ type: 'CLEAR' });
        TerminateModalTwo();
      }
    }else if(validationSetSix.includes(modalOneDataSet.command)){
      if(validationSix.branchSelection !== '' && validationSix.branchSelection !== undefined){
        props.onEdit(modalTwoDataSet);
        dispatchModalOne({ type: 'CLEAR' });
        TerminateModalTwo();
      }
    }
   
  }, [stateTwo]);


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

      <form  id="myEditedFormTwo">
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
            onClick={submitHandlerTwo}
          >
            Finish
          </Button>
        </Modal.Footer>
      </Modal>
      </form>
    </>
  );
})

const mapStateToProps = (state) => {
  console.log('fire fly',state.getEditModalOneData.instruction);
  return{
    modalOneData: state.getEditModalOneData,
    modalTwoData: state.getEditModalTwoData
  }
};



export default connect(mapStateToProps, null, null, { forwardRef: true })(EditModalDialog)