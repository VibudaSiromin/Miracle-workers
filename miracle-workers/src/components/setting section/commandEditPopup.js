import React from "react";
import { useState } from "react";
import { Modal, Button} from "react-bootstrap";
import { forwardRef, useImperativeHandle} from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Checkbox from '@mui/material/Checkbox';

const CommandEditPopup = ({command, onEdit}, ref) => {

  const schema = yup.object().shape({
    command: yup.string().required("Cannot Be Empty"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
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
    onEdit(data.command,binaryValue,command.id);
    console.log("GOOOOOOOOOOOOOO",data.command,binaryValue,command.id)

    setEnablePopup(false);

    // setFieldValue("");
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} id="commandEditPopup" method="POST">
      <Modal show={enablePopup}>
        <Modal.Header closeButton onClick={closeModal}>
          <Modal.Title>Edit Commands</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                Locator<Checkbox name="locator" {...register("locator")}/> 
                Data <Checkbox name="data" {...register("data")}/>
                Branch Selection<Checkbox name="branchSelection"  {...register("branchSelection")}/>
            </div>
          </div>               
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
    </form>
  );
};

export default forwardRef(CommandEditPopup);
