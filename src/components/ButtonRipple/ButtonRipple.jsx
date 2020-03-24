import React from 'react';
import PropTypes from 'prop-types';
import S from './ButtonRipple.styled';

const ButtonRipple = ({ children, className, onClick, dataClose }) => (
  <S.Button className={className} onClick={onClick} data-close={dataClose}>
    {children}
  </S.Button>
);

export default ButtonRipple;

ButtonRipple.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  dataClose: PropTypes.bool,
};

ButtonRipple.defaultProps = {
  dataClose: false,
};
