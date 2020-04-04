import React from 'react';
import PropTypes from 'prop-types';
import S from 'components/Table/TableFields/TableFields.styled';
import useAction from 'hooks/useAction';
import { REMOVE_WORD } from 'models/dictionary/action';
import Field from 'components/Table/TableFields/Field';
import { setLoading } from 'models/dictionary/reducer';
import useSelector from 'hooks/useSelector';
import { getIdsSelector } from 'models/dictionary/selectors';

const TableFields = ({ id, words, userId, login }) => {
  const setLoad = useAction(setLoading);
  const removeWord = useAction(REMOVE_WORD);
  const ids = useSelector(getIdsSelector);
  const deleteWord = e => {
    setLoad(true);
    removeWord({
      id: Number(e.currentTarget.dataset.id),
      login,
      userId,
      entities: words,
      ids,
    });
  };

  // eslint-disable-next-line no-unused-vars
  const fields = [
    ['word', 'Слова'],
    ['translate', 'Перевод'],
    ['pronunciation', 'Произношение'],
  ].map(f => {
    return (
      <Field
        key={f}
        id={id}
        words={words}
        login={login}
        userId={userId}
        f={f[0]}
        label={f[1]}
        ids={ids}
      />
    );
  });

  return (
    <S.TrText>
      {fields}
      <S.ThText data-label="Удаление" className="red">
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
  userId: PropTypes.number,
  login: PropTypes.string,
};
