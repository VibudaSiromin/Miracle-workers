import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import { useState } from 'react'
import Heading from "../../components/Heading";
import Table from "../../components/Table";
import Alert from "../../components/Alert";

const Data = (props) => {

    const [title, getTitle] = useState([]);
    const heading = (getHeading) => {
        console.log('water bottle');
        getTitle(getHeading);
        console.log('crown', title);
    }

    return (
        <>
            <Alert />
            <Heading noFields={[1]} generalPurpose={true} heading={heading} addHeading="addHeading" removeHeading={true} initialHeading={[]} callingFrom="data" addBtnId={'dataMBtn'}></Heading>
        </>
    )
}

export default Data;