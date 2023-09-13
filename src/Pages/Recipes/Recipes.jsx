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

//card functionality
// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));
const userId = getUserbyId();

function Recipes() {
  const history = useHistory();

  const [recipes, setRecipes] = useState([]);
  const[savedRecipes, setSavedRecipes] = useState([])
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //initially fetch the all the recipes:
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("https://cookzzie.up.railway.app/recipes");
        const getRecipes = response.data
        setRecipes((prevRecipes) => [...prevRecipes, ...getRecipes]);

        console.log(recipes);
      } catch (error) {
        console.log(error.message);
      }
    };

    //savedRecipe:
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://cookzzie.up.railway.app/recipes/saved/id/${userId}`
        );
        setSavedRecipes(response.data.savedRecipes);
        console.log(savedRecipes)
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipe();
    fetchSavedRecipes();
  }, []);

  //savedRecipe:
  const savedRecipe = async (recipeId) => {
    try {
      const response = await axios.put("https://cookzzie.up.railway.app/recipes/saved", {
        recipeId,
        userId,
      });
      //  setRecipes(response.data);
      alert('Your Recipe has been Saved Successfully!');
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Base>
    <div className="card-sec">
      {recipes?.map((recipe, idx) => (
        <Card key={idx} sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "lightblue",color:'#252525' }} aria-label="recipe">
                {recipe.foodname[0]}
              </Avatar>
            }
          
            title={recipe.foodname}
            subheader= {`Time Period to Cook: ${recipe.timePeriod}min`} />
          <CardMedia
            component="img"
            height="194"
            image={recipe.imageLink}
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body" style={{color:'black',fontSize:'larger',fontWeight:'500',display:'flex', justifyContent:'center'}}>
              {recipe.foodname}
            </Typography>
            
          </CardContent>
          <CardActions disableSpacing>
            <div onClick={() => savedRecipe(recipe._id)}>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
                <Typography variant="body2" style={{color:'grey',marginLeft:'2rem',textAlign:'justify'}} >
            Click ❤️ to Save your recipe, and go to saved page to see the cooking methodology
            </Typography>
              </IconButton>
            </div>
  
            {/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore> */}
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Method:</Typography>
              <Typography paragraph>
                Heat 1/2 cup of the broth in a pot until simmering, add saffron
                and set aside for 10 minutes.
              </Typography>
              <Typography paragraph>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep
                skillet over medium-high heat. Add chicken, shrimp and chorizo,
                and cook, stirring occasionally until lightly browned, 6 to 8
                minutes. Transfer shrimp to a large plate and set aside, leaving
                chicken and chorizo in the pan. Add pimentón, bay leaves,
                garlic, tomatoes, onion, salt and pepper, and cook, stirring
                often until thickened and fragrant, about 10 minutes. Add
                saffron broth and remaining 4 1/2 cups chicken broth; bring to a
                boil.
              </Typography>
              <Typography paragraph>
                Add rice and stir very gently to distribute. Top with artichokes
                and peppers, and cook without stirring, until most of the liquid
                is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
                reserved shrimp and mussels, tucking them down into the rice,
                and cook again without stirring, until mussels have opened and
                rice is just tender, 5 to 7 minutes more. (Discard any mussels
                that don&apos;t open.)
              </Typography>
              <Typography>
                Set aside off of the heat to let rest for 10 minutes, and then
                serve.
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </div>
    </Base>
  );
}

export default Recipes;
