import React, { useRef,useState } from "react";
import { Button } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import EditModalDialog from "./EditPopUpWindow";

const Raw = ({ testStep, rawIndex, onDelete, onEdit }) => {

  const modalRef=useRef();
  const editButtonHandler = () => {
    console.log('Captian Price');
    modalRef.current.log();
    console.log(testStep);
  };

  console.log("raw eliye index"+rawIndex);

  const onEditHandler = (editedTableData) => {
    console.log('PVT.Miller');
    console.log('Index in raw hihi'+rawIndex);
    //console.log('Index in raw props'+myindex);
    onEdit(editedTableData,rawIndex);
  }

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
        index={rawIndex}
        onEdit={onEditHandler}
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
          <Button variant="success" onClick={()=>editButtonHandler()}>
            Edit
          </Button>
        </td>
        <td>
          {" "}
          <Button
            variant="danger"
            onClick={() => {
              onDelete(rawIndex);
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
