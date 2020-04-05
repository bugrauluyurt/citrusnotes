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

const PrivateRoute: React.FC<any> = ({ component: Component, ...rest }) => {
    const isAnonymous = useSelector(isUserAnonymous);
    console.log('isAnonymous ->', isAnonymous);
    return (
        <Route
            {...rest}
            render={(props: any) =>
                !isAnonymous ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/authentication',
                            state: { from: props.location },
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
                <Redirect to="/authentication" />
            </Route>
            <Route path="/authentication" component={Authentication} />
            {/* Private Routes */}
            <PrivateRoute path="/settings" component={Settings} />
            <PrivateRoute path="/browse" component={Browse} />
        </Switch>
    );
};

export default Routes;
