import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import loadable from '@loadable/component';
import pMinDelay from 'p-min-delay';
import { isUserAnonymous } from 'store/user/selectors';
import LazyLoadingSpinner from 'components/LazyLoadingSpinner';

const lazyRouteDelay = 2000;
const lazyRouteOptions = { fallback: <LazyLoadingSpinner /> };

// Lazy Routes
export const Authentication = loadable(
    () => pMinDelay(import('./pages/Authentication'), lazyRouteDelay),
    lazyRouteOptions
);
export const Browse = loadable(
    () => pMinDelay(import('./pages/Browse'), lazyRouteDelay),
    lazyRouteOptions
);
export const Settings = loadable(
    () => pMinDelay(import('./pages/Settings'), lazyRouteDelay),
    lazyRouteOptions
);

const PrivateRoute: React.FC<any> = ({ component: Component, ...rest }) => {
    const isAnonymous = useSelector(isUserAnonymous);
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
