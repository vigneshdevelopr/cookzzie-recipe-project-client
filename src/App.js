import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
<Login />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
