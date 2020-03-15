import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMousePosition } from 'hooks/usePosition';
import S from './ToolTip.styled';

// eslint-disable-next-line no-unused-vars
const ToolTip = ({ value, visible, toolTipHover, setShowToolTip }) => {
  const coords = useMousePosition();
  useEffect(() => {
    if (toolTipHover) {
      setTimeout(() => {
        setShowToolTip(true);
      }, 2000);
    }
  }, [toolTipHover]);

  return (
    <S.ToolTip
      title={value}
      x={coords.x}
      y={coords.y - 205}
      visible={visible}
    />
  );
};

export default ToolTip;
ToolTip.propTypes = {
  value: PropTypes.string.isRequired,
  setShowToolTip: PropTypes.func,
  visible: PropTypes.bool.isRequired,
  toolTipHover: PropTypes.bool,
};
