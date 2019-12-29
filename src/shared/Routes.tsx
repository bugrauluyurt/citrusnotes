import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { get as _get } from 'lodash';
import { UserState } from 'store/user/types';
import { Authentication, Settings, Browse } from 'lazyRoutes';

const privateRouteFn: React.FC<any> = ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }: any) =>
                rest.isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/authentication',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};
const PrivateRoute = connect((state: { user: UserState }) => ({
    user: !!_get(state.user, 'user'),
}))(privateRouteFn);

const Routes: React.FC<any> = () => {
    return (
        <Switch>
            {/* Public Routes */}
            <Route exact path="/">
                <Redirect to="/browse" />
            </Route>
            <Route path="/browse" component={Browse} />
            <Route path="/authentication" component={Authentication} />
            {/* Protected Routes */}
            <PrivateRoute path="/settings">
                <Settings />
            </PrivateRoute>
        </Switch>
    );
};

export default Routes;
