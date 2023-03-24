import './Card.css';
import React from 'react';
import { SiMicrosoftexcel } from "react-icons/si";
import { BiPlayCircle } from "react-icons/bi";
import { Button } from 'react-bootstrap';
import { Router, Route, Link, useNavigate } from 'react-router-dom';

const Card = (props) => {
    
    const navigate=useNavigate();

    const listItemStyle={
        //width:"18rem",
        height:"5rem",
        padding:"10px",
        fontSize:"50px",
        color:"white"
    }
    const iconStyle={
        fontSize:"100px",
        color:"white"
    }
    const cardStyle={
        width: "22rem",
        height:"24rem",
        borderRadius:"20px",
        background: props.backgroundColor
    }

    const dataSectionPathHandler = () => {
        if(props.cardTitle==="Excel"){
            navigate('/dataExcel');
        }else if(props.cardTitle==="Manually"){
            navigate('/data');
        }
    }

    // document.addEventListener("DOMContentLoaded",function () {
    //     console.log('sand man');
    // });

    

    console.log('sand man 2');

    return( 
            <Button className="card" style={cardStyle} value={props.cardTitle} onClick={dataSectionPathHandler}>
                <div >
                    <ul className="list-group list-group-flush" >
                        <li className="" style={listItemStyle}>{props.cardTitle}</li>
                        <li className="" style={iconStyle}><SiMicrosoftexcel></SiMicrosoftexcel></li>
                        <li className="" style={listItemStyle}><BiPlayCircle></BiPlayCircle></li>
                    </ul>
                </div>
            </Button>
        
    );
}

export default Card;