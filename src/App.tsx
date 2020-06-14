import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './components/privateRoute/PrivateRoute';
import LandingPage from './pages/Landing/LandingPage';
import AppMainPage from './pages/app/AppMainPage';
import Loading from './components/loading/Loading';
import { useAuth0 } from './context/authContext'
import history from './utils/history';
import './App.scss';

const App = () => {
  const { loading, user } = useAuth0();
  if (loading) {
    if (user && user.email) {
      localStorage.setItem('x_user', user.email)
    }
    return <Loading />
  }
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <PrivateRoute path="/app" component={AppMainPage} />
      </Switch>
    </Router>
  );
}

export default App;
