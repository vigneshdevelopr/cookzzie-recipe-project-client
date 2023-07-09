import { Button, TextField } from '@mui/material'
import React from 'react'
import Base from '../../Components/Base'

function CreateRecipe() {
  return (
    <Base>
    <div className='createRecipeTitle' style={{textAlign:'center'}}>Create Recipe</div>
    <div className="createRecipe">
    <TextField id="outlined-basic" label="Ingredients" variant="filled" />
    <TextField
          id="filled-multiline-static"
          label="Instructions"
          multiline
          rows={4}
          variant="filled"
        />
    <TextField id="outlined-basic" label="Image Url" variant="filled" />
    <TextField id="outlined-basic" label="Time Period" variant="filled" />
    <TextField id="outlined-basic" label="CreatedBy" variant="filled" />
<Button variant='contained' style={{backgroundColor:'#f2672b'}}>Submit</Button>
    </div>
    </Base>
  )
}

export default CreateRecipe