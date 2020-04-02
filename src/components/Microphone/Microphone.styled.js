import styled from 'styled-components/macro';
import { colors } from 'styles/constants';

export default {
  Svg: styled.svg`
    fill: ${colors.black};
    cursor: pointer;

    &:hover {
      fill: ${colors.blazeOrange};
    }
  `,
};
