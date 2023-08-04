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

const modalOneDataSet2 = {
  group: '',
  instruction: '',
  command: '',
};

function ModalDialog(props, ref) {
  const [toggleOneModal, setToggleOneModal] = React.useState(false);
  const [toggleTwoModal, setToggleTwoModal] = React.useState(false);
  const [modalOneDataSet, setModalOneDataSet] = React.useState({});
  const [modalTwoDataSet, setModalTwoDataSet] = React.useState({});
  const [modalOneGeneralDataSet, setModalOneGeneralDataSet] = React.useState(
    {}
  );
  const [isCmdEmpty, setIsCmdEmpty] = useState(true);
  const [isInstEmpty, setIsInstEmpty] = useState(true);
  const [modalOneDetails, dispatchModalOne] = useReducer(
    reducer,
    modalOneDataSet2
  );
  const [commandBasedFields, setCommandBasedFields] = useState([[], '']);
  console.log('btn status', props.btnStatus);

  const { lname, tname, cname, dname } = useParams();

  let inputFieldArrayModalOne = [];
  let inputFieldArrayModalTwo = [];
  let btnValue;
  const getEditTestStep = props.editTestStep;

  const testStepsData = {};
  const testStepsData2 = {};
  const generalPurposeInputData = {};

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

    console.log(testStepsData2);
  };

  const inputHandler3 = (name, value) => {
    console.log('inputHandler3: ' + name, value);
    generalPurposeInputData[name] = value;
    console.log('inputHandler3:', props.purpose);
  };

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
    //            isCmdEmpty={isCmdEmpty}
    //            isInstEmpty={isInstEmpty}
    //            ></PopUpSelection>
    //         );
    //       }

    //   }
    // }
  };

  fieldLoop();
  const initModalOne = () => {
    return setToggleOneModal(true);
  };
  const TerminateModalOne = () => {
    setIsCmdEmpty(false);
    setIsInstEmpty(false);
    dispatchModalOne({ type: 'CLEAR' });
    return setToggleOneModal(false);
  };
  const initModalTwo = () => {
    return setToggleTwoModal(true);
  };
  const TerminateModalTwo = () => {
    console.log(testStepsData2);
    setModalTwoDataSet(Object.assign(modalOneDataSet, testStepsData2));
    return setToggleTwoModal(false);
  };

  //////////////////////////////

  //////////////////////////////

  const NextStep = () => {
    if (props.generalPurpose === false) {
      console.log('jet', testStepsData);
      setModalOneDataSet(testStepsData);

      //////***************** */
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

      console.log('super mario', modalOneDetails);
      //dispatchModalOne({type:"RE_RENDER"})

      //////***************** */
    }
    if (props.generalPurpose === true) {
      console.log('Next step', generalPurposeInputData);
      setModalOneGeneralDataSet(generalPurposeInputData);

      TerminateModalOne();
      if (props.enableChainPopUps) {
        setTimeout(() => {
          setToggleTwoModal(true);
        }, 400);
      }
    }
  };

  useEffect(() => {
    console.log('tree');
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
  }, [isCmdEmpty, isInstEmpty]);

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
        props.saveNewData(modalOneDataSet);
      }
      if (props.generalPurpose === true) {
        if (props.purpose === 'fillData') {
          console.log('fillData AX1', modalOneGeneralDataSet);
          props.saveNewGeneralData(modalOneGeneralDataSet); // calling from heading component
        }
        if (props.purpose === 'addHeading') {
          console.log('triple H', modalOneGeneralDataSet);
          props.saveNewHeadingData(modalOneGeneralDataSet);
        }
      }

      TerminateModalOne();
    }
  };

  const submitHandlerTwo = (event) => {
    console.log('sailor2');
    event.preventDefault();
    if (props.enableChainPopUps === true) {
      props.saveNewData(modalTwoDataSet);
      dispatchModalOne({ type: 'CLEAR' });
      TerminateModalOne();
    }
  };

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
      {/* <Button variant="success" onClick={initModalOne} id={props.addBtnId}>
        <MdTableRows></MdTableRows>
        {props.buttonValue}
      </Button> */}
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
//export default forwardRef(ModalDialog);
const mapStateToProps = (state) => {
  return {
    btnStatus: state.getTestAddBtnStatus.status,
  };
};

export default connect(mapStateToProps)(forwardRef(ModalDialog));
