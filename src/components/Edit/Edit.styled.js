import styled from 'styled-components/macro';
import { colors } from 'styles/constants';

export default {
  Svg: styled.svg`
    width: 30px;
    height: 30px;
    fill: ${colors.olsoGray};
    cursor: pointer;
    margin-left: 10px;

    &:hover {
      fill: ${colors.blazeOrange};
    }
  `,
};
