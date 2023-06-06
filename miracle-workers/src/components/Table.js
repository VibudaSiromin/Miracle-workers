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
import { useLocation } from "react-router-dom";
import axios from "axios";


const Table = (props) => {

  const {lname,tname,cname,dname} =useParams();
  const location = useLocation();
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
  const [isMount,setIsMount]=useState(false);

  useEffect(() => {
    if(props.initialData!==undefined && isMount){
      console.log('GTO',props.initialData);
      settestSteps(props.initialData);
      const currentURL=location.pathname;
      if(props.callingFrom==="data"){ 
        if(currentURL==='/dataJunction/dataExcel/'+dname){
          console.log("VEGA INO");
          axios
          .post('http://localhost:5000/dataJunction/dataExcel/'+dname,{
            editedData:props.initialData,
            type:"Excel"
          })
          .then(()=>{

          })
          .catch((err)=>{
            console.log(err);
          })
        }
      }
      setTestStepPerPage(props.initialData.slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage));
    }else{
      setIsMount(true);
    }
    
  }, [props.isInitialHeadingStored]);
  
  //get the all the data of specific locator sheet
  //ex-:lname='45'
  //trigger when click on locator sheet links
  const getLocatorsByPage=() => {
    if(lname){
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
       
  }

  //////////////////////////

  const testAPI=async()=>{
    try{
      const response = await axios.get(
        `https://famous-quotes4.p.rapidapi.com/random`
      );
    }catch(e){

    }
  }

  ///////////////////////////

  //get the all the data of specific data sheet

  const getDataByPage=() => {
    const currentURL=location.pathname
    if(currentURL==='/dataJunction/data/'+dname){
      axios
      .get('http://localhost:5000/dataJunction/data/'+dname,{
        params:{
          dataPageName:dname+"M"
        }
        //dataPageName:dname
      })
      .then((res)=>{
        const data=res.data.getDataRecords;
        settestSteps(data);
      })
      .catch((err) => {
        console.log(err);
      });    
    }
    if(currentURL==='/dataJunction/dataExcel/'+dname){
      console.log("Thunder");
      axios
      .get('http://localhost:5000/dataJunction/dataExcel/'+dname,{
        params:{
          dataPageName:dname+"E"
        }
      })
      .then((res)=>{
        console.log("Lighting");
        const data=res.data.getDataRecords;
        settestSteps(data);
      })
      .catch((err)=>{
        console.log(err);
      });
    }
    
  }

  const getTestByPage=() => {
    const currentURL=location.pathname
    if(currentURL==='/testJunction/testManual/'+tname){
      axios
      .get('http://localhost:5000/testJunction/testManual/'+tname,{
        params:{
          testPageName:tname+"M"
        }
      })
      .then((res)=>{
        const data=res.data.getTestRecords;
        console.log('banana',data)
        settestSteps(data);
      })
      .catch((err) => {
        console.log(err);
      });    
    }
    if(currentURL==='/testJunction/testJson/'+tname){
      // console.log("Thunder");
      // axios
      // .get('http://localhost:5000/dataJunction/dataExcel/'+dname,{
      //   params:{
      //     dataPageName:dname+"E"
      //   }
      // })
      // .then((res)=>{
      //   console.log("Lighting");
      //   const data=res.data.getDataRecords;
      //   settestSteps(data);
      // })
      // .catch((err)=>{
      //   console.log(err);
      // });
    }
    
  }




  useEffect(()=>{
    getLocatorsByPage();
  },[lname])

  useEffect(()=>{
    getDataByPage();
  },[dname])

  useEffect(()=>{
    getTestByPage();
  },[tname])

  const updateTestSteps = (tableData) => {
    if(props.callingFrom==='testSuites'){
      const currentURL=location.pathname;
      const newTableData = [...testSteps,tableData];
      settestSteps(newTableData);

      if(currentURL==='/testJunction/testManual/'+tname){
        console.log('air cover');
        axios
        .post('http://localhost:5000/testJunction/testManual/'+tname,{
          editedTestData:newTableData,
          type:'Manual'
        })
        .then((res)=>{
          console.log(res);
        })
        .catch((err)=>{
          console.log(err);
        })
      }
      const url='http://localhost:5000/locators/'+tname
     
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
    if(props.callingFrom==='component'){
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

  //update when click on 'ADD' btn
  const updateGeneralData = (tableData) => {
    if(props.callingFrom=='locator'){
      const url='http://localhost:5000/locators/'+lname
      const newTableData = [...testSteps,tableData];
      settestSteps(newTableData);
      console.log('Gooooo',url); 
      axios
      .post(url,{
        editedLocator:newTableData
      })
      .then((res)=>{
        
      })
      .catch((err) => {
        console.log(err);
      });
    }
    if(props.callingFrom==='data'){
      const currentURL=location.pathname;//get current URL
      
      console.log('QQ9 9mm');
      if(currentURL==='/dataJunction/data/'+dname){
        const newTableData = [...testSteps,tableData];
        console.log('hello hell');
        console.log('examine updateGeneralData')
        axios
        .post('http://localhost:5000/dataJunction/data/'+dname,{
          editedData:newTableData,
          type:"Mannual"
        })
        .then((res)=>{
          settestSteps(newTableData);
        })
        .catch((err)=>{
          console.log(err)
        })
      }else if(currentURL==='/dataJunction/dataExcel/'+dname){
        console.log('Machine Gun');
        const newTableData = [...testSteps,tableData];
        // settestSteps(newTableData);
        axios
        .post('http://localhost:5000/dataJunction/dataExcel/'+dname,{
          editedData:newTableData,
          type:"Excel"
        })
        .then((res)=>{
          settestSteps(newTableData);
        })
        .catch((err)=>{
          console.log(err)
        })

      }
      
    }
    console.log('Glock');
   
  };

  //edit when click on 'pen' btn
   const editHandler = (editedTableData,index) => {
    console.log('F1')
    if(props.callingFrom==='locator'){
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
    if(props.callingFrom==='data'){
      const applyEditedData=[...testSteps];
      applyEditedData[index]=editedTableData;
      settestSteps(applyEditedData);
      const currentURL=location.pathname;//get current URL
      console.log('myUL',currentURL)
      console.log('zeebra',editedTableData);
      console.log('moose',applyEditedData);

      if(currentURL==='/dataJunction/data/'+dname){
        console.log('examine editHandler')
        axios
        .post('http://localhost:5000/dataJunction/data/'+dname,{
          editedData:applyEditedData,//************ */
          type:"Mannual"
        })
        .then((res)=>{

        })
        .catch((err)=>{
          console.log(err);
        })
        
      }else if(currentURL==='/dataJunction/dataExcel/',dname){
        axios
        .post('http://localhost:5000/dataJunction/dataExcel/'+dname,{
          editedData:applyEditedData,//************ */
          type:"Excel"
        })
        .then((res)=>{

        })
        .catch((err)=>{
          console.log(err);
        })
      } 
    }
    if(props.callingFrom==='testSuites'){
      const applyEditedData=[...testSteps];
      applyEditedData[index]=editedTableData;
      settestSteps(applyEditedData);
      const currentURL=location.pathname;

      if(currentURL==='/testJunction/testManual/'+tname){
        axios
        .post('http://localhost:5000/testJunction/testManual/'+tname,{
          editedTestData:applyEditedData,//************ */
          type:"Manual"
        })
        .then((res)=>{

        })
        .catch((err)=>{
          console.log(err);
        })
        
      }else if(currentURL==='/testJunction/testJson/',tname){
        axios
        .post('http://localhost:5000/testJunction/testJson/'+tname,{
          editedTestData:applyEditedData,//************ */
          type:"Json"
        })
        .then((res)=>{

        })
        .catch((err)=>{
          console.log(err);
        })
      } 

    }
    
   
   }

  const jsonHandler=() => {
    const json = JSON.stringify(testSteps);
    saveAs(new Blob([json], { type: 'application/json;charset=utf-8' }), 'file.json');
  }

  const deleteHandler=(index) => {
    console.log("Running delete handler");
    if(props.callingFrom==='locator'){
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
    if(props.callingFrom==='data'){
      const currentURL=location.pathname;
      const tableDataAfterDelete=[...testSteps];
      tableDataAfterDelete.splice(index,1);
      settestSteps(tableDataAfterDelete);
      if(currentURL==='/dataJunction/data/'+dname){
        console.log('examine deleteHandler')
      axios
      .post('http://localhost:5000/dataJunction/data/'+dname,{
        editedData:tableDataAfterDelete,
        type:"Mannual"
      })
      .then((res)=>{
        
      })
      .catch((err) => {
        console.log(err);
      });
      }else if(currentURL==='/dataJunction/dataExcel/'+dname){
        axios
        .post('http://localhost:5000/dataJunction/dataExcel/'+dname,{
          editedData:tableDataAfterDelete,
          type:"Excel"
        })
        .then((res)=>{
          console.log(res);
        })
        .catch((err)=>{
          console.log(err);
        })
      }
      
    }

    if(props.callingFrom==='testSuites'){
      const currentURL=location.pathname;
      const tableDataAfterDelete=[...testSteps];
      tableDataAfterDelete.splice(index,1);
      settestSteps(tableDataAfterDelete);
      if(currentURL==='/testJunction/testManual/'+tname){
        console.log('examine deleteHandler')
      axios
      .post('http://localhost:5000/testJunction/testManual/'+tname,{
        editedTestData:tableDataAfterDelete,
        type:"Manual"
      })
      .then((res)=>{
        
      })
      .catch((err) => {
        console.log(err);
      });
      }else if(currentURL==='/testJunction/testJson/'+tname){
        axios
        .post('http://localhost:5000/testJunction/testJson/'+tname,{
          editedData:tableDataAfterDelete,
          type:"Json"
        })
        .then((res)=>{
          console.log(res);
        })
        .catch((err)=>{
          console.log(err);
        })
      }
      
    }
    
  }

  const arrowClickHandler=(upOrDown,rawIndex) => {
    console.log("Running arrow click handler");
    const presentData=[...testSteps];
    const dataAfterArrowClick=[...testSteps];
    const numOfRaws=testSteps.length;
    console.log(numOfRaws);
    if(upOrDown===0 && rawIndex!==0){
      if(props.callingFrom==='locator'){
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

      if(props.callingFrom==='data'){
        const url='http://localhost:5000/data/'+dname
        dataAfterArrowClick[rawIndex-1]=presentData[rawIndex];
        dataAfterArrowClick[rawIndex]=presentData[rawIndex-1];
        axios
        .post(url,{
          editedData:dataAfterArrowClick,
          type:"Mannual"
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
      if(props.callingFrom==='locator'){
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

      if(props.callingFrom==='data'){
        const url='http://localhost:5000/data/'+dname
        dataAfterArrowClick[rawIndex-1]=presentData[rawIndex];
        dataAfterArrowClick[rawIndex]=presentData[rawIndex-1];
        axios
        .post(url,{
          editedData:dataAfterArrowClick,
          type:"Mannual"
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

console.log('hello world!!!!!');

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
