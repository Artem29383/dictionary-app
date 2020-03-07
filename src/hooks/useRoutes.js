import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AuthPage from 'pages/AuthPage';
import routes from 'constants/routes';
import RegisterPage from 'pages/RegisterPage';
import routs from '../routs';

const useRoutes = (authData, login) => {
  // eslint-disable-next-line consistent-return
  const showRoutes = () => {
    const user = authData.user[0];
    return (
      <>
        {/* eslint-disable-next-line array-callback-return,consistent-return */}
        {routs.map(({ path, exact, component: Component, isAdmin }) => {
          if (isAdmin === user.isAdmin) {
            return (
              <Route
                key={path}
                exact={exact}
                path={path}
                render={props => (
                  /* eslint-disable-next-line react/jsx-props-no-spreading */
                  <Component {...props} user={user} />
                )}
              />
            );
          }
          return (
            <Route
              key={path}
              exact={exact}
              path={path}
              render={props => (
                /* eslint-disable-next-line react/jsx-props-no-spreading */
                <Component {...props} user={user} />
              )}
            />
          );
        })}
        {user.isAdmin ? (
          <Redirect to={routes.edit} />
        ) : (
          <Redirect to={routes.dictionary} />
        )}
      </>
    );
  };
  if (!authData.isAuth) {
    return (
      <Switch>
        <Route
          exact
          path={routes.auth}
          render={() => <AuthPage logIn={login} />}
        />
        <Route exact path={routes.register} render={() => <RegisterPage />} />
        <Redirect to={routes.auth} />
      </Switch>
    );
  }
  return <Switch>{showRoutes()}</Switch>;
};

export default useRoutes;
