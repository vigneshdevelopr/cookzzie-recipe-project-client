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

const userId = getUserbyId();

function SavedRecipes() {
  const history = useHistory();

  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://cookzzieserver.vercel.app/recipes/saved/${userId}`
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

  return (
    <Base>
      <div className="card-sec">
        {savedRecipes.map((recipe, idx) => (
          <Card key={idx} sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "darkgoldenrod" }} aria-label="recipe">
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={recipe.foodname} 
              subheader={recipe._id}
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
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <IconButton
                aria-label="show more"
                onClick={() => handleExpandClick(idx)}
              >
                <ExpandMoreIcon />
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
    </Base>
  );
}

export default SavedRecipes;
