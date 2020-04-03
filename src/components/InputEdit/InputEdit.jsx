import React, { memo } from 'react';
import PropTypes from 'prop-types';
import S from './InputEdit.styled';

const InputEdit = ({
  value,
  handler,
  blur,
  keyDown,
  label,
  focus,
  isError,
  type,
}) => (
  <>
    <S.Group>
      <S.InputField
        value={value}
        onChange={handler}
        onBlur={blur}
        onKeyDown={keyDown}
        placeholder=" "
        type={type}
        autoFocus={focus}
      />
      <S.Bar isError={isError} />
      {label && <S.Label>{label}</S.Label>}
    </S.Group>
    {isError && <S.Error>Введите уникальное название.</S.Error>}
  </>
);

export default memo(InputEdit);
InputEdit.propTypes = {
  value: PropTypes.string,
  handler: PropTypes.func,
  blur: PropTypes.func,
  keyDown: PropTypes.func,
  label: PropTypes.string,
  focus: PropTypes.bool,
  isError: PropTypes.bool,
  type: PropTypes.string,
};

InputEdit.defaultProps = {
  focus: false,
  type: 'text',
};
