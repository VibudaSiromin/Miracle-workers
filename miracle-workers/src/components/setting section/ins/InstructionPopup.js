import React from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { forwardRef, useImperativeHandle} from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const InstructionPopup = ({value,addNew}, ref) => {

const schema = yup.object().shape({
  instruction: yup.string().required("Cannot enter a empty value").trim().test('firstCharHash', 'First character should be #', (value) => {
    if (value && value.charAt(0) !== '#') {
      return false;
    }
    return true;
  }), 
});
    
const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues:{
          instruction:""
        }
});
  const [enablePopup, setEnablePopup] = useState(false);

  console.log(value);

  const closeModal = () => {
    setEnablePopup(false);
  };

  useImperativeHandle(ref, () => ({
    open() {
      setEnablePopup(true);
    },
  }));

  const onSubmitHandler = (data) => {
    addNew(data.instruction);
    setEnablePopup(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} id="instructionPopup" method="POST">
      <Modal show={enablePopup}>
        <Modal.Header closeButton onClick={closeModal}>
          <Modal.Title>Add Instruction</Modal.Title>
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
          <Button variant="dark" form="instructionPopup" type="submit">
            <span>Add</span>
          </Button>
        </Modal.Footer>
      </Modal>
    </form>
  );
};

export default forwardRef(InstructionPopup);
