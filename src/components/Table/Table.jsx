import React from 'react';
import PropTypes from 'prop-types';
import TableFields from 'components/Table/TableFields';
import S from './Table.styled';

const Table = ({ userId, login, words, ids, sort, sortType }) => {
  const tableWords = ids.map(id => (
    <TableFields
      key={id}
      id={id}
      words={words}
      ids={ids}
      userId={userId}
      login={login}
    />
  ));

  return (
    <S.TableWrap>
      <S.Table>
        <thead>
          <tr>
            <S.Th onClick={() => sort('word')}>
              Слова {sortType === 'asc' ? '▼' : '▲'}
            </S.Th>
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
  userId: PropTypes.number,
  login: PropTypes.string,
  words: PropTypes.any,
  ids: PropTypes.any.isRequired,
  sort: PropTypes.func.isRequired,
  sortType: PropTypes.string,
};
