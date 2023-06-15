import React from "react";
import { useState } from "react";
import { Modal, Button} from "react-bootstrap";
import { forwardRef, useImperativeHandle} from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import "./popup.css"

const BrowserPopup = ({ value, addNew}, ref) => {

  const schema = yup.object().shape({
    browser: yup.string().required("Browser cannot Be Empty")
    .matches(/^[A-Z][a-zA-Z]*$/, "Name must start with an uppercase letter"),

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
    addNew(data.browser);
    setEnablePopup(false);
    // setFieldValue("");
  };

  return (
 
      <Modal show={enablePopup}>
        <Modal.Header closeButton onClick={closeModal}>
          <Modal.Title>Add Browser</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit(onSubmitHandler)} id="browserPopup" method="POST">
          <div>
            <div>
              Enter your Browser
            </div>
            <input type="text" name="browser" {...register("browser")}/>
            <div>
            <small className="text-danger">{errors.browser?.message}</small>
            </div>
          </div> 
          </form>  
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModal}>
            Close
          </Button>
          <Button variant="dark" form="browserPopup" type="submit">
            <span>Add</span>
          </Button>
        </Modal.Footer>
      </Modal>
  );
};

export default forwardRef(BrowserPopup);
