import React from 'react'
import PageLost from '../assets/404page.png'
import { Button } from '@mui/material'
import {useHistory} from 'react-router-dom'

function LostPage() {
  const history = useHistory();
  return (
    <div className="LostPageText">
      <img id='LostPage' src={PageLost} alt='LostPage' />
      <h4 >
      The page you are looking for might have been removed had its name changed or is temporarily unavailable.
      </h4>
      <Button onClick={()=>history.push('/')} variant='contained'>Go to Home</Button>
    </div>
  )
}

export default LostPage