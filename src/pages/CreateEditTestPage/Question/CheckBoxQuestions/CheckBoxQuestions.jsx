import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import CheckBoxButton from 'pages/CreateEditTestPage/Question/CheckBoxQuestions/CheckBoxButton';
import nanoid from 'nanoid';
import useAction from 'hooks/useAction';
import { pushAnswer, toggleCheckBox } from 'models/test/reducer';
import useCheckChangeQuest from 'hooks/useCheckChangeQuest';
import S from './CheckBoxQuestions.styled';

const CheckBoxQuestions = ({ entities, ids, id }) => {
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

  const checkBoxVariable = ids.map((qId, index) => {
    return (
      <CheckBoxButton
        index={index}
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
      <Droppable droppableId={id}>
        {provided => (
          <S.DragZone
            ref={provided.innerRef}
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...provided.droppableProps}
          >
            {checkBoxVariable}
            {provided.placeholder}
          </S.DragZone>
        )}
      </Droppable>
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
