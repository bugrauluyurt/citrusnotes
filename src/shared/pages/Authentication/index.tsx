import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useRouteMatch } from 'react-router';
import { Login } from 'components/Login';
import { ROUTE_LOGIN, ROUTE_REGISTER } from 'pages/Authentication/routes';
import { Register } from 'components/Register';
import styles from './Authentication.module.css';

const Authentication: React.FC<any> = () => {
    const { path } = useRouteMatch();
    return (
        <React.Fragment>
            <div className={styles.authenticationComponent}>
                <div className={styles.authenticationComponentInner}>
                    <div className={styles.authenticationBox}>
                        <div className="w-full">
                            <Switch>
                                <Route exact path={path}>
                                    <Redirect to={`${path}/${ROUTE_LOGIN}`} />
                                </Route>
                                <Route path={`${path}/${ROUTE_LOGIN}`}>
                                    <Login />
                                </Route>
                                <Route path={`${path}/${ROUTE_REGISTER}`}>
                                    <Register />
                                </Route>
                            </Switch>
                            <p className="text-center text-gray-500 text-xs">
                                &copy;2020 CitrusNotes. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Authentication;
