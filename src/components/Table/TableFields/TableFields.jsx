import React from 'react';
import PropTypes from 'prop-types';
import S from 'components/Table/TableFields/TableFields.styled';
import useAction from 'hooks/useAction';
import { REMOVE_WORD } from 'models/dictionary/action';
import Field from 'components/Table/TableFields/Field';

const TableFields = ({ id, words, ids, userId, login }) => {
  const removeWord = useAction(REMOVE_WORD);

  const deleteWord = e => {
    removeWord({
      id: Number(e.currentTarget.dataset.id),
      login,
      userId,
      entities: words,
      ids,
    });
  };

  // eslint-disable-next-line no-unused-vars
  const fields = ['word', 'translate', 'pronunciation'].map(f => {
    return (
      <Field
        key={f}
        id={id}
        words={words}
        login={login}
        userId={userId}
        f={f}
        ids={ids}
      />
    );
  });

  return (
    <S.TrText>
      {fields}
      <S.ThText className="red">
        <S.ThDiv>
          <S.Text data-id={id} onClick={deleteWord}>
            ✖
          </S.Text>
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
