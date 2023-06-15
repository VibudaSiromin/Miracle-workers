import React from "react";
import { useState } from "react";
import { Modal, Button} from "react-bootstrap";
import { forwardRef, useImperativeHandle} from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Checkbox from '@mui/material/Checkbox';

const ConditionEditPopup = ({command, onEdit}, ref) => {

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
    ),
  });

  const { register, handleSubmit, formState: { errors },watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues:{
      command:command.name,
      locator:command.binaryValue[0]==1?true:false,
      data:command.binaryValue[1]==1?true:false,
      branchSelection:command.binaryValue[2]==1?true:false,
    }
  });

  console.log(command)

  const [enablePopup, setEnablePopup] = useState(false);


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
    onEdit(data.command,binaryValue,command.id,command);
    console.log("GOOOOOOOOOOOOOO",data.command,binaryValue,command.id)

    setEnablePopup(false);

    // setFieldValue("");
  };

  return (
      <Modal show={enablePopup}>
        <Modal.Header closeButton onClick={closeModal}>
          <Modal.Title>Edit Commands</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit(onSubmitHandler)} id="commandEditPopup" method="POST">

          <div>
            <div>
              Edit command
            </div>
            <input type="text" name="command" {...register("command")}/>
            <small className="text-danger">{errors.command?.message}</small>
            <div>
              <div>
                Choose Required Fields for relevant command
              </div>
                Locator<Checkbox name="locator" checked={watch("locator")} {...register("locator")}/> 
                Data <Checkbox name="data" checked={watch("data")} {...register("data")}/>
                Branch Selection<Checkbox name="branchSelection" checked={watch("branchSelection")} {...register("branchSelection")}/>
            </div>
          </div>  
          </form>
             
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModal}>
            Close
          </Button>
          <Button variant="dark" form="commandEditPopup" type="submit">
            <span>Edit</span>
          </Button>
        </Modal.Footer>
      </Modal>
  );
};

export default forwardRef(ConditionEditPopup);
