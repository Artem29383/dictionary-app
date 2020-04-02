import styled from 'styled-components/macro';
import { colors } from 'styles/constants';

export default {
  Radio: styled.div`
    width: auto;
    font-size: 24px;
    color: ${colors.olsoGray};
    padding: ${({ edit }) =>
      edit ? '10px 50px 10px 10px' : '10px 50px 10px 55px'};
    display: ${({ edit }) => (edit ? 'block' : 'flex')};
    align-items: center;
  `,
};
