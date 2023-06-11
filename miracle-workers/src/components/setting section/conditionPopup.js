import React from "react";
import { useState } from "react";
import { Modal, Button} from "react-bootstrap";
import { forwardRef, useImperativeHandle} from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const ConditionPopup = ({ value, addNew}, ref) => {

  const schema = yup.object().shape({
    condition: yup.string().required("Cannot Be Empty"),

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
    addNew(data.condition);
    setEnablePopup(false);
    // setFieldValue("");
  };

  return (
 
      <Modal show={enablePopup}>
        <Modal.Header closeButton onClick={closeModal}>
          <Modal.Title>Add Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit(onSubmitHandler)} id="conditionPopup" method="POST">
          <div>
            <div>
              Enter your condition
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
          <Button variant="dark" form="conditionPopup" type="submit">
            <span>Add</span>
          </Button>
        </Modal.Footer>
      </Modal>
  );
};

export default forwardRef(ConditionPopup);
