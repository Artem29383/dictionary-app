import styled from 'styled-components/macro';
import { colors } from 'styles/constants';
import { device } from 'constants/device';

export default {
  Select: styled.span`
    cursor: pointer;
    margin: 0 0 20px 20px;
    z-index: 500;
    max-width: 100px;
    background-color: ${colors.white};
    overflow: ${({ select }) => (select ? 'visible' : 'hidden')};
    height: ${({ select }) => (select ? 'auto' : '25px')};
    border: 1px solid ${colors.alto};
    color: ${colors.astral};
    position: relative;
    display: inline-block;

    @media ${device.mobileL} {
      height: ${({ select }) => (select ? 'auto' : '21px')};
    }
  `,
  Option: styled.span`
    display: block;
    position: absolute;
    background-color: ${colors.white};
    border: 1px solid ${colors.alto};
    width: 100%;

    @media ${device.mobileL} {
      width: calc(100% + 2px);
      left: -1px;
    }

    &:nth-child(2) {
      top: 50px;

      @media ${device.mobileL} {
        top: 40px;
      }
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

    @media ${device.mobileL} {
      max-width: 350px;
      font-size: 20px;
    }
  `,
};
