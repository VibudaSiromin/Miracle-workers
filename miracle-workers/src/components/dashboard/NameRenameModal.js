import React,{forwardRef} from "react";
import { useState,useEffect,useImperativeHandle,useRef } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { setRenamedPageName } from "../../store";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import MessageBox from "../MessageBox";
import { object } from "prop-types";


const NameRenameModal = (props,ref) => {
    const [toggleOneModal,setToggleOneModal]=useState(false);
    const [fieldValue,setfieldValue]=useState('');
    const [isMount,setIsMount]=useState(false);
    const [pageNameBeforeRenaming,setPageNameBeforeRenaming]=useState();

    const modalRefRenaming=useRef();

    useEffect(()=>{
        if(Object.keys(props.currentURLSection).length!==0){
          console.log('dino',props.currentURLSection);
          const {to}=props.currentURLSection;
          const URL='http://localhost:5000'+to;
          const URLSections=URL.split('/');
          const pageName=URLSections.slice(-1)[0];
          setfieldValue(pageName);
          setPageNameBeforeRenaming(pageName);
        }  
    },[props.currentURLSection]);


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

    const initRenamingModal = () => {
      return setToggleOneModal(true);
    };
    
    const TerminateRenamingModal = () => {
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

        //**************Manuall MODE Implemented. JSON MODE should be implemented ***************//
        axios
        .get('http://localhost:5000/testPages')
        .then((res)=>{
          const availableTestPageNames=res.data.testPageNames;
          console.log('Jaguar222',pageNameBeforeRenaming);
          if(fieldValue===pageNameBeforeRenaming){
            axios
            .patch('http://localhost:5000/testJunction/renamePageName',{
              newTestPageName:fieldValue,
              pageIndex:props.renamePageIndex
            })
            .then((res)=>{
              renameTestPageNameInLauncher();
              props.updatePageNames('test');
            })
            .catch((err)=>{
              console.log(err);
            })
            ////////////////////////////////////

          }else{
            for(let i=0;i<availableTestPageNames.length;i++){
              if(fieldValue===availableTestPageNames[i].slice(0,-1)){ 
                console.log('duplicate');
                modalRefRenaming.current.log("'"+fieldValue+"'"+' page name already exists.Please enter a unique name.');
                return;
              }
            }
            axios
            .patch('http://localhost:5000/testJunction/renamePageName',{
              newTestPageName:fieldValue,
              pageIndex:props.renamePageIndex
            })
            .then((res)=>{
              renameTestPageNameInLauncher();
              props.updatePageNames('test')
            })
            .catch((err)=>{
              console.log(err);
            })
          }
        })
        .catch((err)=>{
          console.log(err)
        })

      }else if(props.indexOfSection===3){
        //const availableDataPageNames=res.data.dataPageNames;
        const {to}=props.currentURLSection;
        const URLSection=to.split('/');
        console.log('cop',URLSection);
        if(URLSection[2]==='dataExcel'){
          axios
          .get('http://localhost:5000/data/getDatasheets')
          .then((res)=>{
          const availableDataPageNames=res.data.dataPageNames;
          console.log('Jaguar222',pageNameBeforeRenaming);
          if(fieldValue===pageNameBeforeRenaming){
            axios
            .patch('http://localhost:5000/dataJunction/renamePageName',{
              newDataPageName:fieldValue+"E",
              pageIndex:props.renamePageIndex
            })
            .then((res)=>{
              props.updatePageNames('data');
            })
            .catch((err)=>{
              console.log(err);
            })
          }else{
            for(let i=0;i<availableDataPageNames.length;i++){
              if(fieldValue===availableDataPageNames[i].slice(0,-1)){ 
                console.log('duplicate');
                modalRefRenaming.current.log("'"+fieldValue+"'"+' page name already exists.Please enter a unique name.');
                return;
              }
            }
            axios
            .patch('http://localhost:5000/dataJunction/renamePageName',{
              newDataPageName:fieldValue+"E",
              pageIndex:props.renamePageIndex
            })
            .then((res)=>{
              props.updatePageNames('data');
            })
            .catch((err)=>{
              console.log(err);
            })
          }
        })
        .catch((err)=>{
          console.log(err)
        })
        }else if(URLSection[2]==='data'){
          axios
          .get('http://localhost:5000/data/getDatasheets')
          .then((res)=>{
          const availableDataPageNames=res.data.dataPageNames;
          console.log('Jaguar222',pageNameBeforeRenaming);
          if(fieldValue===pageNameBeforeRenaming){
            axios
            .patch('http://localhost:5000/dataJunction/renamePageName',{
              newDataPageName:fieldValue+"M",
              pageIndex:props.renamePageIndex
            })
            .then((res)=>{
              props.updatePageNames('data');
            })
            .catch((err)=>{
              console.log(err);
            })
          }else{
            for(let i=0;i<availableDataPageNames.length;i++){
              if(fieldValue===availableDataPageNames[i].slice(0,-1)){ 
                console.log('duplicate');
                modalRefRenaming.current.log("'"+fieldValue+"'"+' page name already exists.Please enter a unique name.');
                return;
              }
            }
            axios
            .patch('http://localhost:5000/dataJunction/renamePageName',{
              newDataPageName:fieldValue+"M",
              pageIndex:props.renamePageIndex
            })
            .then((res)=>{
              props.updatePageNames('data');
            })
            .catch((err)=>{
              console.log(err);
            })
          }
        })
        .catch((err)=>{
          console.log(err)
        })
        }
       
      }else if(props.indexOfSection===4){
        //component section
        axios
        .get('http://localhost:5000/data/getDatasheets')
        .then((res)=>{
          const availableDataPageNames=res.data.dataPageNames;
          console.log('Jaguar',availableDataPageNames);
          for(let i=0;i<availableDataPageNames.length;i++){
            if(fieldValue===availableDataPageNames[i].slice(0,-1)){ 
              console.log('duplicate');
              modalRefRenaming.current.log("'"+fieldValue+"'"+' page name already exists.Please enter a unique name.');
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
          console.log('Jaguar222',pageNameBeforeRenaming);
          if(fieldValue===pageNameBeforeRenaming){
            axios
            .patch('http://localhost:5000/locators/renamePageName',{
              newLocatorPageName:fieldValue,
              pageIndex:props.renamePageIndex
            })
            .then((res)=>{
              props.updatePageNames('locator');
            })
            .catch((err)=>{
              console.log(err);
            })
          }else{
            for(let i=0;i<availableLocatorPageNames.length;i++){
              if(fieldValue===availableLocatorPageNames[i].slice(0,-1)){ 
                console.log('duplicate');
                modalRefRenaming.current.log("'"+fieldValue+"'"+' page name already exists.Please enter a unique name.');
                return;
              }
            }
            axios
            .patch('http://localhost:5000/locators/renamePageName',{
              newLocatorPageName:fieldValue,
              pageIndex:props.renamePageIndex
            })
            .then((res)=>{
              props.updatePageNames('locator');
            })
            .catch((err)=>{
              console.log(err);
            })
          }
        })
        .catch((err)=>{
          console.log(err)
        })

      }

      
    }

    const renameTestPageNameInLauncher = () => {
          axios
          .patch('http://localhost:5000/launcher/renamePageName',{
            newTestPageName:fieldValue,
            pageIndex:props.renamePageIndex
          })
          .then((res)=>{
          })
          .catch((err)=>{
            console.log(err);
          })
    }

    //const initiateNameAssigner=useSelector((state) => state.nameAssigner.initiateNameAssigner);
    const initiateRenameModal=useSelector((state) => state.renameModal.initiateRenameModal);
    //renameModal
    useEffect(()=>{
      if(isMount){
        initRenamingModal();
      }else{
        setIsMount(true)
      }
    },[initiateRenameModal])

    return(
      <div>
        <form /*ref={ref}*/ onSubmit={submitHandlerOne} id={'renameForm'}>
        <Modal show={toggleOneModal} tabIndex="-1" size="sm" centered>
          <Modal.Header closeButton onClick={TerminateRenamingModal}>
            {sectionName}
          </Modal.Header>
          <Modal.Body>
            <label>Enter a page name:</label>
            <input onChange={inputHandler} name={'fieldName'} value={fieldValue}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={TerminateRenamingModal}>
              Close
            </Button>
            <Button variant="success" onClick={TerminateRenamingModal} form={'renameForm'} type="submit">
              Finish
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
      <MessageBox ref={modalRefRenaming} modalFooterfuncOne={initRenamingModal} id='pageNameDuplicateModal'></MessageBox>
      </div>

    )
    
};

const mapStateToProps = (state) => {
  console.log('falcon',state.getRenamedPageName.renamedPageName);
  return{
    renamedPageName: state.getRenamedPageName.renamedPageName,
  }
  
};

const mapDispatchToProps =(dispatch)=> {
  return {
    setRenamedPageName:(renamedPageName)=>dispatch(setRenamedPageName(renamedPageName))
  }
  // forwardRef: true
};

const option = {
  
}

//export default NameAssignModal;

export default connect(mapStateToProps,mapDispatchToProps)(NameRenameModal);