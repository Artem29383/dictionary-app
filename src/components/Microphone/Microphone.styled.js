import styled from 'styled-components/macro';
import { colors } from 'styles/constants';
import { device } from 'constants/device';

export default {
  Svg: styled.svg`
    fill: ${colors.black};
    cursor: pointer;

    &:hover {
      fill: ${colors.blazeOrange};
    }

    @media ${device.tabletM} {
      margin: 0 90px 0 10px;
    }

    @media ${device.mobileL} {
      margin: 0 30px 0 10px;
    }
  `,
};
