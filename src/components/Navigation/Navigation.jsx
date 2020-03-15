import React from 'react';
import ButtonRipple from 'components/ButtonRipple';
import routes from 'constants/routes';
import useAction from 'hooks/useAction';
import { setDictionary } from 'models/dictionary/reducer';
import { logoutUser } from 'models/user/reducer';
import S from './Navigation.styled';

const Navigation = () => {
  const resetDictionary = useAction(setDictionary);
  const logout = useAction(logoutUser);

  const logoutClick = () => {
    localStorage.removeItem('user');
    resetDictionary({
      entities: [],
      ids: [],
    });
    logout();
  };

  return (
    <S.Nav>
      <S.NavItem className="left">
        <S.Link to={routes.dictionary}>
          <ButtonRipple className="green">Словарь</ButtonRipple>
        </S.Link>
      </S.NavItem>
      <S.NavItem className="padding">
        <S.Link to={routes.controlWordsPage}>
          <ButtonRipple className="green">Тест</ButtonRipple>
        </S.Link>
      </S.NavItem>
      <S.NavItem className="right">
        <ButtonRipple onClick={logoutClick} className="red">
          Выйти
        </ButtonRipple>
      </S.NavItem>
    </S.Nav>
  );
};

export default Navigation;
