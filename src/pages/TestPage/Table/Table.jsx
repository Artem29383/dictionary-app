import React from 'react';
import PropTypes from 'prop-types';
import TableFields from 'pages/TestPage/Table/TableFields';
import S from './Table.styled';

const Table = ({ tests, ids }) => {
  const isAdmin = true;
  const tableWords = ids.map(id => (
    <TableFields key={id} id={id} tests={tests} />
  ));

  return (
    <S.DivTable>
      <S.TableWrap>
        <S.Table>
          <thead>
            <tr>
              <S.Th>Название теста</S.Th>
              <S.Th>Дата создания</S.Th>
              {isAdmin && <S.Th>Редактирование</S.Th>}
            </tr>
          </thead>
          <tbody>
            {tests ? (
              tableWords
            ) : (
              <S.TrText>
                <S.ThText>Пока нет ни одного теста</S.ThText>
              </S.TrText>
            )}
          </tbody>
        </S.Table>
      </S.TableWrap>
    </S.DivTable>
  );
};

Table.propTypes = {
  tests: PropTypes.any,
  ids: PropTypes.any.isRequired,
};

export default Table;
