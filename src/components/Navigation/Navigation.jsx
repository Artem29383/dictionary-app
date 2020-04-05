import React, { useCallback, useEffect, useRef, useState } from 'react';
import ButtonRipple from 'components/ButtonRipple';
import routes from 'constants/routes';
import useAction from 'hooks/useAction';
import { setDictionary } from 'models/dictionary/reducer';
import { logoutUser } from 'models/user/reducer';
import useTransition from 'hooks/useTransition';
import S from './Navigation.styled';

const Navigation = () => {
  const resetDictionary = useAction(setDictionary);
  const timeOut = ['0.2s', 100];
  const logout = useAction(logoutUser);
  const [showHeader, setShowHeader] = useState(true);
  const [scroll, setScroll] = useState(0);
  const headerHeight = useRef();
  const [showNav, setShowNav, isAnim] = useTransition(false, timeOut[1], false);

  const checkScroll = useCallback(() => {
    if (
      window.pageYOffset > scroll + 50 &&
      window.pageYOffset > headerHeight.current.clientHeight
    ) {
      if (showNav) {
        setShowNav(false);
      }
      setShowHeader(false);
      setScroll(window.pageYOffset);
    } else if (window.pageYOffset < scroll) {
      setShowHeader(true);
      setScroll(window.pageYOffset);
    }
  });

  useEffect(() => {
    window.addEventListener('scroll', checkScroll);
    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  });

  const logoutClick = () => {
    localStorage.removeItem('user');
    resetDictionary({
      entities: [],
      ids: [],
    });
    logout();
  };

  return (
    <S.Nav ref={headerHeight} isShow={showHeader}>
      <S.NavList isOpen={showNav} isAnim={isAnim} speed={timeOut[0]}>
        <S.NavUl>
          <S.NavItem className="left">
            <S.Link to={routes.dictionary}>
              <ButtonRipple className="green" clickHandler={setShowNav}>
                Словарь
              </ButtonRipple>
            </S.Link>
          </S.NavItem>
          <S.NavItem className="padding">
            <S.Link to={routes.controlWordsPage}>
              <ButtonRipple className="green" clickHandler={setShowNav}>
                Тест
              </ButtonRipple>
            </S.Link>
          </S.NavItem>
          <S.NavItem className="padding">
            <S.Link to={routes.tests}>
              <ButtonRipple className="green" clickHandler={setShowNav}>
                Тесты
              </ButtonRipple>
            </S.Link>
          </S.NavItem>
        </S.NavUl>
      </S.NavList>
      <S.Burger onClick={setShowNav}>
        <S.Line1 isOpen={showNav} speed={timeOut[0]} />
        <S.Line2 isOpen={showNav} speed={timeOut[0]} />
        <S.Line3 isOpen={showNav} speed={timeOut[0]} />
      </S.Burger>
      <S.NavItem className="right">
        <ButtonRipple clickHandler={logoutClick} className="red">
          Выйти
        </ButtonRipple>
      </S.NavItem>
    </S.Nav>
  );
};

export default Navigation;
