import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Error } from 'components/Error';
import { Login } from 'components/Login';
import { Register } from 'components/Register';
import { ROUTE_LOGIN, ROUTE_REGISTER } from 'pages/Authentication/routes';
import { getUserError, isUserAnonymous } from 'store/user/selectors';
import styles from './Authentication.module.css';

const Authentication: React.FC<any> = (): JSX.Element => {
    const { path } = useRouteMatch();
    const errorMessage = useSelector(getUserError);
    const isAnonymous = useSelector(isUserAnonymous);
    const history = useHistory();
    useEffect(() => {
        if (!isAnonymous) {
            history.push('/home');
        }
    }, [isAnonymous]);

    return (
        <React.Fragment>
            {!isAnonymous ? null : (
                <div className={styles.authenticationComponent}>
                    <div className={styles.authenticationComponentInner}>
                        <div className={styles.authenticationBox}>
                            <div className="error-wrapper">
                                {errorMessage && <Error errorMessage={errorMessage} />}
                            </div>
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
            )}
        </React.Fragment>
    );
};

export default Authentication;
