import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { forwardRef } from 'react';
import { useState,useImperativeHandle } from 'react';
import { GrCircleAlert } from "react-icons/gr";

const MessageBox = forwardRef((props,ref)=>{
  const [modalSow,setModalShow]=useState(false);
  const [message,setMessage]=useState(''); 

  useImperativeHandle(ref,()=>({
    log(message){
      setMessage(message);
      console.log('dead island',message);
      initModal();
      
    }
  }));

  const initModal = () => {
    setModalShow(true);
    return;
  }

  const terminateModal = () => {
    setModalShow(false);
    return;
  }

  const modalFooterFunctionOne = (event,modalId) => {
    props.modalFooterfuncOne(event,modalId);
    console.log('SUN CRUSH', modalId);
    terminateModal();
  }


  return (
    <Modal
      show={modalSow}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      id={props.id}
    >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
          {props.modalTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <h4>Centered Modal</h4> */}
        <div>
          <GrCircleAlert size='30px' color='orange'></GrCircleAlert>
          {'   '}
          {message}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>{modalFooterFunctionOne(props.id)}}>{props.btnValues[0]}</Button>
        {props.isTwobtn && <Button onClick={terminateModal}>{props.btnValues[1]}</Button>}   
      </Modal.Footer>
    </Modal>
  );

})



export default MessageBox;