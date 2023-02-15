import React from 'react'
import {HiPencil} from 'react-icons/hi';
import {MdOutlineDeleteForever} from 'react-icons/md';
import './SettingItemRaw.css';

const SettingItemRaw = ({rawData}) => {
  return (
    <div className='raw'>
        {rawData}
        <HiPencil/>
        <MdOutlineDeleteForever/>
    </div>
  )
}

export default SettingItemRaw