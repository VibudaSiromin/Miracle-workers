import React from 'react'
import { useRef,useState } from 'react';
import {SiMicrosoftexcel} from 'react-icons/si';
import { TfiReload } from "react-icons/tfi";
import {MdDelete} from 'react-icons/md';
import {BsFillFileEarmarkExcelFill} from 'react-icons/bs';
import { Button } from "react-bootstrap";
import MessageBox from './MessageBox';
import * as XLSX from 'xlsx'
import './FileUploader.css';

const FileUploader = (props) => { 

	 // drag state
	 const [dragActive, setDragActive] = useState(false);
	 const [file,setFile]=useState(null);
	 const [buttonStatus,setButtonStatus]=useState(false);
	 const [deleteMsgStatus,setDeleteMsgStatus]=useState(false);
	 const [reloadMsgStatus,setReloadMsgStatus]=useState(false);
	

	 const modalRefA=useRef();
	 const modalRefB=useRef();
	 // ref
	 const inputRef = React.useRef(null);
	 // handle drag events
	 const handleDrag = (event) =>{
	   event.preventDefault();
	   event.stopPropagation();
	   if (event.type === "dragenter" || event.type === "dragover") {
		 setDragActive(true);
	   } else if (event.type === "dragleave") {
		 setDragActive(false);
	   }
	 };

	 // triggers when file is dropped
	 const handleDrop = (event) =>{
		event.preventDefault();
		event.stopPropagation();
		setDragActive(false);
		if (event.dataTransfer.files && event.dataTransfer.files[0]) {
		   //handleFiles(event.dataTransfer.files);
		   const excelFile=event.dataTransfer.files[0];
		   const excelReader=new FileReader();//read the content as binary string
		   setFile(excelFile);

		   //after reading the content completly 'onload' function will be triggered!
		   excelReader.onload=(event)=>{
			//parse data
			const bstr=event.target.result;
			//creating Excel work book
			const excelWorkBook=XLSX.read(bstr,{type:'binary'}); //need to provide two parameters.1st binary string data,2nd type(object)
			//selecting first work sheet name
			const excelSheetName=excelWorkBook.SheetNames[0];
			//get data from the selected sheet name
			const excelWorkSheetData=excelWorkBook.Sheets[excelSheetName];
			//convert sheet data to JSON format
			const jsonData=XLSX.utils.sheet_to_json(excelWorkSheetData,{header:1});
			console.log('Atlas ',jsonData)
			const headers=jsonData[0];//headers of excel table headers is an array
			props.getFileHeaders(headers);//parse header array to Data(excel).js
			console.log('SPC ',headers);
			// excelWorkBook.SheetNames.
			const rowObject=XLSX.utils.sheet_to_json(excelWorkSheetData,{header:undefined});
			props.getFileData(rowObject);//parse file data as an array of objects(JSON type) to Data(excel).js
			console.log('BMW ',rowObject);//rowObject is an array of object.
	   }

	    excelReader.readAsBinaryString(excelFile);//when this function is invoked.It will immediatly call above excelReader.onload function.
  
		}
	  };

 
  	 const handleChange = (event) => {
    	 event.preventDefault();
    	 if (event.target.files && event.target.files[0]) {
			   const excelFile=event.target.files[0];
			   const excelReader=new FileReader();
			   setFile(excelFile);	

			   excelReader.onload=(event)=>{
					//parse data
					const bstr=event.target.result;
					//creating Excel work book
					const excelWorkBook=XLSX.read(bstr,{type:'binary'}); //need to provide two parameters.1st data,2nd type(object)
					//selecting first work sheet name
					const excelSheetName=excelWorkBook.SheetNames[0];
					//get data from the selected sheet name
					const excelWorkSheetData=excelWorkBook.Sheets[excelSheetName];
					//convert sheet data to JSON format
					const jsonData=XLSX.utils.sheet_to_json(excelWorkSheetData,{header:1});
					console.log('Atlas ',jsonData)
					const headers=jsonData[0];//headers of excel table
					props.getFileHeaders(headers);//parse header array to Data(excel).js
					console.log('SPC ',headers);
					// excelWorkBook.SheetNames.
					const rowObject=XLSX.utils.sheet_to_json(excelWorkSheetData,{header:undefined});
					props.getFileData(rowObject);//parse file data as an array of objects(JSON type) to Data(excel).js
					console.log('BMW ',rowObject);
			   }
	
			   excelReader.readAsBinaryString(excelFile);//when this function is invoked.It will immediatly call above excelReader.onload function.
			 
    	 }
  	 };

	 const handleFiledeletion = () => {
		modalRefA.current.log('Do you want to delete '+file.name+' ?')
		
	 }

	 const fileDeletion = () => {
			setFile(null);
			props.deleteFileHeaders();//call fileHeadersDeleteHandler in Data(Excel).js
			props.deleteFileData();//call fileDataDeleteHandler in Data(Excel).js
		
	 }

	 	   // triggers when file is selected with click
	 const handleReload = () => {
		modalRefB.current.log('Do you want to reload '+file.name+' again?')
			
	 } 

	 const fileReload = () => {
		const excelReader=new FileReader();

			  	 excelReader.onload=(event)=>{
					//parse data
					const bstr=event.target.result;
					//creating Excel work book
					const excelWorkBook=XLSX.read(bstr,{type:'binary'}); //need to provide two parameters.1st data,2nd type(object)
					//selecting first work sheet name
					const excelSheetName=excelWorkBook.SheetNames[0];
					//get data from the selected sheet name
					const excelWorkSheetData=excelWorkBook.Sheets[excelSheetName];
					//convert sheet data to JSON format
					const jsonData=XLSX.utils.sheet_to_json(excelWorkSheetData,{header:1});
					console.log('Atlas ',jsonData)
					const headers=jsonData[0];//headers of excel table
					props.reloadFileHeaders(headers);//parse header array to Data(excel).js
					console.log('SPC ',headers);
					// excelWorkBook.SheetNames.
					const rowObject=XLSX.utils.sheet_to_json(excelWorkSheetData,{header:undefined});
					props.reloadFileData(rowObject);//parse file data as an array of objects(JSON type) to Data(excel).js
					console.log('BMW ',rowObject);
			   }
	
			   excelReader.readAsBinaryString(file);//when this function is invoked.It will immediatly call above excelReader.onload function.
	 }
	 
  
// triggers the input when the button is clicked
  	 const onButtonClick = () => {
    	 inputRef.current.click();
  	 };

// Enable or disable the 'ADD' & 'COLUMN' buttons
	 	 

	if(file){
		// console.log('sharp ',file.name);
		return(
			<>
			<div className="container-fluid position-relative file-uploader-container">
				<div className="position-absolute top-0 start-50 translate-middle-x"> 
				<form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
						  <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
							<div>
							<SiMicrosoftexcel size="60px" color="white" opacity={0.5}></SiMicrosoftexcel>
							<br/>
							<br/>
							  <p>File was successfully uploaded!</p>
							  <div className='file-holder'>
								<div className="fade-text-container">
									<div className="fade-text"><div><BsFillFileEarmarkExcelFill></BsFillFileEarmarkExcelFill></div><div>{file.name}</div></div>
								</div>
								<div className="file-holder-icons-container">
									<div ClassName="file-holder-icons">
										<TfiReload color="white" size="25px" onClick={handleReload}></TfiReload>
									</div>
									<div ClassName="file-holder-icons">
										<MdDelete color="white" size="25px" onClick={handleFiledeletion}></MdDelete>
									</div>
									
									
									{/* <Button type="button" className="btn btn-info"> Reload</Button>
									<Button type="button" className="btn btn-info"> Delete</Button> */}
								</div>
							  </div>
							  {/* <button className="upload-button" onClick={onButtonClick}>Upload a file</button> */}
							</div> 
						  </label>
						  { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
				</form>
				<div>
					
				</div>
				</div>
			</div>
			<MessageBox ref={modalRefA} modalFooterfuncOne={fileDeletion} id='deleteModal'></MessageBox>
			<MessageBox ref={modalRefB} modalFooterfuncOne={fileReload} id='reloadModal'></MessageBox>						
			</>
			
		);
	 }else{
		return(
			<div className="container-fluid position-relative file-uploader-container">
				<div className="position-absolute top-0 start-50 translate-middle-x"> 
				<form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
						  <input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
						  <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
							<div>
							<SiMicrosoftexcel size="50px"></SiMicrosoftexcel>
							<br/>
							<br/>
							  <p>Drag and drop your Excel file here or</p>
							  <button className="upload-button" onClick={onButtonClick}>Upload a file</button>
							</div> 
						  </label>
						  { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
				</form>
				{/* <div>
					<Button type="button" className="btn btn-info"><TfiReload></TfiReload> Reload</Button>
					<Button type="button" className="btn btn-info"><MdDelete></MdDelete> Delete</Button>
				</div> */}
				</div>
			</div>
			
		);

	 }

	
}

export default FileUploader;