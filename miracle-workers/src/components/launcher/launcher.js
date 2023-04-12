import React from 'react'
import {MdPlayArrow,MdModeEdit} from 'react-icons/md'

const launcher = () => {
  return (
    <div>
       <div>
            Name <MdPlayArrow color='#000000'/>
            Browser <MdPlayArrow/>
            Test Type <MdPlayArrow/>
        </div> 
       <div>
            Status <MdPlayArrow/>
            Data Sheet <MdPlayArrow/>
            Comment <MdPlayArrow/>
        </div> 
        <MdModeEdit/>
    </div>
  )
}

export default launcher;