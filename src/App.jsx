import React from 'react';
import { ThemeProvider } from 'styled-components';
import useRoutes from 'hooks/useRoutes';
import useAuth from 'hooks/useAuth';
import { GlobalStyles } from 'styles/GlobalStyles';
import theme from 'styles/theme';
import Navigation from 'components/Navigation';
import S from './App.styled';

const App = () => {
  const { data, logoutClick, loginClick } = useAuth();
  const routes = useRoutes(data, loginClick);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <S.Content>
        {data.isAuth && <Navigation logout={logoutClick} />}
        {routes}
      </S.Content>
    </ThemeProvider>
  );
};

export default App;
