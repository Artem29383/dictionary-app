import styled from 'styled-components/macro';
import theme from 'styles/theme';

export default {
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
  Input: styled.input`
    width: 100px;
    left: 50%;
    top: 50%;
    font-size: 15px;
    transform: translate(-50%, -50%);
    position: absolute;
    color: #808080;
    padding-left: 10px;
    border-radius: ${theme.radius.google};
    border: ${theme.border.google};

    &:nth-child(2n) {
      color: #5e5e5e;
    }
  `,
};
