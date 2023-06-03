import React,{forwardRef} from "react";
import { useState,useEffect,useImperativeHandle,useRef } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { setTestPageName } from "../../store";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import MessageBox from "../MessageBox";


const NameAssignModal = (props,ref) => {
    const [toggleOneModal,setToggleOneModal]=useState(false);
    const [fieldValue,setfieldValue]=useState('');
    const [isMount,setIsMount]=useState(false);

    const modalRefC=useRef();

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

    const initModalOne = () => {
      return setToggleOneModal(true);
    };
    
    const TerminateModalOne = () => {
      return setToggleOneModal(false);
    };

    const inputHandler = (event) => {
      setfieldValue(event.target.value); //set a page name
    }

    const submitHandlerOne = (event) => {
      console.log('bravo ',fieldValue);
      event.preventDefault();

      //check whether any page duplications
      if(props.indexOfSection===2){
        axios
        .get('http://localhost:5000/testPages')
        .then((res)=>{
          const availableTestPageNames=res.data.testPageNames;
          console.log('Jaguar',availableTestPageNames);
          for(let i=0;i<availableTestPageNames.length;i++){
            if(fieldValue===availableTestPageNames[i].slice(0,-1)){ 
              console.log('duplicate');
              modalRefC.current.log("'"+fieldValue+"'"+' page name already exists.Please enter a unique name.');
              return;
            }
          }
          console.log('DRAK');
          props.newPageName(fieldValue);
          props.setTestPageName(fieldValue);
        })
        .catch((err)=>{
          console.log(err)
        })

      }else if(props.indexOfSection===3){
        axios
        .get('http://localhost:5000/data/getDatasheets')
        .then((res)=>{
          const availableDataPageNames=res.data.dataPageNames;
          console.log('Jaguar',availableDataPageNames);
          for(let i=0;i<availableDataPageNames.length;i++){
            if(fieldValue===availableDataPageNames[i].slice(0,-1)){ 
              console.log('duplicate');
              modalRefC.current.log("'"+fieldValue+"'"+' page name already exists.Please enter a unique name.');
              return;
            }
          }
          props.newPageName(fieldValue);
          props.setTestPageName(fieldValue);
        })
        .catch((err)=>{
          console.log(err)
        })

        //sectionName='Data';
      }else if(props.indexOfSection===4){
        axios
        .get('http://localhost:5000/data/getDatasheets')
        .then((res)=>{
          const availableDataPageNames=res.data.dataPageNames;
          console.log('Jaguar',availableDataPageNames);
          for(let i=0;i<availableDataPageNames.length;i++){
            if(fieldValue===availableDataPageNames[i].slice(0,-1)){ 
              console.log('duplicate');
              modalRefC.current.log("'"+fieldValue+"'"+' page name already exists.Please enter a unique name.');
              return;
            }
          }
          props.newPageName(fieldValue);
          props.setTestPageName(fieldValue);
        })
        .catch((err)=>{
          console.log(err)
        })
        //sectionName='Component';
      }else if(props.indexOfSection===5){
        //sectionName='Locator';

        axios
        .get('http://localhost:5000/locators')
        .then((res)=>{
          const availableLocatorPageNames=res.data.locatorsPageNames;
          console.log('porche',availableLocatorPageNames);
          for(let i=0;i<availableLocatorPageNames.length;i++){
            if(fieldValue===availableLocatorPageNames[i]){ 
              console.log('duplicate');
              modalRefC.current.log("'"+fieldValue+"'"+' page name already exists.Please enter a unique name.');
              return;
            }
          }
          props.newPageName(fieldValue);
          props.setTestPageName(fieldValue);
        })
        .catch((err)=>{
          console.log(err)
        })
      }

      
    }

    const initiateNameAssigner=useSelector((state) => state.nameAssigner.initiateNameAssigner);

    useEffect(()=>{
      if(isMount){
        initModalOne();
      }else{
        setIsMount(true)
      }
    },[initiateNameAssigner])



    return(
      <div>
        <form /*ref={ref}*/ onSubmit={submitHandlerOne} id={'formOne'}>
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
      <MessageBox ref={modalRefC} modalFooterfuncOne={initModalOne} id='pageNameDuplicateModal'></MessageBox>
      </div>

    )
    
};

const mapStateToProps = (state) => {
  console.log('bird',state.getTestSheetName.testPageName);
  return{
    testPageName: state.getTestSheetName.testPageName,
  }
  
};

const mapDispatchToProps =(dispatch)=> {
  return {
    setTestPageName:(testPageName)=>dispatch(setTestPageName(testPageName))
  }
  // forwardRef: true
};

const option = {
  
}

//export default NameAssignModal;

export default connect(mapStateToProps,mapDispatchToProps)(NameAssignModal);