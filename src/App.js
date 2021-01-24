import './App.css';
import Profile from './cmp/Profile';
import List from './cmp/List';
import Logout from './cmp/Logout';
import Auth from './cmp/Auth';
import Register from './cmp/Register';
import ProtectedRoutes from './cmp/ProtectedRoutes';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <div className="auth-wrapper">

        <div>
          <Router>
            <Switch>
              <Route path="/profile" exact>
                <ProtectedRoutes cmp={Profile} />
              </Route>
              <Route path="/logout" >
                <ProtectedRoutes cmp={Logout} logout={1} />
              </Route>
              <Route path="/admin" >
                <ProtectedRoutes cmp={List} admin={1} />
              </Route>
              <Route path="/signup">
                <Register />
              </Route>
              <Route path="/">
                <Auth />
              </Route>
            </Switch>
          </Router>
        </div >
      </div>
    </div>
  );
}

export default App;
