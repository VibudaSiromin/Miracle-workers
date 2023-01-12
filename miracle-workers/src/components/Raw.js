import React, { useState } from "react";
import {Button } from "react-bootstrap";

const Raw = ({ testStep,index,isEditButtonClicked,onDelete}) => {


  return (
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
      <td> <Button variant="success">
        Edit
      </Button></td>
      <td> <Button variant="danger" onClick={() => {onDelete(index)}}>
        Delete
      </Button></td>
    </tr>
  );
};

export default Raw;
