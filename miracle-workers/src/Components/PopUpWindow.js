import React, { useEffect, useReducer } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PopUpInputField from './PopUpInputField';
import PopUpSelection from './PopUpSelection';
import { MdTableRows } from 'react-icons/md';
import { setCommand } from '../store';
import { useDispatch } from 'react-redux';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import commandArray from '../assets/commands';
import { validationSetOne } from '../assets/validation/validationSetOne';
import { validationSetTwo } from '../assets/validation/validationSetTwo';
import { validationSetThree } from '../assets/validation/validationSetThree';
import { validationSetFour } from '../assets/validation/validationSetFour';
import { validationSetFive } from '../assets/validation/validationSetFive';
import { validationSetSix } from '../assets/validation/validationSetSix';

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
      return { ...state, branchSelection:''};
    case 'CHANGE_BRANCH_SELECTION':
      return { ...state, branchSelection: action.payload };
    case 'RE_RENDER':
      return { ...state };
    default:
      return { ...state };
  }
};

function ModalDialog(props, ref) {
  const [toggleOneModal, setToggleOneModal] = React.useState(false);
  const [toggleTwoModal, setToggleTwoModal] = React.useState(false);
  const [modalOneDataSet, setModalOneDataSet] = React.useState({});
  const [modalTwoDataSet, setModalTwoDataSet] = React.useState({});
  const [modalOneGeneralDataSet, setModalOneGeneralDataSet] = React.useState({});
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
  const [stateOne,setStateOne] = useState(false);
  const [stateTwo,setStateTwo] = useState(false);
  const [isColumnNameEmpty,setIsColumnNameEmpty] = useState(false);
  
  let inputFieldArrayModalOne = [];
  let inputFieldArrayModalTwo = [];
  let btnValue;
  const getEditTestStep = props.editTestStep;

  const testStepsData = {};
  const testStepsData2 = {};
  const generalPurposeInputData = {};

  const dispatch = useDispatch();

  useEffect(() => {
    let matchedBinaryValue;
    for (let i = 0; i < commandArray.length; i++) {
      if (commandArray[i][0] === modalOneDataSet['command']) {
        matchedBinaryValue =
          commandArray[i][1].toString() +
          commandArray[i][2].toString() +
          commandArray[i][3].toString();
      }
    }

    //decide the suitable input fields in second modal
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
      case 'group':
        testStepsData[name] = value;
        break;
      case 'instruction':
        testStepsData[name] = value;
        break;
      case 'command':
        console.log('DMC', value);
        dispatch(setCommand(value));
        testStepsData[name] = value;
        break;
    }

    console.log(testStepsData);
  };

  const inputHandler2 = (name, value) => {
    console.log(name, value);
    switch (name) {
      case 'locator':
        testStepsData2[name] = value;
        break;
      case 'locatorParameter':
        testStepsData2[name] = value;
        break;
      case 'data':
        testStepsData2[name] = value;
        break;
      case 'swapResult':
        testStepsData2[name] = value;
        break;
      case 'branchSelection':
        testStepsData2[name] = value;
        break;
      case 'action':
        testStepsData2[name] = value;
        break;
      case 'comment':
        testStepsData2[name] = value;
        break;
    }

    
  };

  //to handle data coming from other sections eg- data , locator
  const inputHandler3 = (name, value) => {
    generalPurposeInputData[name] = value;
  };

  //use to render input fields individually
  const fieldLoop = () => {
    for (let i = 0; i < props.noFields[0]; i++) {
      if (
        props.title[i] !== 'instruction' &&
        props.title[i] !== 'command' &&
        props.title[i] !== 'swapResult' &&
        props.title[i] !== 'action' &&
        props.generalPurpose === false
      ) {
        inputFieldArrayModalOne.push(
          <PopUpInputField
            id={i}
            title={props.title[i]}
            inputType="text"
            generalPurpose={props.generalPurpose}
            onDataChange={inputHandler}
          ></PopUpInputField>
        );
      } else if (props.generalPurpose === true) {
        //section for all general purpose data inputs such as data section,login,locator section ect...
        console.log('jazz ', props.title);
        console.log('jazz weke');
        inputFieldArrayModalOne.push(
          <PopUpInputField
            id={i}
            title={props.title[i]}
            inputType="text"
            generalPurpose={props.generalPurpose}
            isColumnNameEmpty={isColumnNameEmpty}
            onDataChange={inputHandler3}
          ></PopUpInputField>
        );
      } else if (props.generalPurpose === false) {
        inputFieldArrayModalOne.push(
          <PopUpSelection
            id={i}
            title={props.title[i]}
            generalPurpose={props.generalPurpose}
            onDataChange={inputHandler}
            isCmdEmpty={isCmdEmpty}
            isInstEmpty={isInstEmpty}
          ></PopUpSelection>
        );
      }
    }

    //use to render fields in second modal
    if (props.enableChainPopUps) {
      for (let i = 0; i < commandBasedFields[0].length; i++) {
        if (
          commandBasedFields[0][i] !== 'instruction' &&
          commandBasedFields[0][i] !== 'command' &&
          commandBasedFields[0][i] !== 'swapResult' &&
          commandBasedFields[0][i] !== 'action'
        ) {
          inputFieldArrayModalTwo.push(
            <PopUpInputField
              id={3 + i}
              title={commandBasedFields[0][i]}
              inputType="text"
              generalPurpose={props.generalPurpose}
              onDataChange2={inputHandler2}
              isDataEmpty={isDataEmpty}
              isBranchSelection={isBranchSelection}
              isLocatorEmpty={isLocatorEmpty}
            ></PopUpInputField>
          );
        } else {
          inputFieldArrayModalTwo.push(
            <PopUpSelection
              id={3 + i}
              title={commandBasedFields[0][i]}
              generalPurpose={props.generalPurpose}
              onDataChange2={inputHandler2}
            ></PopUpSelection>
          );
        }
      }
    }

  };

  fieldLoop();
  const initModalOne = () => {
    setIsCmdEmpty(false);
    setIsInstEmpty(false);
    setIsColumnNameEmpty(false);
    return setToggleOneModal(true);
  };
  const TerminateModalOne = () => {
    dispatchModalOne({ type: 'CLEAR' });
    return setToggleOneModal(false);
  };

  //initiate first modal 
  const initModalTwo = () => {
    setIsCmdEmpty(false);
    setIsInstEmpty(false);
    setIsDataEmpty(false);
    setIsBranchSelection(false);
    setIsLocatorEmpty(false);
    setIsColumnNameEmpty(false);
    return setToggleTwoModal(true);
  };
  //close modal two
  const TerminateModalTwo = () => {
    console.log(testStepsData2);
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
    //setModalTwoDataSet(Object.assign(modalOneDataSet, testStepsData2));
    return setToggleTwoModal(false);
  };

  //when chainPopups enable.This button will appear
  const NextStep = () => {
    if (props.generalPurpose === false) {
      setModalOneDataSet(testStepsData);

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
    if (props.generalPurpose === true) {
      console.log('Next step', generalPurposeInputData);
      setModalOneGeneralDataSet(generalPurposeInputData);
      // if('Column Name' in generalPurposeInputData){
      //   setIsColumnNameEmpty(false);
      //   props.saveNewHeadingData(modalOneGeneralDataSet);
      //   TerminateModalOne();
      // }else{
      //   setIsColumnNameEmpty(true);
      // }
      if (props.enableChainPopUps) {   
        setTimeout(() => {
          initModalTwo();
        }, 400);
      }
    }
  };

  useEffect(() => {
    console.log('jet fire',modalOneDetails.instruction);
    console.log('jet fire 2',modalOneDetails.command);
    if(isMountTwo){
      if (modalOneDetails.instruction === '') {
        setIsInstEmpty(true);
      } else {
        setIsInstEmpty(false);
      }
      if (modalOneDetails.command === '') {
        setIsCmdEmpty(true);
      } else {
        setIsCmdEmpty(false);
      }
    }else{
      setIsMountTwo(true);
    }
   
    setStateOne(!stateOne);
  }, [modalOneDetails]);

  useEffect(() => {
    console.log('farm');
    if (modalOneDetails.instruction !== '' && modalOneDetails.command !== '') {
      TerminateModalOne();
      if (props.enableChainPopUps) {
        setTimeout(() => {
          setToggleTwoModal(true);
        }, 400);
      }
    }
  }, [stateOne]);

  const ApplyBtnValue = () => {
    if (props.enableChainPopUps) {
      btnValue = 'Next';
    } else {
      btnValue = 'Finish';
    }
  };
  ApplyBtnValue();

  const submitHandlerOne = (event) => {
    console.log('sailor');
    event.preventDefault();
    if (props.enableChainPopUps === false) {
      if (props.generalPurpose === false) {
        console.log('fairChild');
        props.saveNewData(modalOneDataSet);
        TerminateModalOne();
      }
      if (props.generalPurpose === true) {
        if (props.purpose === 'fillData') {
          console.log('fillData AX1', modalOneGeneralDataSet);
          props.saveNewGeneralData(modalOneGeneralDataSet); // calling from heading component
          TerminateModalOne();
        }
        if (props.purpose === 'addHeading') {
          console.log('triple H', modalOneGeneralDataSet);
          if('Column Name' in modalOneGeneralDataSet){
            setIsColumnNameEmpty(false);
            props.saveNewHeadingData(modalOneGeneralDataSet);
            TerminateModalOne();
          }else{
            setIsColumnNameEmpty(true);
          }
          
        }
      }  
    }
  };

  const submitHandlerTwo = (event) => {
    console.log(modalOneDataSet,'sailor2');
    event.preventDefault();
    if (props.enableChainPopUps === true) {
      console.log(testStepsData2,'MAC');
      setModalTwoDataSet(Object.assign(modalOneDataSet, testStepsData2));
      ////////////////////////////////////////     
      if(validationSetOne.includes(modalOneDataSet.command)){
        console.log('fight11111',testStepsData2);
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
          console.log('MORA!!!',validationOne.data);
          if(validationOne.data===''){
            setIsDataEmpty(true)
          }
          if(validationOne.branchSelection===''){
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
          if(validationTwo.data===''){
            setIsDataEmpty(true)
          }
          if(validationTwo.branchSelection===''){
            setIsBranchSelection(true);
          }
          if(validationTwo.locator===''){
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
          if(validationThree.data===''){
            setIsDataEmpty(true)
          }
          if(validationThree.locator===''){
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
          if(validationFour.locator===''){
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
          if(validationFive.data===''){
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
          if(validationSix.branchSelection===''){
            setIsBranchSelection(true);
          }
        }
      }
      else{
          console.log('canter')
          props.saveNewData(Object.assign(modalOneDataSet, testStepsData2));
          dispatchModalOne({ type: 'CLEAR' });
          TerminateModalTwo();
      }
    }
  };

  useEffect(() => {
    console.log(validationOne.data,'fire');
    if(isMountOne){
      if (validationOne.data === '') {
        setIsDataEmpty(true);
      } else {
        setIsDataEmpty(false);
      }
      if (validationOne.branchSelection === '') {
        setIsBranchSelection(true);
      } else {
        setIsBranchSelection(false);
      }
    }else{
      setIsMountOne(true)
    }

    setStateTwo(!stateTwo);
  }, [validationOne]);


  useEffect(() => {
    console.log(validationTwo,'water');
    if(isMountThree){
      if (validationTwo.data === '') {
        setIsDataEmpty(true);
      } else {
        setIsDataEmpty(false);
      }
      if(validationTwo.locator === ''){
        setIsLocatorEmpty(true);
      }else{
        setIsLocatorEmpty(false);
      }
      if (validationTwo.branchSelection === '') {
        setIsBranchSelection(true);
      } else {
        setIsBranchSelection(false);
      }
    }else{
      setIsMountThree(true)
    }
    setStateTwo(!stateTwo);
  }, [validationTwo]);

  useEffect(() => {
    console.log(validationOne.data,'fire');
    if(isMountFour){
      if (validationThree.data === '') {
        setIsDataEmpty(true);
      } else {
        setIsDataEmpty(false);
      }
      if (validationThree.locator === '') {
        setIsLocatorEmpty(true);
      } else {
        setIsLocatorEmpty(false);
      }
    }else{
      setIsMountFour(true)
    }
    setStateTwo(!stateTwo);
  }, [validationThree]);

  useEffect(() => {
    if(isMountFive){
      if (validationFour.locator === '') {
        setIsLocatorEmpty(true);
      } else {
        setIsLocatorEmpty(false);
      }
    }else{
      setIsMountFive(true)
    }
    setStateTwo(!stateTwo);
  }, [validationFour]);

  useEffect(() => {
    if(isMountSix){
      if (validationFive.data === '') {
        setIsDataEmpty(true);
      } else {
        setIsDataEmpty(false);
      }
    }else{
      setIsMountSix(true)
    }
    setStateTwo(!stateTwo);
  }, [validationFive]);

  useEffect(() => {
    if(isMountSeven){
      if (validationSix.branchSelection === '') {
        setIsBranchSelection(true);
      } else {
        setIsBranchSelection(false);
      }
    }else{
      setIsMountSeven(true)
    }
    setStateTwo(!stateTwo);
  }, [validationSix]);

  useEffect(() => {
    console.log('tap');

    if(validationSetOne.includes(modalOneDataSet.command)){
      console.log('vital',modalOneDataSet);
      if (validationOne.data !== '' && validationOne.branchSelection !== '') {
        console.log('thunder');
        props.saveNewData(modalTwoDataSet);
        dispatchModalOne({ type: 'CLEAR' });
        TerminateModalTwo();
      }
    }else if(validationSetTwo.includes(modalOneDataSet.command)){
      if (validationTwo.data !== '' && validationTwo.branchSelection !== '' && validationTwo.locator !=='') {
        console.log('thunder');
        props.saveNewData(modalTwoDataSet);
        dispatchModalOne({ type: 'CLEAR' });
        TerminateModalTwo();
      }
    }else if(validationSetThree.includes(modalOneDataSet.command)){
      if (validationThree.data !== '' && validationThree.locator !== '') {
        console.log('thunder');
        props.saveNewData(modalTwoDataSet);
        dispatchModalOne({ type: 'CLEAR' });
        TerminateModalTwo();
      }
    }else if(validationSetFour.includes(modalOneDataSet.command)){
      if(validationFour.locator !== ''){
        props.saveNewData(modalTwoDataSet);
        dispatchModalOne({ type: 'CLEAR' });
        TerminateModalTwo();
      }
    }else if(validationSetFive.includes(modalOneDataSet.command)){
      if(validationFive.data !== ''){
        props.saveNewData(modalTwoDataSet);
        dispatchModalOne({ type: 'CLEAR' });
        TerminateModalTwo();
      }
    }else if(validationSetSix.includes(modalOneDataSet.command)){
      if(validationSix.branchSelection !== ''){
        props.saveNewData(modalTwoDataSet);
        dispatchModalOne({ type: 'CLEAR' });
        TerminateModalTwo();
      }
    }
   
  }, [stateTwo]);


  const renderAddButton = () => {
    if (props.addBtnId === 'testMBtn') {
      return (
        <Button
          variant="success"
          onClick={initModalOne}
          id={props.addBtnId}
          disabled={!props.btnStatus}
        >
          <MdTableRows></MdTableRows>
          {props.buttonValue}
        </Button>
      );
    } else {
      return (
        <Button variant="success" onClick={initModalOne} id={props.addBtnId}>
          <MdTableRows></MdTableRows>
          {props.buttonValue}
        </Button>
      );
    }
  };

  return (
    <>
      {renderAddButton()}
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
            <Button
              variant="dark"
              onClick={NextStep}
              form={props.formID[0]}
              type="submit"
            >
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
            >
              Finish
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </>
  );
}
//export default forwardRef(ModalDialog);
const mapStateToProps = (state) => {
  return {
    btnStatus: state.getTestAddBtnStatus.status,
  };
};

export default connect(mapStateToProps)(forwardRef(ModalDialog));
