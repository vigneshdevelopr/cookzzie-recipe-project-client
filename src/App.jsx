import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup"; 
import Recipes from "./Pages/Recipes/Recipes";
import SavedRecipes from "./Pages/Recipes/SavedRecipes";
import CreateRecipe from "./Pages/Recipes/CreateRecipe";
import LostPage from "./Pages/LostPage";

const usertoken = localStorage.getItem('access_token');

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
           <Login />
        </Route>
        <Route path="/signup">
       <Signup />
        </Route>
        {usertoken ? (
          <>
            <Route path="/recipes">
              <Recipes />
            </Route>
            <Route path="/saved">
              <SavedRecipes />
            </Route>
            <Route path="/create">
              <CreateRecipe />
            </Route>
          </>
        ):(
          <Redirect to="/" />
        )}
        <Route path="**">
    <LostPage /> 
        </Route>
      </Switch>
    </div>
  );
}

export default App;
