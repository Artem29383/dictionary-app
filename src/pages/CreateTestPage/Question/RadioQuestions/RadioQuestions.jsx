import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';
import RadioButton from 'pages/CreateTestPage/Question/RadioQuestions/RadioButton';
import useAction from 'hooks/useAction';
import { pushAnswer, removeTrash, toggleChecked } from 'models/test/reducer';
import S from './RadioQuestions.styled';

const RadioQuestions = ({ name, entities, ids, id }) => {
  const answerAdd = useAction(pushAnswer);
  const [checkedId, setCheckedId] = useState('');
  const toggleRadio = useAction(toggleChecked);
  const deletedTrash = useAction(removeTrash);
  const changeRadioHandler = e => {
    const radioId = e.currentTarget.id;
    setCheckedId(radioId);
    toggleRadio({ id, radioId, checkedId });
  };
  useEffect(() => {
    return () => deletedTrash(id);
  }, []);

  const addAnswer = () => {
    const uniqId = nanoid();
    const answer = {
      id: uniqId,
      value: `answer${uniqId}`,
      isChecked: false,
    };
    answerAdd({ id, qId: uniqId, answer });
  };

  useEffect(() => {
    addAnswer();
  }, []);

  const radioVariable = ids.map(qId => {
    return (
      <RadioButton
        key={entities[qId].id}
        questionId={id}
        id={entities[qId].id}
        name={name}
        radioObject={entities[qId]}
        checked={entities[qId].isChecked}
        changeHandler={changeRadioHandler}
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
