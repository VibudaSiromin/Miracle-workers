import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import {useState} from 'react'
import Heading from "../components/Heading";
import Table from '../components/Table'

const Data = (props) => {
    //const title=[];
    // const [title,setTitle]=useState([]);
    
    // const addTitle = (addTitle) => {
    //     const valueList=Object.values(addTitle);
    //     const newTitle=[...title,valueList];
    //     setTitle(newTitle);
    // }
    const [title,getTitle]=useState([]);
    const heading = (getHeading) => {
        console.log('water bottle');
        getTitle(getHeading);
        console.log('crown',title);
    }

    return(
        <>
        {/* <Button variant="success" onClick={addTitle}>column</Button> */}
        <Heading noFields={[1]} generalPurpose={true} heading={heading} addHeading="addHeading"></Heading>
        {/* <Table title={title} generalPurpose={props.generalPurpose} noFields={[title.length]} enableChainPopUps={false}></Table> */}
        </>
    )
}

export default Data;