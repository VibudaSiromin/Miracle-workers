import React, { useRef,useState } from "react";
import { Button } from "react-bootstrap";
import EditModalDialog from "./EditPopUpWindow";

const Raw = ({ testStep, index, isEditButtonClicked, onDelete, onEdit }) => {

  const modalRef=useRef();

  const editHandler = () => {
    console.log('Captian Price');
    modalRef.current.log();
    console.log(testStep);
  };

  return (
    <>
      <EditModalDialog
        enableChainPopUps={true}
        ref={modalRef}
        title={[
          "group",
          "instruction",
          "command",
          "locator",
          "locatorParameter",
          "data",
          "swapResult",
          "branchSelection",
          "action",
          "comment",
        ]}
        noFields={[3, 7]}
        rawNumber={null}
        raw={testStep} 
        // onCloseClick={editHandler} 
        // onEdit={dataHandler} 
        index={index}
      ></EditModalDialog>
      <tr>
        <td>{testStep.group}</td>
        <td>{testStep.instruction}</td>
        <td>{testStep.command}</td>
        <td>{testStep.locator}</td>
        <td>{testStep.locatorParameter}</td>
        <td>{testStep.data}</td>
        <td>{testStep.swapResult}</td>
        <td>{testStep.branchSelection}</td>
        <td>{testStep.action}</td>
        <td>{testStep.comment}</td>
        <td>
          {" "}
          <Button variant="success" onClick={()=>editHandler()}>
            Edit
          </Button>
        </td>
        <td>
          {" "}
          <Button
            variant="danger"
            onClick={() => {
              onDelete(index);
            }}
          >
            Delete
          </Button>
        </td>
      </tr>
    </>
  );
};

export default Raw;
