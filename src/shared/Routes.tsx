import loadable from '@loadable/component';
import pMinDelay from 'p-min-delay';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import LazyLoadingSpinner from 'components/LazyLoadingSpinner';
import { isUserAnonymous } from 'store/user/selectors';

const lazyRouteDelay = 2000;
const lazyRouteOptions = { fallback: <LazyLoadingSpinner /> };

// Lazy Routes
export const Authentication = loadable(
    () => pMinDelay(import('./pages/Authentication'), lazyRouteDelay),
    lazyRouteOptions
);
export const Home = loadable(
    () => pMinDelay(import('./pages/Home'), lazyRouteDelay),
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
                <Redirect to="/home" />
            </Route>
            <Route path="/authentication" component={Authentication} />
            {/* Private Routes */}
            <PrivateRoute path="/settings" component={Settings} />
            <PrivateRoute path="/home" component={Home} />
        </Switch>
    );
};

export default Routes;
