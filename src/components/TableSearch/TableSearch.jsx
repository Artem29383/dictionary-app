import React from 'react';
import PropTypes from 'prop-types';
import Input from 'components/Input';
import S from './TableSearch.styled';

const TableSearch = ({ value, onChange, label }) => {
  return (
    <S.InputWrap>
      <Input value={value} onChange={onChange} label={label} />
    </S.InputWrap>
  );
};

export default TableSearch;
TableSearch.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
};
