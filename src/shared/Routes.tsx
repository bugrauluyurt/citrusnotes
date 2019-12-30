import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import loadable from '@loadable/component';
import { isUserAnonymous } from 'store/user/selectors';

//@TODO: Loading component must be separated from routes
const lazyRouteOptions = { fallback: <div>Loading...</div> };

// Lazy Routes
export const Authentication = loadable(() => import('./pages/Authentication'), lazyRouteOptions);
export const Browse = loadable(() => import('./pages/Browse'), lazyRouteOptions);
export const Settings = loadable(() => import('./pages/Settings'), lazyRouteOptions);

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
