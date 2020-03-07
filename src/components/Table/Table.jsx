import React from 'react';
import PropTypes from 'prop-types';
import S from './Table.styled';

const Table = ({ words, ids }) => {
  const tableWords = ids.map(id => (
    <S.TrText key={id}>
      <S.ThText>{words[id].word}</S.ThText>
      <S.ThText>{words[id].translate}</S.ThText>
      <S.ThText>{words[id].pronunciation}</S.ThText>
      <S.ThText className="red">✖</S.ThText>
    </S.TrText>
  ));

  return (
    <S.TableWrap>
      <S.Table>
        <thead>
          <tr>
            <S.Th>Слова</S.Th>
            <S.Th>Перевод</S.Th>
            <S.Th>Произношение</S.Th>
            <S.Th>Удаление</S.Th>
          </tr>
        </thead>
        <tbody>
          {words ? (
            tableWords
          ) : (
            <S.TrText>
              <S.ThText>Словарь пуст</S.ThText>
            </S.TrText>
          )}
        </tbody>
      </S.Table>
    </S.TableWrap>
  );
};

export default Table;
Table.propTypes = {
  words: PropTypes.any,
  ids: PropTypes.any.isRequired,
};
