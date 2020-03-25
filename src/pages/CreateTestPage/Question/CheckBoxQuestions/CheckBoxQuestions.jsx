import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import CheckBoxButton from 'pages/CreateTestPage/Question/CheckBoxQuestions/CheckBoxButton';
import nanoid from 'nanoid';
import useAction from 'hooks/useAction';
import {
  pushAnswer,
  setInitialRadioOrCheckBox,
  toggleCheckBox,
} from 'models/test/reducer';
import useCheckChangeQuest from 'hooks/useCheckChangeQuest';
import S from './CheckBoxQuestions.styled';

const CheckBoxQuestions = ({ entities, ids, id }) => {
  const setInitAnswer = useAction(setInitialRadioOrCheckBox);
  const answerAdd = useAction(pushAnswer);
  const setToggleCheckBox = useAction(toggleCheckBox);
  const resetErrorChange = useCheckChangeQuest(id);

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

  const changeCheckBoxHandler = e => {
    const checkId = e.currentTarget.id;
    setToggleCheckBox({
      id,
      qId: checkId,
      isChecked: entities[checkId].isChecked,
    });
    resetErrorChange(ids.length);
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
      type: 'Несколько из списка',
      isValid: false,
      errorMsg: null,
    });
  }, []);

  const checkBoxVariable = ids.map(qId => {
    return (
      <CheckBoxButton
        key={qId}
        questionId={id}
        id={entities[qId].id}
        checkBoxObject={entities[qId]}
        changeCheckBoxHandler={changeCheckBoxHandler}
      />
    );
  });

  return (
    <>
      {checkBoxVariable}
      <S.AddAnswer onClick={addAnswer}>Добавить вариант</S.AddAnswer>
    </>
  );
};

export default CheckBoxQuestions;
CheckBoxQuestions.propTypes = {
  entities: PropTypes.any,
  ids: PropTypes.array,
  id: PropTypes.string,
};
