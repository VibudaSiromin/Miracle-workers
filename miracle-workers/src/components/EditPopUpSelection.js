import { propTypes } from "react-bootstrap/esm/Image";
import {useState,useEffect} from "react";
import './PopUpSelection.css';

const PopUpSelection = (props) => {
    const instructionSet=['#recovery','#skip','#screen'];
    const commandSet=['Branch.BasedOnData','Branch.BasedOnData','Branch.OnElementAttribute','Branch.OnElementText','Branch.OnElementValue'];
    const swapResultSet=['Yes','No'];
    const actionSet=['Stop test on error','Stop test on failure','Stop test on error or failure','Log info on error','Log info on failure','Log info on error or failure'];
    let options=[];
    const [fieldName,setFieldName]=useState(props.title);
    const [fieldValue,setFieldValue]=useState(props.editTestStep);
    const [changeState,setChangeState]=useState(false);
    //console.log(options);
    const InsertDataToSelection = () => {
        if(props.title==='instruction'){
            for (let i = 0; i<instructionSet.length; i++) {
                options.push(
                    <option value={instructionSet[i]}/>
                );
                console.log("Bye");
              }
              console.log(options);
        }else if(props.title==='command'){
            for (let i = 0; i<commandSet.length; i++) {
                options.push(
                    <option value={commandSet[i]}/>
                );
                
              }
              console.log(options);
        }else if(props.title==='swapResult'){
            for (let i = 0; i<swapResultSet.length; i++) {
                options.push(
                    <option value={swapResultSet[i]}/>
                );
              }
              console.log(options);
        }else if(props.title==='action'){
            for (let i = 0; i<actionSet.length; i++) {
                options.push(
                    <option value={actionSet[i]}/>
                );
              }
              console.log(options);
        }
        
    }

    InsertDataToSelection();


    const inputHandler=(event) => {
        setFieldValue(event.target.value);
        setFieldName(event.target.getAttribute("name"));
        setChangeState(true);
        console.log(fieldName);
        console.log(fieldValue);
      }

      useEffect(()=>{
         if(props.id<=2){
           props.onDataChange(fieldName,fieldValue);
         }else{
           props.onDataChange2(fieldName,fieldValue);
         }
    },[fieldValue]);

    if(changeState===false){
        if(props.id<=2){
          props.onDataChange(fieldName,fieldValue);
        }else{
          props.onDataChange2(fieldName,fieldValue);
        }
      }

    return(
        <div className="form-group">
            <label for={props.id} className="form-label">{props.title}</label>
                <input type="text" list={props.title} className="form-control" name={props.title} value={fieldValue} onChange={inputHandler} />            
                <datalist id={props.title}>
                    {options}
                </datalist>
        </div>
    );
}

export default PopUpSelection;