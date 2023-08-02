import React from 'react'
import JSONGenerator from '../../components/JSONGenerator';
import devImg from '../../assets/images/developer.png'

const home = () => {
    
  return (
    <>
      <div className="home-container">
        <img src={devImg} alt=''/>
        <JSONGenerator></JSONGenerator>
      </div>
      
    </>
  )
}

export default home;