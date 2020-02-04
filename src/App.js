import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignInAndSignUpPage from './components/signin-signup/SignInAndSignUpPage';
import './App.scss';
import { Provider } from 'react-redux';
import store from './store';

import 'materialize-css/dist/css/materialize.min.css';
import HomePage from './components/HomePage';

function App() {
  useEffect(() => {
    // Init Materialize JS
    //M.AutoInit();
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
