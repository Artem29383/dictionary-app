import React from 'react';
import PropTypes from 'prop-types';
import S, { InputField, Label } from './Input.styled';

const Input = ({ label, value, onChange, register, name, type = 'text' }) => (
  <S.Group>
    <InputField
      placeholder=" "
      value={value}
      onChange={onChange}
      ref={register}
      name={name}
      type={type}
    />
    <Label>{label}</Label>
  </S.Group>
);

export default Input;

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  register: PropTypes.func,
  name: PropTypes.string,
  type: PropTypes.string,
};
