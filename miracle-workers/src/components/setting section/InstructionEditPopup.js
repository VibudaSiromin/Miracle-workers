import React from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { forwardRef, useImperativeHandle} from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const InstructionEditPopup = ({item,onEdit}, ref) => {

  const schema = yup.object().shape({
    instruction: yup.string().required("Cannot Be Empty"), 
  });
    
  const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
  });

  const [enablePopup, setEnablePopup] = useState(false);

  console.log(item);

  const closeModal = () => {
    setEnablePopup(false);
  };

  useImperativeHandle(ref, () => ({
    open() {
      setEnablePopup(true);
    },
  }));

  const onSubmitHandler = (data) => {
    // onEdit(data.instruction,item.id);
    setEnablePopup(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} id="instructionEditPopup" method="POST">
      <Modal show={enablePopup}>
        <Modal.Header closeButton onClick={closeModal}>
          <Modal.Title>Edit Instruction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" name="instruction" {...register("instruction")}/>
          <div>
          <small className="text-danger">{errors.instruction?.message}</small>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModal}>
            Close
          </Button>
          <Button variant="dark" form="instructionEditPopup" type="submit">
            <span>Edit</span>
          </Button>
        </Modal.Footer>
      </Modal>
    </form>
  );
};

export default forwardRef(InstructionEditPopup);
