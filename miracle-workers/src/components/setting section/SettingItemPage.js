import React from 'react'
import './SettingItemPage.css'
import {RxCross1} from 'react-icons/rx';
import { Button } from 'react-bootstrap';
import SettingItemRaw from './SettingItemRaw';

const SettingItemPage = ({title}) => {
  return (
    <div className='outline'>
        <div>
            {title}
            <RxCross1/>
            <Button>Add</Button>
        </div>
        <div>
            <SettingItemRaw rawData="Branch.BasedOnData"/>
        </div>
    </div>
  )
}

export default SettingItemPage