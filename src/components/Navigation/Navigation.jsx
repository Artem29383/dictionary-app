import React from 'react';
import PropTypes from 'prop-types';
import ButtonRipple from 'components/ButtonRipple';
import routes from 'constants/routes';
import S from './Navigation.styled';

const Navigation = ({ logout }) => (
  <S.Nav>
    <S.NavItem className="left">
      <S.Link to={routes.dictionary}>
        <ButtonRipple className="green">Словарь</ButtonRipple>
      </S.Link>
    </S.NavItem>
    <S.NavItem className="padding">
      <S.Link to={routes.tests}>
        <ButtonRipple className="green">Тест</ButtonRipple>
      </S.Link>
    </S.NavItem>
    <S.NavItem className="right">
      <ButtonRipple onClick={logout} className="red">
        Выйти
      </ButtonRipple>
    </S.NavItem>
  </S.Nav>
);

export default Navigation;
Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
};
