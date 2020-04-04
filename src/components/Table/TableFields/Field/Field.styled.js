import styled from 'styled-components/macro';
import theme from 'styles/theme';
import { colors } from 'styles/constants';
import { device } from 'constants/device';

export default {
  ThText: styled.td`
    font-size: 15px;
    color: inherit;
    line-height: 1.4;
    position: relative;
    vertical-align: middle;
    font-family: Light, serif;
    padding-top: 16px;
    padding-bottom: 16px;

    @media ${device.tabletM} {
      width: 100%;
      display: block;

      &::before {
        content: attr(data-label);
        position: absolute;
        left: 10%;
      }
    }

    &.red {
      color: ${colors.blazeOrange};
    }
  `,
  ThDiv: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-content: center;
  `,
  Text: styled.span`
    cursor: pointer;
    word-break: break-all;
    max-width: 100px;

    @media ${device.tabletM} {
      margin: 0 0 0 auto;
    }
  `,
  Input: styled.input`
    width: 100px;
    left: 50%;
    top: 50%;
    font-size: 15px;
    transform: translate(-50%, -50%);
    position: absolute;
    color: ${colors.gray};
    padding-left: 10px;
    border-radius: ${theme.radius.google};
    border: ${theme.border.google};

    &:nth-child(2n) {
      color: ${colors.scorpion};
    }

    @media ${device.tabletM} {
      left: auto;
      right: 0;
      transform: translate(-50%, 0);
    }
  `,
};
