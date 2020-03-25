import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import ButtonRipple from 'components/ButtonRipple';
import Cross from 'components/Cross';
import S from './ModalOverlay.styled';

const ModalOverlay = ({
  nameClass,
  toggle,
  children,
  isFooter,
  negativeBtn,
  positiveBtn,
  headerText,
  link,
  linkPath,
  clickHandler,
  isCloseBtn1,
  isCloseBtn2,
}) => {
  const [animated, setAnimated] = useState(null);
  const SPEED_ANIMATION = '0.2s';

  useEffect(() => {
    setAnimated(true);
  }, []);

  const hideWindow = e => {
    if (e.target.dataset.close === 'true' || e.key === 'Escape') {
      e.preventDefault();
      setAnimated(false);
      setTimeout(() => toggle(false), 200);
    }
  };

  useEffect(() => {
    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';
    document.addEventListener('click', hideWindow);
    document.addEventListener('keydown', hideWindow);
    return () => {
      document.body.style.height = '100%';
      document.body.style.overflow = 'visible';
      document.removeEventListener('click', hideWindow);
      document.removeEventListener('keydown', hideWindow);
    };
  }, []);

  return (
    <S.OverlayM
      className={nameClass}
      isAnim={animated}
      speedAnim={SPEED_ANIMATION}
      data-close
    >
      <S.ModalWindow
        className={nameClass}
        isAnim={animated}
        speedAnim={SPEED_ANIMATION}
      >
        <S.ModalHeader>
          <Cross rotate="45deg" right="20px" position="absolute" dataClose />
          {headerText}
        </S.ModalHeader>
        {children}
        {isFooter && (
          <S.ModalFooter>
            {negativeBtn && (
              <ButtonRipple
                onClick={clickHandler}
                className="red"
                dataClose={isCloseBtn1}
              >
                {negativeBtn}
              </ButtonRipple>
            )}
            {positiveBtn && (
              <ButtonRipple dataClose={isCloseBtn2}>{positiveBtn}</ButtonRipple>
            )}
            {link && (
              <S.Link to={linkPath}>
                <ButtonRipple dataClose>{link}</ButtonRipple>
              </S.Link>
            )}
          </S.ModalFooter>
        )}
      </S.ModalWindow>
    </S.OverlayM>
  );
};

ModalOverlay.propTypes = {
  nameClass: PropTypes.string,
  toggle: PropTypes.func.isRequired,
  children: PropTypes.node,
  isFooter: PropTypes.bool,
  negativeBtn: PropTypes.string,
  positiveBtn: PropTypes.string,
  headerText: PropTypes.string,
  link: PropTypes.string,
  linkPath: PropTypes.string,
  clickHandler: PropTypes.func,
  isCloseBtn1: PropTypes.bool,
  isCloseBtn2: PropTypes.bool,
};

ModalOverlay.defaultProps = {
  isFooter: false,
  linkPath: '/',
  headerText: 'just modal window',
  isCloseBtn1: false,
  isCloseBtn2: false,
};

export default memo(ModalOverlay);
