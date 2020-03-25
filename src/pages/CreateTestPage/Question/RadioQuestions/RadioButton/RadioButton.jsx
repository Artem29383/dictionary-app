import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Edit from 'components/Edit/Edit';
import InputEdit from 'components/InputEdit';
import useAction from 'hooks/useAction';
import {
  removeAnswerFromRadioOrCheckBox,
  updateFieldAnswer,
} from 'models/test/reducer';
import Cross from 'components/Cross';
import S, { Label } from './RadioButton.styled';

const RadioButton = ({
  id,
  name,
  radioObject,
  changeHandler,
  questionId,
  setCheckedId,
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
    setCheckedId(null);
  };

  return (
    <S.Radio edit={edit}>
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
          <S.Input
            id={id}
            name={name}
            type="radio"
            checked={radioObject.isChecked}
            value={radioLabel}
            onChange={changeHandler}
          />
          <Label htmlFor={id}>{radioLabel}</Label>
          <Edit editHandler={startEdit} />
          <Cross
            color="#80868b"
            rotate="135deg"
            clickHandler={deleteAnswer}
            hover
          />
        </>
      )}
    </S.Radio>
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
};
