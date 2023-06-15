import React from "react";
import { useState } from "react";
import { Modal, Button} from "react-bootstrap";
import { forwardRef, useImperativeHandle} from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const InstructionEditPopup = ({item, onEdit}, ref) => {

  const schema = yup.object().shape({
    instruction: yup.string().required("Instruction cannot Be Empty")
    .matches(/^#[a-z]+$/, {
        message: "First character must be '#' and remaining letters should be lowercase letters ",
        excludeEmptyString: true,
        excludeInfinity: true,
      })
      .test(
        "is-first-character-hash",
        "First character must be '#'",
        (value) => value && value[0] === "#"
      )
      .test(
        "is-remaining-lowercase-letters",
        "Remaining characters should be lowercase English letters",
        (value) => value && /^[a-z]+$/.test(value.slice(1))
      ),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues:{
        instruction:item.name,
    }
  });

  console.log(item)

  const [enablePopup, setEnablePopup] = useState(false);

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
    onEdit(data.instruction,item.id,item.name);
    setEnablePopup(false);
  };

  return (
      <Modal show={enablePopup}>
        <Modal.Header closeButton onClick={closeModal}>
          <Modal.Title>Edit Instruction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit(onSubmitHandler)} id="instructionEditPopup" method="POST">

          <div>
            <div>
              Edit Instruction
            </div>
            <input type="text" name="instruction" {...register("instruction")}/>
            <div>
            <small className="text-danger">{errors.instruction?.message}</small>
            </div>
          </div>  
          </form>
             
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
  );
};

export default forwardRef(InstructionEditPopup);
