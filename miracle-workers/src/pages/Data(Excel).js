import React, { useState } from 'react'
import Heading from '../components/Heading';
import FileUploader from '../components/FileUploader'
import Launcher from '../components/launcher/launcher';

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

  //same file data is loaded when reload button is clicked
  const reloadFileDataHandler = (data) => {
    const reloadExcelData=[...data];
    setFileData(reloadExcelData);
  }
  //same file headings are loaded when reload button is clicked
  const reloadFileHeadersHandler = (Headers) => {
    const reloadExcelHeaders=[...Headers];
    setFileHeaders(reloadExcelHeaders);
  }
  
  const fileDataDeleteHandler = () => {
    console.log('Cinamon');
    fileData.splice(0,fileData.length);
    const emptyFileData=[...fileData]
    setFileData(emptyFileData);
  }

  const fileHeaderdeleteHandler = () => {
    console.log('Garlic');
    fileHeaders.splice(0,fileHeaders.length)
    const emptyFileHeaders=[...fileHeaders]
    console.log()
    setFileHeaders(emptyFileHeaders)
  }

  console.log('MSI mchn');

return(
        <>
          <Launcher/>
          <FileUploader 
            getFileHeaders={fileHeadersHandler} 
            getFileData={fileDataHandler} 
            reloadFileData={reloadFileDataHandler} 
            reloadFileHeaders={reloadFileHeadersHandler} 
            deleteFileData={fileDataDeleteHandler}
            deleteFileHeaders={fileHeaderdeleteHandler}
            >
          </FileUploader>
          <Heading noFields={[1]} generalPurpose={true}  addHeading="addHeading" removeHeading={true} initialHeading={fileHeaders} initialData={fileData}></Heading>
        </>
        
);
}

export default ExcelSection;