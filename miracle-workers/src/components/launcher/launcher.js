import React,{useRef,useState} from 'react'
import {MdPlayArrow,MdModeEdit} from 'react-icons/md'
import './launcher.css';
import LauncherPopup from './launcherPopup';

const Launcher = () => {
    
  const [locatorData,setLocatorData]=useState({})

  const LRef=useRef();

  const editHandler =() => {
    LRef.current.open();
  }

  const dataHandler= (formData) => {
    setLocatorData(formData);
  }

  return (
    <>
      <LauncherPopup ref={LRef} onSubmit={dataHandler}/>

      <div className='container'>
        <div className='item item-1'>
              Name <MdPlayArrow/> {locatorData.testName}  
          </div> 
          <div className='item item-2'>
              Browser <MdPlayArrow/> {locatorData.browser}
          </div>
          <div className='item item-3'>
              Test Type <MdPlayArrow/> {locatorData.testType}
          </div>
          <div className='item item-4'>
              Status <MdPlayArrow/>   {locatorData.status}
          </div> 
          <div className='item item-5'>
              Data Sheet <MdPlayArrow/> {locatorData.dataSheet}
          </div>
          <div className='item item-6'>
              Comment <MdPlayArrow/> {locatorData.comment}
          </div>
          <div className='item item-7'>
            <a onClick={editHandler}><MdModeEdit /></a>
          </div>
      </div>
    </>
  )
}

export default Launcher;