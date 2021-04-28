import React from 'react';
import { Route, Redirect } from "react-router-dom";

const GuardedRouteAdminLogged = ({ component: Component, auth, ...rest }) => (
    <Route {...rest} render={(props) => (
        auth === true
            ? <Component {...props} />
            : <Redirect to='/notfound' />
    )} />
)

export default GuardedRouteAdminLogged;