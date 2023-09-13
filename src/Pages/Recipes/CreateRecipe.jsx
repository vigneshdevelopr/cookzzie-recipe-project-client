// import { Button, TextField } from '@mui/material'
// import React, { useState } from 'react'
// import Base from '../../Components/Base'
// import { getUserbyId } from '../../Components/GetUserbyId'
// import axios from 'axios'
// import { useCookies } from 'react-cookie'

// function CreateRecipe() {
//   const userId = getUserbyId()
//   const [cookies, _] = useCookies(["access_token"]);

//   const[recipe, setRecipe]=useState({
//     foodname:"",
//     ingredients:[],
//     instructions:"",
//     imageLink:"",
//     timePeriod:0,
//     createdUser:userId
//   })
//   // const{
//   //   foodname,ingredients,instructions,imageLink,timePeriod,createdUser
//   // }=recipe;

//   //handlechange:
// const handlechange = (name) =>(event) =>{
// event.preventDefault();
// const value = event.target.value;
// setRecipe({...recipe, [name]:value})
// }
// //handleIngrdient Change:
// const handleIngredientchange =(event,index) =>{
//   const {value} = event.target;
//   const updatedIngredients = recipe.ingredients;
//   updatedIngredients[index] = value;
//   setRecipe({...recipe, ingredients: updatedIngredients })
//   }

// //adding Ingredient:

// const addIngredient = ()=>{
//   setRecipe({...recipe, ingredients:[...recipe.ingredients, ""]})
// }
// // console.log(recipe);
// //Submit:
// const AddRecipe = async(event) =>{
// event.preventDefault();
// try {
//   await axios.post(
//     "http://localhost:5000/recipes/create",
//     { ...recipe },
//     {
//       headers: { authorization: cookies.access_token },
//     }
//   );

//   alert("Recipe Created");
// } catch (error) {
//   console.log(error.message);
// }
// }


//   return (
//     <Base>
//     <div className='createRecipeTitle' style={{textAlign:'center'}}>Create Recipe</div>
//     <div className="createRecipe">
//     <TextField value={recipe.foodname} name='foodname' onChange={handlechange("foodname")} id="outlined-basic" label="foodname" variant="filled" />  
   
// <p>Ingredients</p>
// {recipe.ingredients.map((ingredient, idx)=>(
//  <TextField key={idx} name='ingredients' value={ingredient} onChange={(event)=>handleIngredientchange(event, idx)} id="outlined-basic" label="Ingredients" variant="filled" />
// ))}
//     <Button onClick={addIngredient} variant='contained'>ADD</Button>
//     <TextField
//           id="filled-multiline-static"
//           name='instructions' onChange={handlechange("instructions")}
//           label="Instructions"
//           value={recipe.instructions}
//           multiline
//           rows={4}
//           variant="filled"
//         />
//     <TextField name='imageLink' value={recipe.imageLink} onChange={handlechange("imageLink")} id="outlined-basic" label="Image Url" variant="filled" />
//     <TextField name='timePeriod' value={recipe.timePeriod} onChange={handlechange("timePeriod")}  id="outlined-basic" label="Time Period" variant="filled" />
//     {/* <TextField name='createdUser' value={createdUser} onChange={handlechange("createdUser")} id="outlined-basic" label="CreatedBy" variant="filled" /> */}
// <Button onClick={AddRecipe} variant='contained' style={{backgroundColor:'#f2672b'}}>Submit</Button>
//     </div>
//     </Base>
//   )
// }

// export default CreateRecipe


//================================================



import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import Base from '../../Components/Base';
import { getUserbyId } from '../../Components/GetUserbyId';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import {useHistory} from 'react-router-dom'

function CreateRecipe() {
  const history = useHistory();
  const userId = getUserbyId();
  console.log(userId);
  const [cookies, _] = useCookies(["access_token"]);

  const [recipe, setRecipe] = useState({
    foodname: "",
    ingredients: [],
    instructions: "",
    imageLink: "",
    timePeriod: 0,
    createdUser: userId,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    setRecipe((prevRecipe) => {
      const updatedIngredients = [...prevRecipe.ingredients];
      updatedIngredients[index] = value;
      return {
        ...prevRecipe,
        ingredients: updatedIngredients,
      };
    });
  };

  const addIngredient = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: [...prevRecipe.ingredients, ""],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(
        "https://cookzzie.up.railway.app/recipes/create",
        recipe,
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Recipe Created");
      setRecipe({
        ...recipe,
        foodname: "",
    ingredients: [],
    instructions: "",
    imageLink: "",
    timePeriod: 0,
      })
     await history.push('/recipes')
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Base>
      <div className='createRecipeTitle' style={{ textAlign: 'center' }}>
        Create Recipe
      </div>
      <div className='createRecipe'>
        <TextField
          value={recipe.foodname}
          name='foodname'
          onChange={handleInputChange}
          id='outlined-basic'
          label='Food Name'
          variant='filled'
        />

        <p>Ingredients</p>
        {recipe.ingredients.map((ingredient, idx) => (
          <TextField
            key={idx}
            name='ingredients'
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, idx)}
            id='outlined-basic'
            label='Ingredients'
            variant='filled'
          />
        ))}
        <Button onClick={addIngredient} variant='contained'>
          Click to add Ingredients
        </Button>

        <TextField
          id='filled-multiline-static'
          name='instructions'
          onChange={handleInputChange}
          label='Instructions'
          value={recipe.instructions}
          multiline
          rows={4}
          variant='filled'
        />
        <TextField
          name='imageLink'
          value={recipe.imageLink}
          onChange={handleInputChange}
          id='outlined-basic'
          label='Image Url'
          variant='filled'
        />
        <TextField
          name='timePeriod'
          value={recipe.timePeriod}
          onChange={handleInputChange}
          id='outlined-basic'
          label='Time Period'
          variant='filled'
        />

        <Button onClick={handleSubmit} variant='contained' style={{ backgroundColor: '#f2672b' }}>
          Submit
        </Button>
      </div>
    </Base>
  );
}

export default CreateRecipe;
