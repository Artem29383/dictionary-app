import styled from 'styled-components/macro';
import { colors } from 'styles/constants';
import { device } from 'constants/device';

export default {
  TrText: styled.tr`
    color: ${colors.gray};
    background-color: ${colors.alabaster};

    &:nth-child(2n) {
      color: ${colors.scorpion};
      background-color: ${colors.alto};
    }

    @media ${device.tabletM} {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  `,
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
      display: block;
      width: 100%;

      &::before {
        content: attr(data-label);
        position: absolute;
        left: 10%;
      }
    }

    &.red {
      color: red;
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

    @media ${device.tabletM} {
      margin: 0 130px 0 auto;
    }

    @media ${device.mobileL} {
      margin: 0 50px 0 auto;
    }
  `,
};
