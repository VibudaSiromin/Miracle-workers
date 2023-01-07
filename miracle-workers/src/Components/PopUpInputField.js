import { useState } from "react";

const PopUpInputField = (props) => {

    // const [addFormData, setaddFormData] = useState({
    //     group:"",
    //     instruction: "",
    //     command: "",
    //     locator: "",
    //     locatorParameter: "",
    //     data: "",
    //     swapResult: "",
    //     branchSelection: "",
    //     action: "",
    //     comment: "",
    //   });

      
    // const inputHandler = (event) => {

    //     event.preventDefault();

    //     const fieldName = event.target.getAttribute("name");
    //     const fieldValue = event.target.value;
    
    //     const newFormData = { ...addFormData };
    //     newFormData[fieldName] = fieldValue;
    //     console.log(newFormData);
    //     // setaddFormData(newFormData);
    //     props.onSaveAddFormData(newFormData);
    //     // console.log(addFormData);
    //   };
    // const[name,setName]=useState('');
    // const[value,setValue]=useState('');
    
    const inputHandler=(event) => {
      const fieldName = event.target.getAttribute("name");
      const fieldValue = event.target.value;
      console.log(fieldName);
      console.log(fieldValue);
      if(props.id<=2){
        props.onDataChange(fieldName,fieldValue);
      }else{
        props.onDataChange2(fieldName,fieldValue);
      }
    }
    return(
        <div className="form-group">
            <label>{props.title}</label>
            <input type={props.inputType} className="form-control" name={props.title} onChange={inputHandler}></input>
        </div>
    );
}

export default PopUpInputField;