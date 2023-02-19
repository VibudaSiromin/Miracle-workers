import React from 'react';
import './SettingsItem.css';
import {Box} from '@material-ui/core'

const SettingsItem = ({title,symbol}) => {

  return (
    <div className='setting'>
      <div>
      {title}
      </div>
      <div className='symbol'>  
        {symbol}   
      </div>
    </div>
  )
}

export default SettingsItem