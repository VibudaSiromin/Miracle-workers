import React, { useState } from 'react'
import Heading from '../components/Heading';
import FileUploader from '../components/FileUploader'

const ExcelSection = (props) => {
  const [fileHeaders,setFileHeaders]=useState([]);
  const [fileData,setFileData]=useState([]);

  const fileHeadersHandler = (Headers) => {
    const excelHeaders=[...fileHeaders,...Headers]
    setFileHeaders(excelHeaders); 
  }

  const fileDataHandler = (data) => {
    const excelData=[...fileData,...data];
    setFileData(excelData);
  }

  console.log('MSI mchn');

return(
        <>
          <FileUploader getFileHeaders={fileHeadersHandler} getFileData={fileDataHandler}></FileUploader>
          <Heading noFields={[1]} generalPurpose={true}  addHeading="addHeading" removeHeading={true} initialHeading={fileHeaders} initialData={fileData}></Heading>
        </>
        
);
}

export default ExcelSection;