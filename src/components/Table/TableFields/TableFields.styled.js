import styled from 'styled-components/macro';
import { colors } from 'styles/constants';

export default {
  TrText: styled.tr`
    color: ${colors.gray};
    background-color: ${colors.alabaster};

    &:nth-child(2n) {
      color: ${colors.scorpion};
      background-color: ${colors.alto};
    }
  `,
  ThText: styled.th`
    font-size: 15px;
    color: inherit;
    line-height: 1.4;
    position: relative;
    vertical-align: middle;
    font-family: Light, serif;
    padding-top: 16px;
    padding-bottom: 16px;

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
  `,
};
