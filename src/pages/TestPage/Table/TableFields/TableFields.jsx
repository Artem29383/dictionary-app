import React from 'react';
import PropTypes from 'prop-types';
import Field from 'pages/TestPage/Table/TableFields/Field';
import routes from 'constants/routes';
import edit from 'images/edit.svg';
import Edit from 'images/edit.styled';
import { colors } from 'styles/constants';
import S from './TableFields.styled';

const TableFields = ({ id, userId, login }) => {
  const isAdmin = true;
  const fields = ['testName', 'created'].map(f => {
    return <Field key={f} id={id} login={login} userId={userId} f={f} />;
  });

  return (
    <S.TrText>
      {fields}
      {isAdmin && (
        <S.ThText className={colors.blazeOrange}>
          <S.Link to={`${routes.edit}/${id}`}>
            <S.ThDiv>
              <S.Text data-id={id}>
                <Edit.Icon>
                  <use xlinkHref={`${edit}#edit`} />
                </Edit.Icon>
              </S.Text>
            </S.ThDiv>
          </S.Link>
        </S.ThText>
      )}
    </S.TrText>
  );
};

TableFields.propTypes = {
  id: PropTypes.string,
  userId: PropTypes.number,
  login: PropTypes.string,
};

export default TableFields;
