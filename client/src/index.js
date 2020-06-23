import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";


import * as serviceWorker from './serviceWorker';
import App from './components/App';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Staff from './components/Staff';
import UserProfile from "./components/UserProfile/index";
import reducers from './reducers';

import RentalList from './components/RentalList';

const jwtToken = localStorage.getItem('JWT_TOKEN');

ReactDOM.render(
  <Provider
    store={createStore(
      reducers,
      {
        auth: {
          token: jwtToken,
          isAuthenticated: jwtToken ? true : false,
        },
      },
      applyMiddleware(reduxThunk)
    )}
  >
    <BrowserRouter>
      <App>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/staff" component={Staff} />
        <Route exact path="/user-profile" component={UserProfile} />
      </App>


    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
