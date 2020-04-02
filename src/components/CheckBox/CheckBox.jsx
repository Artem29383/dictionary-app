import React, { memo } from 'react';
import PropTypes from 'prop-types';
import S, { Label, Span } from 'components/CheckBox/CheckBox.styled';

const CheckBox = ({ id, isChecked, changeHandler, label }) => (
  <>
    <S.Input
      type="checkbox"
      id={id}
      checked={isChecked}
      onChange={changeHandler}
      value={label}
    />
    <Label htmlFor={id}>
      {label}
      <Span />
    </Label>
  </>
);

CheckBox.propTypes = {
  id: PropTypes.string,
  isChecked: PropTypes.bool,
  changeHandler: PropTypes.func,
  label: PropTypes.string,
};

export default memo(CheckBox);
