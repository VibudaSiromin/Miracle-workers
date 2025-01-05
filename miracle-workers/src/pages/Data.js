import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import {useState} from 'react'
import Heading from "../components/Heading";
import Table from '../components/Table'

const Data = (props) => {
    
    const [title,getTitle]=useState([]);
    const heading = (getHeading) => {
        getTitle(getHeading);
    }

    return(
        <>
        {/* <Button variant="success" onClick={addTitle}>column</Button> */}
        <Heading noFields={[1]} generalPurpose={true} heading={heading} addHeading="addHeading" removeHeading={true} initialHeading={props.initialHeading}></Heading>
        {/* <Table title={title} generalPurpose={props.generalPurpose} noFields={[title.length]} enableChainPopUps={false}></Table> */}
        </>
    )
}

export default Data;