import React from 'react';
import { ThemeProvider } from 'styled-components';
import AppRoutes from 'components/AppRoutes/AppRoutes';
import useAuth from 'hooks/useAuth';
import { GlobalStyles } from 'styles/GlobalStyles';
import theme from 'styles/theme';
import Navigation from 'components/Navigation';
import useInit from 'hooks/useInit';
import S from './App.styled';

const App = () => {
  const init = useInit();
  const data = useAuth();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {init && (
        <S.Content>
          {data.isAuth && <Navigation />}
          {<AppRoutes data={data} />}
        </S.Content>
      )}
    </ThemeProvider>
  );
};

export default App;
