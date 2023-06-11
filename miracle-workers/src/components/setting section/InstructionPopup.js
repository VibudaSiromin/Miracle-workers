import React from "react";
import { useState } from "react";
import { Modal, Button} from "react-bootstrap";
import { forwardRef, useImperativeHandle} from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const InstructionPopup = ({ value, addNew}, ref) => {

  const schema = yup.object().shape({
    instruction: yup.string().required("Cannot Be Empty"),

  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });


  const [enablePopup, setEnablePopup] = useState(false);

  console.log(value);


  const closeModal = () => {
    setEnablePopup(false);
    // setFieldValue("")
  };

  useImperativeHandle(ref, () => ({
    open() {
      setEnablePopup(true);
    },
  }));

  const onSubmitHandler = (data) => {
    addNew(data.instruction);
    setEnablePopup(false);
    // setFieldValue("");
  };

  return (
 
      <Modal show={enablePopup}>
        <Modal.Header closeButton onClick={closeModal}>
          <Modal.Title>Add Instructions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit(onSubmitHandler)} id="instructionPopup" method="POST">
          <div>
            <div>
              Enter your Instruction
            </div>
            <input type="text" name="instruction" {...register("instruction")}/>
            <small className="text-danger">{errors.instruction?.message}</small>
          </div> 
          </form>  
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModal}>
            Close
          </Button>
          <Button variant="dark" form="instructionPopup" type="submit">
            <span>Add</span>
          </Button>
        </Modal.Footer>
      </Modal>
  );
};

export default forwardRef(InstructionPopup);
