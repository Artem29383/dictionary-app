import styled from 'styled-components/macro';
import { colors } from 'styles/constants';

export default {
  Icon: styled.svg`
    width: 30px;
    height: 30px;
    fill: ${colors.gray};

    &:hover {
      fill: ${colors.vermillion};
    }
  `,
};
