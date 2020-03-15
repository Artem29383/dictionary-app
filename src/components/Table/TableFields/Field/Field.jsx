import React, { useCallback, useEffect, useState } from 'react';
import Microphone from 'components/Microphone/Microphone';
import PropTypes from 'prop-types';
import { synthVoice } from 'utils/speech';
import useAction from 'hooks/useAction';
import { UPDATE_FIELD_WORD } from 'models/dictionary/action';
import useToggle from 'hooks/useToggle';
import S from './Field.styled';

const Field = ({ id, userId, login, words, f, ids }) => {
  const updateField = useAction(UPDATE_FIELD_WORD);
  const [originalText, setOriginalText] = useState('');
  const [editId, setEditId] = useState(null);
  const [value, setValue] = useState('');
  const [edit, setEdit] = useToggle(false);

  const changeHandler = useCallback(
    e => {
      setValue(e.currentTarget.value);
    },
    [setValue]
  );

  const updateFieldFragment = dataField => {
    setEdit();
    updateField({
      userId,
      login,
      value,
      field: dataField,
      entities: words,
      ids,
      editId,
    });
  };

  const stopEditHandlerKeyDown = e => {
    if (e.key === 'Escape') {
      setEdit();
    }
  };

  const stopEditHandlerBlur = () => {
    if (value !== originalText && value.trim()) {
      if (edit) {
        updateFieldFragment(f);
      }
    } else {
      setEdit();
    }
  };

  useEffect(() => {
    setValue(originalText);
  }, [originalText]);

  const startEditHandler = e => {
    setOriginalText(e.currentTarget.textContent.trim());
    const dataSet = e.currentTarget.dataset;
    setEditId(Number(dataSet.id));
    setEdit();
  };

  return (
    <S.ThText>
      {edit ? (
        <S.Input
          type="text"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          value={value}
          onChange={changeHandler}
          onBlur={stopEditHandlerBlur}
          onKeyDown={stopEditHandlerKeyDown}
        />
      ) : (
        <S.ThDiv>
          <S.Text onClick={startEditHandler} data-id={id}>
            {words[id][f]}
          </S.Text>
          <Microphone
            voice={() =>
              synthVoice(words[id][f], f === 'word' ? 'en-US' : 'ru-RU')
            }
          />
        </S.ThDiv>
      )}
    </S.ThText>
  );
};

export default Field;
Field.propTypes = {
  id: PropTypes.number,
  words: PropTypes.any,
  ids: PropTypes.array,
  userId: PropTypes.number,
  login: PropTypes.string,
  f: PropTypes.string,
};
