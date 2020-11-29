import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ loggedIn, ...routeProps }) => {
  return(
    <Route>
      {
        () => loggedIn ? <Route {...routeProps} /> : <Redirect to="/signin" />
      }
    </Route>
  )
};

export default ProtectedRoute