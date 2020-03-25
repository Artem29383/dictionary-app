import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';
import InputEdit from 'components/InputEdit';
import { setNumericAnswer } from 'models/test/reducer';
import useAction from 'hooks/useAction';
import S from './NumberQuestion.styled';

const NumberQuestion = ({ id }) => {
  const [temp, setTemp] = useState('');
  const [qId, setQId] = useState(null);
  const [value, setValue] = useState('Введите ответ');
  const [edit, setEdit] = useState(false);
  const setNumeric = useAction(setNumericAnswer);
  const setValueHandler = e => {
    setValue(e.currentTarget.value);
  };

  useEffect(() => {
    setQId(nanoid());
  }, []);

  useEffect(() => {
    if (qId) {
      setNumeric({ id, qId, value, isChecked: true, type: 'Численный' });
    }
  }, [qId]);

  const startEdit = () => {
    setEdit(true);
    setTemp(value);
  };

  const endEditBlur = () => {
    if (value.trim()) {
      setEdit(false);
      setNumeric({ id, qId, value, isChecked: true, type: 'Численный' });
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
        setNumeric({
          id,
          qId,
          value,
          isChecked: true,
          type: 'Численный',
          isValid: false,
          errorMsg: null,
        });
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
NumberQuestion.propTypes = {
  id: PropTypes.string,
};
