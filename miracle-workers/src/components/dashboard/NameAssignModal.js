import React,{forwardRef} from "react";
import { useState,useEffect,useImperativeHandle } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const NameAssignModal = forwardRef((props,ref) => {
    const [toggleOneModal,setToggleOneModal]=useState(false);
    const [fieldValue,setfieldValue]=useState('');

    let sectionName;
    if(props.indexOfSection===2){
      sectionName='Test Suite';
    }else if(props.indexOfSection===3){
      sectionName='Data';
    }else if(props.indexOfSection===4){
      sectionName='Component';
    }else if(props.indexOfSection===5){
      sectionName='Locator';
    }
    

    useImperativeHandle(ref,()=>({
      log(){
        console.log('sam');
        initModalOne();
      }
    }));

    const initModalOne = () => {
      return setToggleOneModal(true);
    };
    
    const TerminateModalOne = () => {
      return setToggleOneModal(false);
    };

    const inputHandler = (event) => {
      setfieldValue(event.target.value);
    }

    const submitHandlerOne = (event) => {
      console.log('bravo ',fieldValue);
      event.preventDefault();
      props.newPageName(fieldValue);
    }

    return(
        <form onSubmit={submitHandlerOne} id={'formOne'}>
        <Modal show={toggleOneModal} tabIndex="-1" size="sm" centered>
          <Modal.Header closeButton onClick={TerminateModalOne}>
            {sectionName}
          </Modal.Header>
          <Modal.Body>
            <label>Enter a page name:</label>
            <input onChange={inputHandler} name={'fieldName'}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={TerminateModalOne}>
              Close
            </Button>
            <Button variant="success" onClick={TerminateModalOne} form={'formOne'} type="submit">
              Finish
            </Button>
          </Modal.Footer>
        </Modal>
    </form>
    )
    
})

export default NameAssignModal;