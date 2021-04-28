import React from 'react';
import { Route, Redirect } from "react-router-dom";

const GuardedRouteLogged = ({ component: Component, auth, ...rest }) => (
    <Route {...rest} render={(props) => (
        auth === true
            ? <Component {...props} />
            : <Redirect to='/home' />
    )} />
)

export default GuardedRouteLogged;