import './Card.css';
import React from 'react';
import { SiMicrosoftexcel } from "react-icons/si";
import { BiPlayCircle } from "react-icons/bi";
import { Button } from 'react-bootstrap';
import { Router, Route, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'

const Card = (props) => {

    const dispatch = useDispatch();
    
    const navigate=useNavigate();

    const listItemStyle={
        width:"18rem",
        height:"5rem",
        padding:"10px",
        fontSize:"50px",
        color:"white"
    }
    const iconStyle={
        fontSize:props.symbolSize,
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
            navigate('/dataJunction/dataExcel');
            dispatch({ type: 'MY_FUNCTION_CALLED_EXCEL' });
        }else if(props.cardTitle==="Manually"){
            navigate('/dataJunction/data');
            dispatch({ type: 'MY_FUNCTION_CALLED_MANUAL' });
        }
    }

    console.log('sand man 2');

    return( 
            <Button className="card" style={cardStyle} value={props.cardTitle} onClick={dataSectionPathHandler}>
                <div className="ul_container">
                    <ul className="list-group list-group-flush" >
                         <li className="" style={listItemStyle}>{props.cardTitle}</li>
                         <li className="" style={iconStyle}>{props.symbol}</li>
                         <li className="" style={listItemStyle}><BiPlayCircle></BiPlayCircle></li>
                    </ul>
                </div>
            </Button>
        
    );
}

export default Card;