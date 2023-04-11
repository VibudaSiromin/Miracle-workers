import React from "react";
import Raw from "./Raw";
import { useEffect,useState,useContext } from "react";
import ModalDialog from "./PopUpWindow";
import './Table.css'
import { Button } from "react-bootstrap";
import { saveAs } from 'file-saver';
import {MdClose,MdNavigateNext,MdNavigateBefore} from 'react-icons/md';
import { TbTableOff } from "react-icons/tb";
import './TableV1.css';
import IndexContext from '../contexts/indexContext'
import { useParams } from "react-router-dom";
import axios from 'axios';

const Table = (props) => {

  const {lname,tname,cname,dname} =useParams();
  let indexOfRaw;
  let tableFields=[];
  const [dashboradNavLinkId,setDashboradNavLinkId] =useState('link01');//new
  const [testRecord,setTestRecord]=useState();//new
  const [dataRecord,setDataRecord]=useState();//new
  const [componentRecord,setComponentRecord]=useState();//new
  const [locatorRecord,setLocatorRecord]=useState();//new
  const [testSectionName,setTestSectionName]=useState([]);//new
  const [testSection,setTestSection]=useState([]);//store whole data of test section(data of multiple test pages)
  const [testSteps, settestSteps] = useState([]);
  const [page,setPage]=useState([0]);//pagination
  const [nextButtonStatus,setNextButtonStatus]=useState(true);
  const [prevButtonStatus,setPrevButtonStatus]=useState(false);
  const [testStepsPerPage,setTestStepPerPage]=useState([]);
  const [rowsPerPage,setRowsPerPage]=useState(5);
  const {indexOfSection}=useContext(IndexContext);

  useEffect(() => {
    if(props.initialData!==undefined){
      settestSteps(props.initialData);
      setTestStepPerPage(props.initialData.slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage));
    }
    
  }, [props.initialData]);
  
  const getLocatorsByPage=() => {
    const url='http://localhost:5000/locators/'+lname;
    axios
    .get(url)
    .then((res)=>{
      const locators=res.data.locators;
      console.log("Yoooo",locators)
      settestSteps(locators);
    })
    .catch((err) => {
      console.log(err);
    });    
  }

  useEffect(()=>{
    getLocatorsByPage()
  },[lname,props.callingFrom])

  const editLocatorByPage=()=>{

  }

  const updateTestSteps = (tableData) => {
    if(props.callingFrom=='testSuites'){
      const url='http://localhost:5000/locators/'+tname
      const newTableData = [...testSteps,tableData];
      console.log('Gooooo',url); 
      axios
      .post(url,{
        editedLocator:newTableData
      })
      .then((res)=>{
        settestSteps(newTableData);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    if(props.callingFrom=='component'){
      const url='http://localhost:5000/locators/'+cname
      const newTableData = [...testSteps,tableData];
      console.log('Gooooo',url); 
      axios
      .post(url,{
        editedLocator:newTableData
      })
      .then((res)=>{
        settestSteps(newTableData);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    // const newTableData = [...testSteps,tableData];
    // console.log(newTableData);
    // settestSteps(newTableData);
  };

  const updateGeneralData = (tableData) => {
    if(props.callingFrom=='locator'){
      const url='http://localhost:5000/locators/'+lname
      const newTableData = [...testSteps,tableData];
      console.log('Gooooo',url); 
      axios
      .post(url,{
        editedLocator:newTableData
      })
      .then((res)=>{
        settestSteps(newTableData);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    if(props.callingFrom=='data'){
      const url='http://localhost:5000/data/'+dname
      const newTableData = [...testSteps,tableData];
      axios
      .post(url,{
        editedLocator:newTableData
      })
      .then((res)=>{
        settestSteps(newTableData);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    console.log('Glock');
    // const newTableData = [...testSteps,tableData];
    // console.log('student ',newTableData);
    // settestSteps(newTableData);
  };

   const editHandler = (editedTableData,index) => {
    if(props.callingFrom=='locator'){
      const url='http://localhost:5000/locators/'+lname
      const applyEditedData=[...testSteps];
      applyEditedData[index]=editedTableData;
      console.log('Gooooo',url); 
      axios
      .post(url,{
        editedLocator:applyEditedData
      })
      .then((res)=>{
        settestSteps(applyEditedData);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    //  const applyEditedData=[...testSteps];
    //  applyEditedData[index]=editedTableData;
    //  settestSteps(applyEditedData);
    //  console.log("Hello");
    //  console.log("index in table "+index);
   }

  const jsonHandler=() => {
    const json = JSON.stringify(testSteps);
    saveAs(new Blob([json], { type: 'application/json;charset=utf-8' }), 'file.json');
  }

  const deleteHandler=(index) => {
    if(props.callingFrom=='locator'){
      const url='http://localhost:5000/locators/'+lname
      const tableDataAfterDelete=[...testSteps];
      tableDataAfterDelete.splice(index,1);
      axios
      .post(url,{
        editedLocator:tableDataAfterDelete
      })
      .then((res)=>{
        settestSteps(tableDataAfterDelete);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    // const tableDataAfterDelete=[...testSteps];
    // tableDataAfterDelete.splice(index,1);
    // settestSteps(tableDataAfterDelete);
  }

  const arrowClickHandler=(upOrDown,rawIndex) => {
    const presentData=[...testSteps];
    const dataAfterArrowClick=[...testSteps];
    const numOfRaws=testSteps.length;
    console.log(numOfRaws);
    if(upOrDown===0 && rawIndex!==0){
      if(props.callingFrom=='locator'){
        const url='http://localhost:5000/locators/'+lname
        dataAfterArrowClick[rawIndex-1]=presentData[rawIndex];
        dataAfterArrowClick[rawIndex]=presentData[rawIndex-1];
        axios
        .post(url,{
          editedLocator:dataAfterArrowClick
        })
        .then((res)=>{
          settestSteps(dataAfterArrowClick);
        })
        .catch((err) => {
          console.log(err);
        });
      }
      // dataAfterArrowClick[rawIndex-1]=presentData[rawIndex];
      // dataAfterArrowClick[rawIndex]=presentData[rawIndex-1];
      // settestSteps(dataAfterArrowClick);
    }
    if(upOrDown===1 && rawIndex!==(numOfRaws-1)){
      if(props.callingFrom=='locator'){
        const url='http://localhost:5000/locators/'+lname
        dataAfterArrowClick[rawIndex]=presentData[rawIndex+1];
        dataAfterArrowClick[rawIndex+1]=presentData[rawIndex];
        axios
        .post(url,{
          editedLocator:dataAfterArrowClick
        })
        .then((res)=>{
          settestSteps(dataAfterArrowClick);
        })
        .catch((err) => {
          console.log(err);
        });
      }
      // dataAfterArrowClick[rawIndex]=presentData[rawIndex+1];
      // dataAfterArrowClick[rawIndex+1]=presentData[rawIndex];
      // settestSteps(dataAfterArrowClick);
    }   
  }

  const removeHeading = (headingIndex) => {
    const selectedHeading=props.title[headingIndex];
    let editedTestSteps=[];
    for(let i=0;i<testSteps.length;i++){
      const testStep=testSteps[i];
      delete testStep[selectedHeading];//the 'delete' keyword is used to remove a property from an object.
      editedTestSteps.push(testStep);
    }
    props.dropHeading(headingIndex);
    settestSteps(editedTestSteps);
  }

  //pagination

  const next = () => {
    setPage([page[0]+1]);  
  }
  const previous = () => {
    setPage([page[0]-1]);
  }

  const rowsPerPageHandler =  (event) => {
    setRowsPerPage(Number(event.target.value));
    const currentPage=[0];
    setPage([...currentPage]);
  }
  //change rows per page

  useEffect(() => {
    setTestStepPerPage(testSteps.slice(page[0]*rowsPerPage,page[0]*rowsPerPage+rowsPerPage));
    if(testSteps.length<=page[0]*rowsPerPage+rowsPerPage && testSteps.length!==0){
      setNextButtonStatus(false);
    }else{
      setNextButtonStatus(true);
    }
    if(page[0]===0){
      setPrevButtonStatus(false);
    }else{
      setPrevButtonStatus(true);
    }
  }, [page,testSteps]);
  // console.log("Boooo",props.title)
  if(props.title.length!==0){
    tableFields.push(<th colSpan={3}>{"Action"}</th>)
    if(props.removeHeading===true){
      props.title.map((heading,headingIndex)=>{
        tableFields.push(<th>{heading}<MdClose onClick={()=>removeHeading(headingIndex)}></MdClose></th>);
      });
    }else{
      for(let i=0;i<props.title.length;i++){
        tableFields.push(<th>{props.title[i]}</th>);
      }
    }
  }
 //disable and enable styles for next and prev icons

 const prevIconStyle = {
  
  opacity: prevButtonStatus ? 1 : 0.5,
  pointerEvents: prevButtonStatus ? 'auto' : 'none',
  color:"white",
  
};

const nextIconStyle = {
  opacity: nextButtonStatus ? 1 : 0.5,
  pointerEvents: nextButtonStatus ? 'auto' : 'none',
  color:"white",
  
};
//className="table table-hover table-dark text-center table-striped"

  return (
    <div className="App">
      <div>
        <ModalDialog
          enableChainPopUps={props.enableChainPopUps}//false
          editTestStep={testSteps[indexOfRaw]}
          title={props.title}
          noFields={props.noFields}
          saveNewData={updateTestSteps}
          saveNewGeneralData={updateGeneralData}
          generalPurpose={props.generalPurpose}
          rawNumber={null}
          addingFields={false}
          buttonValue="Add"
          purpose="fillData"
          formID={["myFormTwoPart1", "myFormTwoPart2"]}
        ></ModalDialog>
      </div>
      <div className="version-01">
        <table id="data-Table">
          <thead>
          <tr>
              {tableFields}
            </tr>
          </thead>
          <tbody>
            {props.title.length!==0 ?testStepsPerPage.map((testStep,index) => (
                  <Raw testStep={testStep} rawIndex={page[0]*rowsPerPage+index} onDelete={deleteHandler} onEdit={editHandler} onArrowClick={arrowClickHandler} title={props.title} generalPurpose={props.generalPurpose} enableChainPopUps={props.enableChainPopUps}/>
            )):<div className="container no-record-msg"><TbTableOff size="100px"></TbTableOff><h2>{"No Records Available!"}</h2></div>}
          </tbody>
        </table>
      </div>
      <div className="container-1">
            <div>
              <label>Rows per page: </label>
              <select value={rowsPerPage}  onChange={rowsPerPageHandler}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </div>
            <div>
              {page[0]*rowsPerPage+1} - {testSteps.length<=page[0]*rowsPerPage+rowsPerPage ? testSteps.length:page[0]*rowsPerPage+rowsPerPage} of {testSteps.length}
            </div>
            <div>
              <MdNavigateBefore onClick={previous} style={prevIconStyle} size="30px"></MdNavigateBefore>
              <MdNavigateNext onClick={next} style={nextIconStyle} size="30px"></MdNavigateNext>
            </div>
      </div>
      <Button onClick={jsonHandler}>
              Generate JSON
      </Button>     
    </div>
  );
};

export default Table;
