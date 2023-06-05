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
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Warning!
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
        <Button onClick={()=>{modalFooterFunctionOne(props.id)}}>Yes</Button>
        <Button onClick={terminateModal}>No</Button>
      </Modal.Footer>
    </Modal>
  );

})



export default MessageBox;