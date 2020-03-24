import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Edit from 'components/Edit/Edit';
import InputEdit from 'components/InputEdit';
import useAction from 'hooks/useAction';
import { updateFieldAnswer } from 'models/test/reducer';
import S, { Label } from './RadioButton.styled';

const RadioButton = ({
  id,
  name,
  radioObject,
  checked,
  changeHandler,
  questionId,
}) => {
  const [radioLabel, setRadioLabel] = useState(radioObject.value);
  const [edit, setEdit] = useState(false);
  const [isError, setIsError] = useState(false);
  const updateField = useAction(updateFieldAnswer);

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
      const copyObj = { ...radioObject, value: radioLabel };
      updateField({ id: questionId, obj: copyObj });
    }
  };

  const endEditKeyDown = e => {
    if (e.key === 'Escape') {
      setRadioLabel(radioObject.value);
      setEdit(false);
    }
    if (e.key === 'Enter' && radioLabel.trim()) {
      setEdit(false);
      const copyObj = { ...radioObject, value: radioLabel };
      updateField({ id: questionId, obj: copyObj });
    }
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
            checked={checked}
            value={radioLabel}
            onChange={changeHandler}
          />
          <Label htmlFor={id}>{radioLabel}</Label>
          <Edit editHandler={startEdit} />
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
  checked: PropTypes.bool,
  changeHandler: PropTypes.func,
  questionId: PropTypes.string,
};

RadioButton.defaultProps = {
  checked: false,
};
