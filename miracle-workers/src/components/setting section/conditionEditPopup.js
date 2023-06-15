import React from "react";
import { useState } from "react";
import { Modal, Button} from "react-bootstrap";
import { forwardRef, useImperativeHandle} from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Checkbox from '@mui/material/Checkbox';

const ConditionEditPopup = ({item, onEdit}, ref) => {

  const schema = yup.object().shape({
    condition: yup.string().required("Condition cannot Be Empty")
    .matches(/^[A-Z][a-zA-Z]*$/, "Condition must start with an uppercase letter")
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues:{
        condition:item.name,
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
    onEdit(data.condition,item.id,item.name);
    setEnablePopup(false);
  };

  return (
      <Modal show={enablePopup}>
        <Modal.Header closeButton onClick={closeModal}>
          <Modal.Title>Edit Condition</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit(onSubmitHandler)} id="conditionEditPopup" method="POST">

          <div>
            <div>
              Edit Condition
            </div>
            <input type="text" name="condition" {...register("condition")}/>
            <small className="text-danger">{errors.condition?.message}</small>
          </div>  
          </form>
             
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModal}>
            Close
          </Button>
          <Button variant="dark" form="conditionEditPopup" type="submit">
            <span>Edit</span>
          </Button>
        </Modal.Footer>
      </Modal>
  );
};

export default forwardRef(ConditionEditPopup);
