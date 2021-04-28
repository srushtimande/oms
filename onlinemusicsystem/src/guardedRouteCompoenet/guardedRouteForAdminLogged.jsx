import React from 'react';
import { Route, Redirect } from "react-router-dom";

const GuardedRouteAdmin = ({ component: Component, auth, ...rest }) => (
    <Route {...rest} render={(props) => (
        auth === true
            ? <Component {...props} />
            : <Redirect to='/adminDashboard' />
    )} />
)

export default GuardedRouteAdmin;