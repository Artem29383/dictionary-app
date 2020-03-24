import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import AuthPage from 'pages/AuthPage';
import routes from 'constants/routes';
import RegisterPage from 'pages/RegisterPage';
import routs from '../../routs';

const AppRoutes = ({ data }) => {
  // eslint-disable-next-line consistent-return
  const user = data.user[0];
  if (!data.isAuth) {
    return (
      <Switch>
        <Route exact path={routes.auth} render={() => <AuthPage />} />
        <Route exact path={routes.register} render={() => <RegisterPage />} />
        <Redirect to={routes.auth} />
      </Switch>
    );
  }
  return (
    <Switch>
      {/* eslint-disable-next-line array-callback-return,consistent-return */}
      {routs.map(({ path, exact, component: Component, isAdmin, isAuth }) => {
        if (isAuth) {
          if (isAdmin === user.isAdmin) {
            return (
              <Route
                key={path}
                exact={exact}
                path={path}
                render={props => (
                  /* eslint-disable-next-line react/jsx-props-no-spreading */
                  <Component {...props} />
                )}
              />
            );
          }
          if (isAdmin === false) {
            return (
              <Route
                key={path}
                exact={exact}
                path={path}
                render={props => (
                  /* eslint-disable-next-line react/jsx-props-no-spreading */
                  <Component {...props} />
                )}
              />
            );
          }
        }
      })}
      <Redirect to={user.isAdmin ? routes.edit : routes.dictionary} />
    </Switch>
  );
};

export default AppRoutes;
AppRoutes.propTypes = {
  data: PropTypes.object,
};
