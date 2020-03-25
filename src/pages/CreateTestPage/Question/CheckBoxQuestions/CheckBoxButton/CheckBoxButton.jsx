import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Edit from 'components/Edit/Edit';
import Cross from 'components/Cross/Cross';
import useAction from 'hooks/useAction';
import {
  removeAnswerFromRadioOrCheckBox,
  updateFieldAnswer,
} from 'models/test/reducer';
import InputEdit from 'components/InputEdit/InputEdit';
import S, { Label, Span } from './CheckBoxButton.styled';

const CheckBoxButton = ({
  questionId,
  id,
  checkBoxObject,
  changeCheckBoxHandler,
}) => {
  const removeCheckBoxAnswer = useAction(removeAnswerFromRadioOrCheckBox);
  const [edit, setEdit] = useState(false);
  const [checkBoxLabel, setCheckBoxLabel] = useState(checkBoxObject.value);
  const updateField = useAction(updateFieldAnswer);

  const startEditHandler = () => {
    setEdit(true);
  };

  const changeHandler = e => {
    setCheckBoxLabel(e.currentTarget.value);
  };

  const stopEditHandlerBlur = () => {
    if (checkBoxLabel.trim()) {
      setEdit(false);
      updateField({ id: questionId, qId: id, value: checkBoxLabel });
    }
  };

  const stopEditHandlerKey = e => {
    if (e.key === 'Enter' && checkBoxLabel.trim()) {
      setEdit(false);
      updateField({ id: questionId, qId: id, value: checkBoxLabel });
    }
    if (e.key === 'Escape') {
      setEdit(false);
      setCheckBoxLabel(checkBoxObject.value);
    }
  };

  const deleteAnswer = () => {
    removeCheckBoxAnswer({ id: questionId, qId: id });
  };
  return (
    <S.CheckBox>
      {edit ? (
        <InputEdit
          type="text"
          focus
          value={checkBoxLabel}
          handler={changeHandler}
          blur={stopEditHandlerBlur}
          keyDown={stopEditHandlerKey}
        />
      ) : (
        <>
          <S.Input
            type="checkbox"
            id={id}
            checked={checkBoxObject.isChecked}
            onChange={changeCheckBoxHandler}
            value={checkBoxLabel}
          />
          <Label htmlFor={id}>
            {checkBoxLabel}
            <Span />
          </Label>
          <Edit editHandler={startEditHandler} />
          <Cross
            color="#80868b"
            rotate="135deg"
            clickHandler={deleteAnswer}
            hover
          />
        </>
      )}
    </S.CheckBox>
  );
};

export default CheckBoxButton;
CheckBoxButton.propTypes = {
  questionId: PropTypes.string,
  id: PropTypes.string,
  checkBoxObject: PropTypes.object,
  changeCheckBoxHandler: PropTypes.func,
};
