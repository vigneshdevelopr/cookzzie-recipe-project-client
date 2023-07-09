import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup"; 
import Recipes from "./Pages/Recipes/Recipes";
import SavedRecipes from "./Pages/Recipes/SavedRecipes";
import CreateRecipe from "./Pages/Recipes/CreateRecipe";
import LostPage from "./Pages/LostPage";

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
        <Route path="/recipes">
          <Recipes />
        </Route>
        <Route path="/saved">
          <SavedRecipes />
        </Route>
        <Route path="/create">
          <CreateRecipe />
        </Route>
        <Route path="**">
          <LostPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
