import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import Edit from 'components/Edit/Edit';
import InputEdit from 'components/InputEdit';
import useAction from 'hooks/useAction';
import {
  removeAnswerFromRadioOrCheckBox,
  updateFieldAnswer,
} from 'models/test/reducer';
import Cross from 'components/Cross';
import Radio from 'components/Radio';
import S from './RadioButton.styled';

const RadioButton = ({
  id,
  name,
  radioObject,
  changeHandler,
  questionId,
  index,
}) => {
  const [radioLabel, setRadioLabel] = useState(radioObject.value);
  const [edit, setEdit] = useState(false);
  const [isError, setIsError] = useState(false);
  const updateField = useAction(updateFieldAnswer);
  const removeAnswer = useAction(removeAnswerFromRadioOrCheckBox);

  const changeRadioLabelHandler = e => {
    setRadioLabel(e.currentTarget.value);
    if (isError) {
      setIsError(false);
    }
  };

  const startEdit = () => {
    setEdit(true);
  };

  const endEditBlur = () => {
    if (radioLabel.trim()) {
      setEdit(false);
      updateField({ id: questionId, qId: id, value: radioLabel });
    }
  };

  const endEditKeyDown = e => {
    if (e.key === 'Escape') {
      setRadioLabel(radioObject.value);
      setEdit(false);
    }
    if (e.key === 'Enter' && radioLabel.trim()) {
      setEdit(false);
      updateField({ id: questionId, qId: id, value: radioLabel });
    }
  };

  const deleteAnswer = () => {
    removeAnswer({ id: questionId, qId: id });
  };

  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <S.Radio
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...provided.draggableProps}
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          edit={edit}
        >
          {edit ? (
            <InputEdit
              type="text"
              focus
              handler={changeRadioLabelHandler}
              value={radioLabel}
              blur={endEditBlur}
              keyDown={endEditKeyDown}
              isError={isError}
            />
          ) : (
            <>
              <Radio
                name={name}
                id={id}
                isChecked={radioObject.isChecked}
                label={radioLabel}
                changeHandler={changeHandler}
              />
              <Edit editHandler={startEdit} />
              <Cross
                color="#80868b"
                rotate="135deg"
                margin="0 0 0 -20px"
                clickHandler={deleteAnswer}
                hover
              />
            </>
          )}
        </S.Radio>
      )}
    </Draggable>
  );
};

export default RadioButton;
RadioButton.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  radioObject: PropTypes.object,
  changeHandler: PropTypes.func,
  questionId: PropTypes.string,
  setCheckedId: PropTypes.func,
  index: PropTypes.number,
};
