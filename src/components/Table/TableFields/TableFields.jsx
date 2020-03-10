import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import S from 'components/Table/TableFields/TableFields.styled';
import Microphone from 'components/Microphone/Microphone';
import { synthVoice } from 'utils/speech';
import useAction from 'hooks/useAction';
import { REMOVE_WORD, UPDATE_FIELD_WORD } from 'models/dictionary/action';

const TableFields = ({ id, words, ids, userId, login }) => {
  const updateField = useAction(UPDATE_FIELD_WORD);
  const [originalText, setOriginalText] = useState('');
  const [editId, setEditId] = useState(null);
  const removeWord = useAction(REMOVE_WORD);
  const [value, setValue] = useState('');
  const [edit, setEdit] = useState({
    word: false,
    translate: false,
    pronunciation: false,
  });

  const changeHandler = useCallback(
    e => {
      setValue(e.currentTarget.value);
    },
    [setValue]
  );

  const deleteWord = e => {
    removeWord({
      id: Number(e.currentTarget.dataset.id),
      login,
      userId,
      entities: words,
      ids,
    });
  };

  const updateFieldFragment = dataField => {
    setEdit({ ...edit, [dataField]: false });
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
      setEdit({ ...edit, word: false, translate: false, pronunciation: false });
    }
  };

  const stopEditHandlerBlur = () => {
    if (value !== originalText) {
      if (edit.word) {
        updateFieldFragment('word');
      }
      if (edit.translate) {
        updateFieldFragment('translate');
      }
      if (edit.pronunciation) {
        updateFieldFragment('pronunciation');
      }
    } else {
      setEdit({ ...edit, word: false, translate: false, pronunciation: false });
    }
  };

  useEffect(() => {
    setValue(originalText);
  }, [originalText]);

  const startEditHandler = e => {
    setOriginalText(e.currentTarget.textContent.trim());
    const dataSet = e.currentTarget.dataset;
    setEditId(Number(dataSet.id));
    if (dataSet.word) setEdit({ ...edit, word: !edit.word });
    if (dataSet.translate) setEdit({ ...edit, translate: !edit.translate });
    if (dataSet.pronunciation)
      setEdit({ ...edit, pronunciation: !edit.pronunciation });
  };

  return (
    <S.TrText>
      <S.ThText onDoubleClick={startEditHandler} data-word data-id={id}>
        {edit.word ? (
          <input
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
            {words[id].word}{' '}
            <Microphone voice={() => synthVoice(words[id].word, 'en-US')} />
          </S.ThDiv>
        )}
      </S.ThText>
      <S.ThText onDoubleClick={startEditHandler} data-translate data-id={id}>
        {edit.translate ? (
          <input
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
            {words[id].translate}{' '}
            <Microphone
              voice={() => synthVoice(words[id].translate, 'ru-RU')}
            />
          </S.ThDiv>
        )}
      </S.ThText>
      <S.ThText
        onDoubleClick={startEditHandler}
        data-pronunciation
        data-id={id}
      >
        {edit.pronunciation ? (
          <input
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
            {words[id].pronunciation}{' '}
            <Microphone
              voice={() => synthVoice(words[id].pronunciation, 'ru-RU')}
            />
          </S.ThDiv>
        )}
      </S.ThText>
      <S.ThText className="red">
        <S.ThDiv data-id={id} onClick={deleteWord}>
          ✖
        </S.ThDiv>
      </S.ThText>
    </S.TrText>
  );
};

export default TableFields;
TableFields.propTypes = {
  id: PropTypes.number,
  words: PropTypes.any,
  ids: PropTypes.array,
  userId: PropTypes.number,
  login: PropTypes.string,
};
