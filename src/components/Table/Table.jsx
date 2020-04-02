import React from 'react';
import PropTypes from 'prop-types';
import TableFields from 'components/Table/TableFields';
import S from './Table.styled';

const Table = ({ userId, login, words, ids, sort, sortType }) => {
  const tableWords = ids.map(id => (
    <TableFields key={id} id={id} words={words} userId={userId} login={login} />
  ));

  return (
    <S.DivTable>
      <S.TableWrap>
        <S.Table>
          <S.Thead>
            <S.Tr>
              <S.Th onClick={() => sort('word')}>
                Слова {sortType === 'asc' ? '▼' : '▲'}
              </S.Th>
              <S.Th>Перевод</S.Th>
              <S.Th>Произношение</S.Th>
              <S.Th>Удаление</S.Th>
            </S.Tr>
          </S.Thead>
          <S.Tbody>
            {words ? (
              tableWords
            ) : (
              <S.TrText>
                <S.ThText>Словарь пуст</S.ThText>
              </S.TrText>
            )}
          </S.Tbody>
        </S.Table>
      </S.TableWrap>
    </S.DivTable>
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
