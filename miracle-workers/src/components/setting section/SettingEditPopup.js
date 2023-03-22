import React from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { forwardRef, useImperativeHandle} from "react";

const SettingEditPopup = ({ type, itemID ,value,callingFrom, addNewOrEdit}, ref) => {
  let url = "http://localhost:5000/settings/" + type + "/" + itemID;

  const [enablePopup, setEnablePopup] = useState(false);

  console.log(value);

  const [fieldValue,setFieldValue]=useState(value);
  console.log(fieldValue)
  const inputHandler=(event) => {
    setFieldValue(event.target.value);
  }

  const closeModal = () => {
    setEnablePopup(false);
    setFieldValue("")
  };

  useImperativeHandle(ref, () => ({
    open() {
      setEnablePopup(true);
    },
  }));

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if(callingFrom==="add"){
      console.log('hiiiiiiiiii');
      addNewOrEdit(fieldValue);
    }
    setEnablePopup(false);
    setFieldValue("");
  };

  return (
    <form onSubmit={onSubmitHandler} id="settingsEditPopup" action="" method="POST">
      <Modal show={enablePopup}>
        <Modal.Header closeButton onClick={closeModal}>
          <Modal.Title>{callingFrom} {type}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" value={fieldValue} onChange={inputHandler}></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModal}>
            Close
          </Button>
          <Button variant="dark" form="settingsEditPopup" type="submit">
            {callingFrom==="add"?<span>Add</span>:<span>Edit</span>}
          </Button>
        </Modal.Footer>
      </Modal>
    </form>
  );
};

export default forwardRef(SettingEditPopup);
