import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import nanoid from 'nanoid';
import RadioButton from 'pages/CreateEditTestPage/Question/RadioQuestions/RadioButton';
import useAction from 'hooks/useAction';
import { pushAnswer, toggleChecked } from 'models/test/reducer';
import useCheckChangeQuest from 'hooks/useCheckChangeQuest';
import S from './RadioQuestions.styled';

const RadioQuestions = ({ name, entities, ids, id }) => {
  const answerAdd = useAction(pushAnswer);
  const toggleRadio = useAction(toggleChecked);
  const resetErrorChange = useCheckChangeQuest(id);
  const changeRadioHandler = e => {
    // eslint-disable-next-line array-callback-return,consistent-return
    const checkedId = ids.filter(qId => {
      if (entities[qId].isChecked) return qId;
    });
    const radioId = e.currentTarget.id;
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

  const radioBtns = ids.map((qId, index) => (
    <RadioButton
      key={entities[qId].id}
      questionId={id}
      index={index}
      id={entities[qId].id}
      name={name}
      radioObject={entities[qId]}
      changeHandler={changeRadioHandler}
      ids={ids}
      entities={entities}
    />
  ));

  return (
    <>
      <Droppable droppableId={id}>
        {provided => (
          <S.DragZone
            ref={provided.innerRef}
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...provided.droppableProps}
          >
            {radioBtns}
            {provided.placeholder}
          </S.DragZone>
        )}
      </Droppable>
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
