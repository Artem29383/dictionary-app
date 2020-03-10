import styled from 'styled-components/macro';

export default {
  TrText: styled.tr`
    color: #808080;
    background-color: #fafafa;

    &:nth-child(2n) {
      color: #5e5e5e;
      background-color: #d5d5d5;
    }
  `,
  ThText: styled.th`
    font-size: 15px;
    color: inherit;
    line-height: 1.4;
    vertical-align: middle;
    font-family: Light, serif;
    padding-top: 16px;
    padding-bottom: 16px;
    cursor: pointer;

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
};
