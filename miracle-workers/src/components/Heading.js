import React from "react";
import { Button } from "react-bootstrap";
import Table from "./Table";
import ModalDialog from './PopUpWindow';
import {useState,useEffect} from 'react'
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Heading = (props) => {
    const {dname}=useParams();
    const location=useLocation();
    const [heading,setHeading]=useState([]);
    const [isMount,setIsMount]=useState(false);
    const [isInitialHeadingStored,setIsInitialHeadingStored]=useState(false);
    /* 
    When you initialize the state variable using a prop value, 
    it will only be set once when the component mounts. 
    If the prop value changes after that, 
    it won't automatically update the state variable.
    That's why useEffect hook is used
    */
    useEffect(() => {
      //pass initial excel headings to the store
      if(isMount){
        console.log("OWL");
        setHeading(props.initialHeading);
        const currentURL=location.pathname;
          if(currentURL==='/dataJunction/dataExcel/'+dname){
            axios
              .post('http://localhost:5000/dataJunction/dataExcel/'+dname+'/addHeading',{
                recentHeading:props.initialHeading,
                type:"Excel"
              })
              .then((res)=>{
                setIsInitialHeadingStored(true);//after initial heading stored then the record should be stored!
              })
              .catch((err)=>{
                if (err.response) {
                  // The client was given an error response (5xx, 4xx)
                  console.log(err.response.data);
                  console.log(err.response.status);
                  console.log(err.response.headers);
              } else if (err.request) {
                  // The client never received a response, and the request was never left
                  console.log(err.request);
              } else {
                  // Anything else
                  console.log('Error', err.message);
              }
                //console.log(err);
              })
          }
            console.log("Delta Force",props.initialHeading);
        
            
          }else{
            setIsMount(true);
          }
      
    }, [props.initialHeading]);

    console.log('file headinggggxxx ',heading);
    const addHeading = (addTitle) => {
        console.log('shogun',addTitle);
        const valueList=Object.values(addTitle);//converts object values to array values
        console.log('slender',valueList);
        const newTitle=[...heading,valueList];
        console.log('GTA',newTitle);
        setHeading(newTitle);
        //props.heading(heading);
        const currentURL=location.pathname;
        if(currentURL==='/dataJunction/data/'+dname){
          axios
          .post('http://localhost:5000/dataJunction/data/'+dname+'/addHeading',{
            recentHeading:valueList,
            type:"Mannual"
          })
          .then((res)=>{
            //setHeading(newTitle);
            console.log('add heading is completed');
          })
          .catch((err)=>{
            if (err.response) {
              // The client was given an error response (5xx, 4xx)
              console.log(err.response.data);
              console.log(err.response.status);
              console.log(err.response.headers);
          } else if (err.request) {
              // The client never received a response, and the request was never left
              console.log(err.request);
          } else {
              // Anything else
              console.log('Error', err.message);
          }
            //console.log(err)
          })
        }
        if(currentURL==='/dataJunction/dataExcel/'+dname){
          console.log("Mark1");
          axios
          .post('http://localhost:5000/dataJunction/dataExcel/'+dname+'/addHeading',{
            recentHeading:valueList,
            type:"Excel"
          })
          .then((res)=>{

          })
          .catch((err)=>{
            if (err.response) {
              // The client was given an error response (5xx, 4xx)
              console.log(err.response.data);
              console.log(err.response.status);
              console.log(err.response.headers);
          } else if (err.request) {
              // The client never received a response, and the request was never left
              console.log(err.request);
          } else {
              // Anything else
              console.log('Error', err.message);
          }
            //console.log(err);
          })
        }

    }

    const dropHeading = (headingIndex) => {
      const slicingHeading=[...heading];
      slicingHeading.splice(headingIndex,1);
      setHeading(slicingHeading);
      
      const headingArrAfterDroping=slicingHeading.map((subArr)=>{
           return subArr[0];
      });
      console.log("BatMan",headingArrAfterDroping);

      const currentURL=location.pathname;
      if(currentURL==='/dataJunction/data/'+dname){
        axios
          .post('http://localhost:5000/dataJunction/data/'+dname+'/removeHeading',{
            currentHeading:headingArrAfterDroping,
            type:"Mannual"
          })
          .then((res)=>{
            
          })
          .catch((err)=>{
            if (err.response) {
              // The client was given an error response (5xx, 4xx)
              console.log(err.response.data);
              console.log(err.response.status);
              console.log(err.response.headers);
          } else if (err.request) {
              // The client never received a response, and the request was never left
              console.log(err.request);
          } else {
              // Anything else
              console.log('Error', err.message);
          }
            //console.log(err)
          })
      }else if(currentURL==='/dataJunction/dataExcel/'+dname){
        axios
          .post('http://localhost:5000/dataJunction/dataExcel/'+dname+'/removeHeading',{
            currentHeading:headingArrAfterDroping,
            type:"Excel"
          })
          .then((res)=>{
            
          })
          .catch((err)=>{
            if (err.response) {
              // The client was given an error response (5xx, 4xx)
              console.log(err.response.data);
              console.log(err.response.status);
              console.log(err.response.headers);
          } else if (err.request) {
              // The client never received a response, and the request was never left
              console.log(err.request);
          } else {
              // Anything else
              console.log('Error', err.message);
          }
            //console.log(err)
          })
      }
    }

    //retrieve data from the store when a dashboard link is clicked

    const getHeadingsFromStore = () => {
      const currentURL=location.pathname;
      if(currentURL==='/dataJunction/data/'+dname){
        console.log('VA');

        axios.get('http://localhost:5000/dataJunction/data/'+dname+'/getHeading',{
          params:{
            dataPageName:dname+"M"
          }
        //dataPageName:dname
      })
      .then((res)=>{
        console.log('gatta',res.data.getHeadings);
        setHeading(res.data.getHeadings);
      })
      .catch((err)=>{
        if (err.response) {
          // The client was given an error response (5xx, 4xx)
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
      } else if (err.request) {
          // The client never received a response, and the request was never left
          console.log(err.request);
      } else {
          // Anything else
          console.log('Error', err.message);
      }
        //console.log(err);
      })
      }
      if(currentURL==='/dataJunction/dataExcel/'+dname){
        axios.get('http://localhost:5000/dataJunction/dataExcel/'+dname+'/getHeading',{
          params:{
            dataPageName:dname+"E"
          }
          //dataPageName:dname
        })
        .then((res)=>{
          console.log('gatta',res.data.getHeadings);
          setHeading(res.data.getHeadings)
        })
        .catch((err)=>{
          if (err.response) {
            // The client was given an error response (5xx, 4xx)
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        } else if (err.request) {
            // The client never received a response, and the request was never left
            console.log(err.request);
        } else {
            // Anything else
            console.log('Error', err.message);
        }
          //console.log(err);
        })
      }
    }

     useEffect(()=>{
      getHeadingsFromStore();
     },[dname])


    return(
        <>
        {/* <Button variant="success" onClick={addTitle}>column</Button> */}
        <ModalDialog
          enableChainPopUps={false}
          generalPurpose={props.generalPurpose}//true
          title={["Column Name"]}//Adding a new column name
          noFields={props.noFields}
          buttonValue="Column"
          saveNewHeadingData={addHeading}
          purpose='addHeading'
          formID={["myFormOnePart1", "myFormOnePart2"]}
          addBtnId={props.addBtnId}  
        >
        </ModalDialog>
        <Table title={heading} dropHeading={dropHeading} generalPurpose={props.generalPurpose} /*true*/ noFields={[heading.length]} enableChainPopUps={false} purpose="fillData" removeHeading={props.removeHeading} /*true*/initialData={props.initialData} initialExcelFileName={props.initialExcelFileName}  callingFrom={props.callingFrom} isInitialHeadingStored={isInitialHeadingStored} addBtnId={props.addBtnId}></Table>
        {/* initialData can be null array as well. */}
        <></>
        </>
    )
}

export default Heading;