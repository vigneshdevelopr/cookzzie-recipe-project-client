import axios from "axios";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getUserbyId } from "../../Components/GetUserbyId";
import { useHistory } from "react-router-dom";
import Base from "../../Components/Base";
import  Delete  from "@mui/icons-material/Delete";
import { InfoRounded } from "@mui/icons-material";

const userId = getUserbyId();

function SavedRecipes() {
  const history = useHistory();

  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://cookzzie.up.railway.app/recipes/saved/${userId}`
        );
        console.log(response.data); // Check the response data from the server

        console.log(userId);
        setSavedRecipes(response.data)
        console.log(savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, []);

  const handleExpandClick = (index) => {
    setSavedRecipes((prevSavedRecipes) =>
      prevSavedRecipes.map((recipe, idx) => {
        if (idx === index) {
          return {
            ...recipe,
            expanded: !recipe.expanded,
          };
        }
        return recipe;
      })
    );
  };


  const handleRemove = async(productId)=>{
try {
  const response = await axios.delete(
    `https://cookzzie.up.railway.app/recipes/savedRecipes/${userId}/${productId}`
  );
  setSavedRecipes((prevCart) => prevCart.filter((item) => item._id !== productId));
  console.log(response);
  alert("Your selected Recipe has been removed from Saved List");
} catch (error) {
  console.log(error);

}
  }


  // const empty = () =>{
  //   if(savedRecipes===[]){
  //     return (
  //       <h1 style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
  //         Your Don't have any Saved Recipes, Go to Home and Save Your Favorite Recipe's
  //       </h1>
  //     )
  //   }
  // }

  return (
    <Base>
      <div className="card-sec">
        {savedRecipes.length === 0 ? (
          <div>
            <h1>
              You didn't saved any recipes.. Please go and save your favorite recipes on our homepage
            </h1>
          </div>
        ):(
          <div>
{savedRecipes.map((recipe, idx) => (
          <Card key={idx} sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "lightblue",color:'#252525' }} aria-label="recipe">
                  {recipe.foodname[0]}
                </Avatar>
              }
             
              title={recipe.foodname} 
            />
            <CardMedia
              component="img"
              height="194"
              image={recipe.imageLink}
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {recipe.foodname}
              </Typography>
              <h4>INGREDIENTS:</h4>
               {recipe.ingredients.map((data,idx)=>(
              <Typography key={idx} variant="body2" color="text.primary">
               {data}
              </Typography>

                ))}
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="delete"  >
                <div onClick={()=>handleRemove(recipe._id)}>

                <Delete style={{color:'red'}} />
                </div>
              </IconButton>
              <IconButton
                aria-label="show more"
                onClick={() => handleExpandClick(idx)}
              >
                <InfoRounded />
              </IconButton>
            </CardActions>
            <Collapse in={recipe.expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Method:</Typography>
                {/* Recipe details */}
                <Typography paragraph>{recipe.method}</Typography> {/* Use the correct property to display the recipe method */}
                <Typography>
                  {recipe.instructions}
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        ))}
          </div>
        )}
        
      </div>
    </Base>
  );
}

export default SavedRecipes;
