import React, { useEffect } from 'react'
import { useRef, useState } from 'react';
import { SiMicrosoftexcel } from 'react-icons/si';
import { BsFillFileEarmarkExcelFill } from 'react-icons/bs';
import MessageBox from './MessageBox';
import * as XLSX from 'xlsx'
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import axios from 'axios';
import './FileUploader.css';

const FileUploader = (props) => {

	// drag state
	const [dragActive, setDragActive] = useState(false);
	const [file, setFile] = useState(null);
	const [buttonStatus, setButtonStatus] = useState(false);
	const [deleteMsgStatus, setDeleteMsgStatus] = useState(false);
	const [reloadMsgStatus, setReloadMsgStatus] = useState(false);
	const [excelFileName, setExcelFileName] = useState('');
	const { lname, tname, cname, dname } = useParams();
	//const [isMount,setIsMount] = useParams(false);

	const modalRefA = useRef();
	const modalRefB = useRef();
	const modalRefFileTypeError = useRef();
	// ref
	const inputRef = React.useRef(null);

	const allowedFileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

	const dispatch = useDispatch();

	useEffect(() => {
		axios
			.get('http://localhost:5000/dataExcel/excelFileNames', {
				params: {
					dname: dname
				}
			})
			.then((res) => {
				const fileName = res.data.excelFileName;
				console.log('duck', fileName)
				setExcelFileName(fileName);
			})
			.catch((err) => {
				console.log(err);
			})

	}, [dname])




	// handle drag events
	const handleDrag = (event) => {
		event.preventDefault();
		event.stopPropagation();
		if (event.type === "dragenter" || event.type === "dragover") {
			setDragActive(true);
		} else if (event.type === "dragleave") {
			setDragActive(false);
		}
	};

	// triggers when file is dropped
	const handleDrop = async (event) => {
		event.preventDefault();
		event.stopPropagation();
		setDragActive(false);
		if (event.dataTransfer.files && event.dataTransfer.files[0]) {

			if (event.dataTransfer.files[0].type === allowedFileType) {

				//handleFiles(event.dataTransfer.files);
				const excelFile = event.dataTransfer.files[0];

				const excelReader = new FileReader();//read the content as binary string
				setFile(excelFile);
				setExcelFileName(excelFile.name);

				//after reading the content completly 'onload' function will be triggered!
				excelReader.onload = (event) => {
					//parse data
					const bstr = event.target.result;
					//creating Excel work book
					const excelWorkBook = XLSX.read(bstr, { type: 'binary' }); //need to provide two parameters.1st binary string data,2nd type(object)
					//selecting first work sheet name
					// const excelSheetName=excelWorkBook.SheetNames[0];
					// //get data from the selected sheet name
					// const excelWorkSheetData=excelWorkBook.Sheets[excelSheetName];
					// //const excelWorkSheetsArray=
					// //convert sheet data to JSON format
					// const jsonData=XLSX.utils.sheet_to_json(excelWorkSheetData,{header:1});
					// console.log(excelWorkBook,"aligator");
					// console.log('Atlas ',jsonData)
					// const headers=jsonData[0];
					// props.getFileHeaders(headers);//parse header array to Data(excel).js
					// console.log('SPC ',headers);
					// // excelWorkBook.SheetNames.
					// const rowObject=XLSX.utils.sheet_to_json(excelWorkSheetData,{header:undefined});
					// props.getFileData(rowObject);//parse file data as an array of objects(JSON type) to Data(excel).js
					// props.getExcelFileName(excelFile.name);

					const sheetObjectArray = Object.values(excelWorkBook.Sheets);
					const sheetNames = excelWorkBook.SheetNames;
					let counter = 0;
					console.log("OPEL", sheetNames);
					let dataSection = sheetObjectArray.map((sheetObject) => {
						const jsonData = XLSX.utils.sheet_to_json(sheetObject, { header: 1 });
						const dataSheetName = sheetNames[counter] + "E";
						const headersPerSheets = jsonData[0];
						const rowObject = XLSX.utils.sheet_to_json(sheetObject, { header: undefined });

						if (counter === 0) {
							counter++;
							return [dataSheetName, headersPerSheets, ...rowObject];
						} else {
							counter++;
							return [dataSheetName, headersPerSheets, [excelFile.name], ...rowObject];
						}
					})
						;
					console.log('BUCKET2', dataSection[0][1]);
					console.log('BUCKET3', dataSection)

					//providing data and information of first data sheet to Data(excel).js
					props.getFileHeaders(dataSection[0][1]);//headers of excel table headers is an array
					props.getFileData(dataSection[0].slice(2));//parse file data as an array of objects(JSON type) to Data(excel).js
					props.getExcelFileName(excelFile.name);

					//store the data of rest of the sheets if exists
					if (dataSection.length > 1) {
						axios
							.post('http://localhost:5000/dataExcel/dataPageContent', {

								dataPageContent: dataSection.slice(1)
							})
							.then((res) => {
								dispatch({ type: 'RENDERING_NAV_BAR' });
							})
							.catch((err) => {
								console.log(err);
							})
					}
				}
				excelReader.readAsBinaryString(excelFile);//when this function is invoked.It will immediatly call above excelReader.onload function.

			} else {
				console.log('not allowedAAAAA')
				modalRefFileTypeError.current.log('You can only upload .xlsx files');
				return


			}



		}
	};


	const handleChange = async (event) => {
		event.preventDefault();
		//event.stopPropagation();
		if (event.target.files && event.target.files[0]) {

			if (event.target.files[0].type === allowedFileType) {

				const excelFile = event.target.files[0];
				const excelReader = new FileReader();
				setFile(excelFile);
				setExcelFileName(excelFile.name);

				console.log('parrot', excelFile);
				console.log('parrot2', excelFile.type);


				excelReader.onload = (event) => {
					//parse data
					const bstr = event.target.result;
					//creating Excel work book
					const excelWorkBook = XLSX.read(bstr, { type: 'binary' }); //need to provide two parameters.1st data,2nd type(object)
					//selecting first work sheet name
					// const excelSheetName = excelWorkBook.SheetNames[0];
					// //get data from the selected sheet name
					// const excelWorkSheetData = excelWorkBook.Sheets[excelSheetName];
					// //convert sheet data to JSON format
					// const jsonData = XLSX.utils.sheet_to_json(excelWorkSheetData, { header: 1 });
					// console.log('Atlas ', jsonData)
					// const headers = jsonData[0];//headers of excel table
					// props.getFileHeaders(headers);//parse header array to Data(excel).js
					// console.log('SPC ', headers);
					// // excelWorkBook.SheetNames.
					// const rowObject = XLSX.utils.sheet_to_json(excelWorkSheetData, { header: undefined });
					// props.getFileData(rowObject);//parse file data as an array of objects(JSON type) to Data(excel).js
					// props.getExcelFileName(excelFile.name);
					// console.log('BMW ', rowObject);

					const sheetObjectArray = Object.values(excelWorkBook.Sheets);
					const sheetNames = excelWorkBook.SheetNames;
					let counter = 0;
					console.log("OPEL", sheetNames);
					let dataSection = sheetObjectArray.map((sheetObject) => {
						const jsonData = XLSX.utils.sheet_to_json(sheetObject, { header: 1 });
						const dataSheetName = sheetNames[counter] + "E";
						const headersPerSheets = jsonData[0];
						const rowObject = XLSX.utils.sheet_to_json(sheetObject, { header: undefined });

						if (counter === 0) {
							counter++;
							return [dataSheetName, headersPerSheets, ...rowObject];
						} else {
							counter++;
							return [dataSheetName, headersPerSheets, [excelFile.name], ...rowObject];
						}
					})
						;
					console.log('BUCKET2', dataSection[0][1]);
					console.log('BUCKET3', dataSection)

					//providing data and information of first data sheet to Data(excel).js
					props.getFileHeaders(dataSection[0][1]);//headers of excel table headers is an array
					props.getFileData(dataSection[0].slice(2));//parse file data as an array of objects(JSON type) to Data(excel).js
					props.getExcelFileName(excelFile.name);

					//store the data of rest of the sheets if exists
					if (dataSection.length > 1) {
						axios
							.post('http://localhost:5000/dataExcel/dataPageContent', {

								dataPageContent: dataSection.slice(1)
							})
							.then((res) => {
								dispatch({ type: 'RENDERING_NAV_BAR' });
							})
							.catch((err) => {
								console.log(err);
							})
					}
				}

				excelReader.readAsBinaryString(excelFile);//when this function is invoked.It will immediatly call above excelReader.onload function.


			} else {
				console.log('not allowedBBB');
				modalRefFileTypeError.current.log('You can only upload .xlsx files');
				return
			}

		}
	};

	const handleFiledeletion = () => {
		modalRefA.current.log('Do you want to delete ' + file.name + ' ?')

	}

	const fileDeletion = () => {
		setFile(null);
		props.deleteFileHeaders();//call fileHeadersDeleteHandler in Data(Excel).js
		props.deleteFileData();//call fileDataDeleteHandler in Data(Excel).js

	}

	// triggers when file is selected with click
	const handleReload = () => {
		modalRefB.current.log('Do you want to reload ' + file.name + ' again?')

	}

	const fileReload = () => {
		const excelReader = new FileReader();

		excelReader.onload = (event) => {
			//parse data
			const bstr = event.target.result;
			//creating Excel work book
			const excelWorkBook = XLSX.read(bstr, { type: 'binary' }); //need to provide two parameters.1st data,2nd type(object)
			//selecting first work sheet name
			const excelSheetName = excelWorkBook.SheetNames[0];
			//get data from the selected sheet name
			const excelWorkSheetData = excelWorkBook.Sheets[excelSheetName];
			//convert sheet data to JSON format
			const jsonData = XLSX.utils.sheet_to_json(excelWorkSheetData, { header: 1 });
			console.log('Atlas ', jsonData)
			const headers = jsonData[0];//headers of excel table
			props.reloadFileHeaders(headers);//parse header array to Data(excel).js
			console.log('SPC ', headers);
			// excelWorkBook.SheetNames.
			const rowObject = XLSX.utils.sheet_to_json(excelWorkSheetData, { header: undefined });
			props.reloadFileData(rowObject);//parse file data as an array of objects(JSON type) to Data(excel).js
			console.log('BMW ', rowObject);
		}

		excelReader.readAsBinaryString(file);//when this function is invoked.It will immediatly call above excelReader.onload function.
	}


	// triggers the input when the button is clicked
	const onButtonClick = () => {
		inputRef.current.click();
	};

	//file type error handler
	const fileTypeErrorHandler = (event, modalId) => {

	}

	// Enable or disable the 'ADD' & 'COLUMN' buttons


	if (file || excelFileName) {
		// console.log('sharp ',file.name);
		return (
			<>
				<div className="container-fluid position-relative file-uploader-container">
					<div className="position-absolute top-0 start-50 translate-middle-x">
						<form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
							<label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""}>
								<div>
									<SiMicrosoftexcel size="60px" color="white" opacity={0.5}></SiMicrosoftexcel>
									<br />
									<br />
									<p>File was successfully uploaded!</p>
									<div className='file-holder'>
										<div className="fade-text-container">
											<div className="fade-text"><div><BsFillFileEarmarkExcelFill></BsFillFileEarmarkExcelFill></div><div>{excelFileName}</div></div>
										</div>
										<div className="file-holder-icons-container">
											<div ClassName="file-holder-icons">
												{/* <TfiReload color="white" size="25px" onClick={handleReload}></TfiReload> */}
											</div>
											<div ClassName="file-holder-icons">
												{/* <MdDelete color="white" size="25px" onClick={handleFiledeletion}></MdDelete> */}
											</div>


											{/* <Button type="button" className="btn btn-info"> Reload</Button>
									<Button type="button" className="btn btn-info"> Delete</Button> */}
										</div>
									</div>
									{/* <button className="upload-button" onClick={onButtonClick}>Upload a file</button> */}
								</div>
							</label>
							{dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
						</form>
						<div>

						</div>
					</div>
				</div>
				<MessageBox ref={modalRefA} modalFooterfuncOne={fileDeletion} id='deleteModal' modalTitle={'New Project'} icon={''} btnValues={['save&create', 'create']} isTwobtn={true}></MessageBox>
				<MessageBox ref={modalRefB} modalFooterfuncOne={fileReload} id='reloadModal' modalTitle={'New Project'} icon={''} btnValues={['save&create', 'create']} isTwobtn={true}></MessageBox>
				<MessageBox ref={modalRefFileTypeError} modalFooterfuncOne={fileTypeErrorHandler} id='fileTypeErrorOne' modalTitle={'New Project'} icon={''} btnValues={['OK']} isTwobtn={false}></MessageBox>
			</>

		);
	} else {
		return (
			<>
				<div className="container-fluid position-relative file-uploader-container">
					<div className="position-absolute top-0 start-50 translate-middle-x">
						<form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
							<input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
							<label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""}>
								<div>
									<SiMicrosoftexcel size="50px"></SiMicrosoftexcel>
									<br />
									<br />
									<p>Drag and drop your Excel file here or</p>
									<button className="upload-button" onClick={onButtonClick}>Upload a file</button>
								</div>
							</label>
							{dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
						</form>
						{/* <div>
					<Button type="button" className="btn btn-info"><TfiReload></TfiReload> Reload</Button>
					<Button type="button" className="btn btn-info"><MdDelete></MdDelete> Delete</Button>
				</div> */}
					</div>
				</div>
				<MessageBox ref={modalRefFileTypeError} modalFooterfuncOne={fileTypeErrorHandler} id='fileTypeErrorTwo' modalTitle={'Warning!'} icon={''} btnValues={['OK']} isTwobtn={false}></MessageBox>
			</>
		);

	}


}

export default FileUploader;