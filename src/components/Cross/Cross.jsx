import React, { memo } from 'react';
import PropTypes from 'prop-types';
import S from './Cross.styled';

const Cross = ({
  color,
  rotate,
  dataClose,
  clickHandler,
  position,
  top,
  left,
  bottom,
  right,
  hover,
}) => {
  return (
    <S.Div
      rotate={rotate}
      data-close={dataClose}
      onClick={clickHandler}
      position={position}
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      hover={hover}
    >
      <S.line1 color={color} data-close={dataClose} />
      <S.line2 color={color} data-close={dataClose} />
    </S.Div>
  );
};

Cross.propTypes = {
  color: PropTypes.string,
  rotate: PropTypes.string,
  dataClose: PropTypes.bool,
  clickHandler: PropTypes.func,
  top: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string,
  position: PropTypes.string,
  hover: PropTypes.bool,
};

Cross.defaultProps = {
  color: 'white',
  rotate: '0deg',
  dataClose: false,
  top: null,
  bottom: null,
  right: null,
  left: null,
  position: 'static',
  hover: false,
};

export default memo(Cross);
