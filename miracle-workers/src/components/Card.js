import './Card.css';
import React from 'react';
import { SiMicrosoftexcel } from "react-icons/si";
import { BiPlayCircle } from "react-icons/bi";
import { Button } from 'react-bootstrap';
import { Router, Route, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
//import { Connect } from 'react-redux';
import { connect } from 'react-redux';


const Card = (props) => {

    const {lname,tname,cname,dname} =useParams();
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

    const sectionPathHandler = () => {
        if(props.sectionName==="data"){
            if(props.cardTitle==="Excel"){
                navigate('/dataJunction/dataExcel/'+props.dataPageName);
                dispatch({ type: 'MY_FUNCTION_CALLED_EXCEL' });
            }else if(props.cardTitle==="Manually"){
                navigate('/dataJunction/data/'+props.dataPageName);
                dispatch({ type: 'MY_FUNCTION_CALLED_MANUAL' });
            }
        }else if(props.sectionName==="test"){
            console.log('Clicked on test');
            if(props.cardTitle==="JSON"){
                console.log('Clicked on Json');
                navigate('/testJunction/testJson');
                dispatch({ type: 'FUNCTION_CALLED_JSON' });
            }else if(props.cardTitle==="Manually"){
                console.log('Clicked on manual',props.testPageName);
                navigate('/testJunction/testManual/'+props.testPageName);
                setTimeout(()=>{
                    dispatch({ type: 'FUNCTION_CALLED_MANUAL' });
                },1000);
                
            }
        }
    }

    // const dataSectionPathHandler = () => {
    //     if(props.cardTitle==="Excel"){
    //         navigate('/dataJunction/dataExcel');
    //         dispatch({ type: 'MY_FUNCTION_CALLED_EXCEL' });
    //     }else if(props.cardTitle==="Manually"){
    //         navigate('/dataJunction/data');
    //         dispatch({ type: 'MY_FUNCTION_CALLED_MANUAL' });
    //     }
    // }

    // const testSectionPathHandler = () => {
    //     if(props.cardTitle==="JSON"){
    //         navigate('/testJunction/testJson');
    //         dispatch({ type: 'FUNCTION_CALLED_JSON' });
    //     }else if(props.cardTitle==="Manually"){
    //         navigate('/testJunction/testManual');
    //         dispatch({ type: 'FUNCTION_CALLED_MANUAL' });
    //     }
    // }
    //console.log("GRUNT",props.testPageName);

    return( 
            <Button className="card" style={cardStyle} value={props.cardTitle} onClick={sectionPathHandler}>
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

// const mapStateToProps = (state) => {
//     console.log('bird',state.getTestSheetName.testPageName);
//     return{
//       testPageName: state.getTestSheetName.testPageName,
//     }
    
//   };

const mapStateToProps = (state) => {
    return{
        testPageName: state.getTestSheetName.testPageName,
        dataPageName: state.getDataSheetAtNameAssigner.dataPageName
    }
  };

export default connect(mapStateToProps)(Card);