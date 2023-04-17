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
    /* 
    When you initialize the state variable using a prop value, 
    it will only be set once when the component mounts. 
    If the prop value changes after that, 
    it won't automatically update the state variable.
    That's why useEffect hook is used
    */
    useEffect(() => {
      setHeading(props.initialHeading);
    }, [props.initialHeading]);

    console.log('file headinggggxxx ',heading);
    const addHeading = (addTitle) => {
        
        const valueList=Object.values(addTitle);//converts object values to array values
        // console.log('slender',valueList);
        const newTitle=[...heading,valueList];
        console.log('GTA',newTitle);
        setHeading(newTitle);
        //props.heading(heading);
        const currentURL=location.pathname;
        if(currentURL==='/dataJunction/data/'+dname){
          axios
          .post('http://localhost:5000/dataJunction/data/'+dname+'/addHeading',{
            recentHeading:valueList
          })
          .then((res)=>{
            
          })
          .catch((err)=>{
            console.log(err)
          })
        }

    }

    const dropHeading = (headingIndex) => {
      const slicingHeading=[...heading];
      slicingHeading.splice(headingIndex,1);
      setHeading(slicingHeading);  
    }

    //retrieve data from the store when a dashboard link is clicked

    const getHeadingsFromStore = () => {
      const currentURL=location.pathname;
      if(currentURL==='/dataJunction/data/'+dname){
        axios.get('http://localhost:5000/dataJunction/data/'+dname+'/getHeading',{
        dataPageName:dname
      })
      .then((res)=>{
        console.log('gatta',res.data.getHeadings);
        setHeading(res.data.getHeadings)
      })
      .catch((err)=>{
        console.log(err);
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
        >
        </ModalDialog>
        <Table title={heading} dropHeading={dropHeading} generalPurpose={props.generalPurpose} /*true*/ noFields={[heading.length]} enableChainPopUps={false} purpose="fillData" removeHeading={props.removeHeading} /*true*/initialData={props.initialData} callingFrom={props.callingFrom}></Table>
        {/* initialData can be null array as well. */}
        <></>
        </>
    )
}

export default Heading;