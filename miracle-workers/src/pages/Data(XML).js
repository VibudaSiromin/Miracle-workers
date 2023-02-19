import React from "react";
import { Button } from "react-bootstrap";
import './Data(XML).css'

const XMLSection = () => {

    return(
        <table className="table table-dark">
  <thead>
    <tr>
      <th scope="col"><Button type="button" class="btn btn-success">Upload</Button><Button>Create</Button><Button type="button" className="btn btn-info">Clear</Button></th>
      <th scope="col">First</th>
    </tr>
  </thead>
  <tbody>
    <tr className="content">
      {/* <th scope="row">1</th> */}
      <td><></></td>
      <td>Mark</td>
    </tr>
    
  </tbody>
</table>
    );
}

export default XMLSection;