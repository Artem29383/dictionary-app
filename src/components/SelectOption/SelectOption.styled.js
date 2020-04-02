import styled from 'styled-components/macro';
import { colors } from 'styles/constants';

export default {
  Select: styled.span.attrs(({ select }) => ({
    style: {
      overflow: `${select ? 'visible' : 'hidden'}`,
      height: `${select ? 'auto' : '25px'}`,
    },
  }))`
    cursor: pointer;
    margin: 0 0 20px 20px;
    z-index: 500;
    max-width: 100px;
    background-color: ${colors.white};
    border: 1px solid ${colors.alto};
    color: ${colors.astral};
    position: relative;
    display: inline-block;
  `,
  Option: styled.span`
    display: block;
    position: absolute;
    background-color: ${colors.white};
    border: 1px solid ${colors.alto};
    width: 100%;

    &:nth-child(2) {
      top: 50px;
    }

    &:nth-child(3) {
      top: 75px;
    }

    &:hover {
      color: ${colors.white};
      background-color: ${colors.lavenderPurple};
      border-color: ${colors.astral};
    }
  `,
  Div: styled.div`
    display: flex;
    justify-content: center;
    max-width: 400px;
    margin: 20px auto -30px auto;
    color: ${colors.astral};
    font-size: 24px;
    width: 100%;
  `,
};
