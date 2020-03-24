import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import InputEdit from 'components/InputEdit';
import S from './NumberQuestion.styled';

const NumberQuestion = () => {
  const [temp, setTemp] = useState('');
  const [value, setValue] = useState('Введите ответ');
  const [edit, setEdit] = useState(false);

  const setValueHandler = e => {
    setValue(e.currentTarget.value);
  };

  const startEdit = () => {
    setEdit(true);
    setTemp(value);
  };

  const endEditBlur = () => {
    if (value.trim()) {
      setEdit(false);
    }
  };

  const endEditKey = e => {
    if (value.trim()) {
      if (e.key === 'Escape') {
        setEdit(false);
        setValue(temp);
      }
      if (e.key === 'Enter') {
        setEdit(false);
      }
    }
  };

  return (
    <S.Wrap>
      {edit ? (
        <InputEdit
          label="Правильный ответ"
          handler={setValueHandler}
          value={value}
          focus
          blur={endEditBlur}
          keyDown={endEditKey}
        />
      ) : (
        <S.Answer onClick={startEdit}>Ответ: {value}</S.Answer>
      )}
    </S.Wrap>
  );
};

export default NumberQuestion;
// NumberQuestion.propTypes = {
//   setResponse: PropTypes.func,
// };
