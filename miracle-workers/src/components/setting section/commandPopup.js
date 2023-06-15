import React from "react";
import { useState } from "react";
import { Modal, Button} from "react-bootstrap";
import { forwardRef, useImperativeHandle} from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Checkbox from '@mui/material/Checkbox';

const CommandPopup = ({ value, addNew}, ref) => {

  const schema = yup.object().shape({
    command: yup.string().required("Command cannot be empty")
            .matches(/^[A-Z]/, "First character must be uppercase")
            .matches(/\./, "Command must include at least one dot (.) character")
            .test(
              "is-uppercase-after-dot",
              (value) => {
                if (!value) return new yup.ValidationError("Uppercase must be there after the dot character", null, "command");
                const dotIndex = value.indexOf(".");
                if (dotIndex === -1 || dotIndex === value.length - 1) return false; // Fail validation if no dot or dot is the last character
                return value[dotIndex + 1].match(/[A-Z]/);
              }
            )
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });


  const [enablePopup, setEnablePopup] = useState(false);

  console.log(value);

  // const [fieldValue,setFieldValue]=useState(value);
  // console.log(fieldValue)
  // const inputHandler=(event) => {
  //   setFieldValue(event.target.value);
  // }

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
    let binaryValue=""

    if(data.locator==true){
      binaryValue=binaryValue.concat("1");
    }else{
      binaryValue=binaryValue.concat("0");
    }
    if(data.data==true){
      binaryValue=binaryValue.concat("1");
    }else{
      binaryValue=binaryValue.concat("0");
    }
    if(data.branchSelection==true){
      binaryValue=binaryValue.concat("1");
    }else{
      binaryValue=binaryValue.concat("0");
    }
    addNew(data.command,binaryValue);
    setEnablePopup(false);
    // setFieldValue("");
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} id="commandPopup" method="POST">
      <Modal show={enablePopup}>
        <Modal.Header closeButton onClick={closeModal}>
          <Modal.Title>Add Commands</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              Enter your command
            </div>
            <input type="text" name="command" {...register("command")}/>
            <small className="text-danger">{errors.command?.message}</small>
            <div>
              <div>
                Choose Required Fields for relevant command
              </div>
                Locator<Checkbox name="locator" {...register("locator")}/> 
                Data <Checkbox name="data" {...register("data")}/>
                Branch Selection<Checkbox name="branchSelection"{...register("branchSelection")}/>
            </div>
          </div>               
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModal}>
            Close
          </Button>
          <Button variant="dark" form="commandPopup" type="submit">
            <span>Add</span>
          </Button>
        </Modal.Footer>
      </Modal>
    </form>
  );
};

export default forwardRef(CommandPopup);
