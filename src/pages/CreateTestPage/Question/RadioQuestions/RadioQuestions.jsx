import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';
import RadioButton from 'pages/CreateTestPage/Question/RadioQuestions/RadioButton';
import useAction from 'hooks/useAction';
import {
  pushAnswer,
  setInitialRadioOrCheckBox,
  toggleChecked,
} from 'models/test/reducer';
import useCheckChangeQuest from 'hooks/useCheckChangeQuest';
import S from './RadioQuestions.styled';

const RadioQuestions = ({ name, entities, ids, id }) => {
  const answerAdd = useAction(pushAnswer);
  const [checkedId, setCheckedId] = useState('');
  const toggleRadio = useAction(toggleChecked);
  const setInitAnswer = useAction(setInitialRadioOrCheckBox);
  const resetErrorChange = useCheckChangeQuest(id);
  const changeRadioHandler = e => {
    const radioId = e.currentTarget.id;
    setCheckedId(radioId);
    toggleRadio({ id, radioId, checkedId });
    resetErrorChange(ids.length);
  };

  const addAnswer = () => {
    const uniqId = nanoid();
    const answer = {
      id: uniqId,
      value: `Вариант ответа`,
      isChecked: false,
    };
    answerAdd({ id, qId: uniqId, answer });
    resetErrorChange(ids.length + 1);
  };

  useEffect(() => {
    const uniqId = nanoid();
    const answer = {
      id: uniqId,
      value: `Вариант ответа`,
      isChecked: false,
    };
    setInitAnswer({
      id,
      qId: uniqId,
      answer,
      type: 'Один из нескольких',
      isValid: false,
      errorMsg: null,
    });
  }, []);

  const radioVariable = ids.map(qId => {
    return (
      <RadioButton
        key={entities[qId].id}
        questionId={id}
        id={entities[qId].id}
        name={name}
        radioObject={entities[qId]}
        changeHandler={changeRadioHandler}
        setCheckedId={setCheckedId}
      />
    );
  });

  return (
    <>
      {radioVariable}
      {/* eslint-disable-next-line no-undef */}
      <S.AddAnswer onClick={addAnswer}>Добавить вариант</S.AddAnswer>
    </>
  );
};

export default RadioQuestions;
RadioQuestions.propTypes = {
  name: PropTypes.string,
  entities: PropTypes.any,
  ids: PropTypes.array,
  id: PropTypes.string,
};
