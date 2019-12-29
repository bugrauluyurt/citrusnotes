import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Authentication, Settings, Browse } from 'lazyRoutes';
import { isUserAnonymous } from 'store/user/selectors';

const PrivateRoute: React.FC<any> = ({ children, ...rest }) => {
    const isAnonymous = useSelector(isUserAnonymous);
    return (
        <Route
            {...rest}
            render={({ location }: any) =>
                !isAnonymous ? (
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
