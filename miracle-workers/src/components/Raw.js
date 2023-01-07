import React from "react";

const Raw = ({ testStep }) => {
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
    </tr>
  );
};

export default Raw;
