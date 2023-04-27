import React,{useState,forwardRef,useImperativeHandle} from 'react'
import { Modal,Button } from 'react-bootstrap';

const LauncherPopup = (ref,props) => {

  const formData={};

  const [enablePopup, setEnablePopup] = useState(true);

  const terminateModal= () => {
    setEnablePopup(false);
  }

  const onChangeHandler= (event) => {
    event.preventDefault();

    const fieldName=event.target.getAttribute("name");
    const fieldValue=event.target.value;

    switch(fieldName){
      case "testName":
        formData[fieldName]=fieldValue;
        break;
      case "browser":
        formData[fieldName]=fieldValue;
        break;  
      case "testType":
        formData[fieldName]=fieldValue;
        break;
      case "status":
        formData[fieldName]=fieldValue;
        break;
      case "dataSheet":
        formData[fieldName]=fieldValue;
        break;  
      case "comment":
        formData[fieldName]=fieldValue;
        break;                    
    }

  }

  const submitHandler= (event) => {
    event.preventDefault();
    console.log(props)
    props.onSubmit(formData);
    terminateModal();
  }

  useImperativeHandle(ref, () => ({
    open() {
      setEnablePopup(true);
    },
  }));

  return (
    <form onSubmit={submitHandler} id='launcherPopup' method='POST'>
    <Modal show={enablePopup} tabIndex="-1">
      <Modal.Header closeButton onClick={terminateModal}>
        <Modal.Title>Create A New Test Case</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div>
            Test name <br/>
            <input type='text' name='testName' onChange={onChangeHandler}></input>
          </div>
          <div>
          Browser <br/>
            <input type='radio' name='browser' value='Chrome' onChange={onChangeHandler} checked/>Chrome
            <input type='radio' name='browser' value='Firefox' onChange={onChangeHandler}/>Firefox
            <input type='radio' name='browser' value='Microsoft Edge' onChange={onChangeHandler}/>Microsoft Edge
            <input type='radio' name='browser' value='Internet Explorer' onChange={onChangeHandler}/>Internet Explorer
          </div>
          <div>
            Test Type <br/>
            <select name='testType' onChange={onChangeHandler}>
              <option value='sequential'>Sequential</option>
              <option value='data driven'>Data Driven</option>
            </select>
          </div>
          <div>
          Status <br/>
            <select name='status' onChange={onChangeHandler}>
              <option value='yes'>Yes</option>
              <option value='no'>No</option>
            </select>
          </div>
          <div>
          Data Sheet <br/>
            <input type='text' name='dataSheet' onChange={onChangeHandler}></input>
          </div>
          <div>
          Comment <br/>
            <input type='text' name='comment' onChange={onChangeHandler}></input>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={terminateModal}>
          Close
        </Button>
        <Button form='launcherPopup' type="submit" variant="dark"
        >
          Finish
        </Button>
      </Modal.Footer>
    </Modal>
    </form>
  )
}

export default forwardRef(LauncherPopup);