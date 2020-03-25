import styled from 'styled-components/macro';

export default {
  Div: styled.div`
    width: 30px;
    transform: ${({ rotate }) => `rotate(${rotate});`};
    height: 30px;
    position: ${({ position }) => position};
    right: ${({ right }) => right};
    bottom: ${({ bottom }) => bottom};
    top: ${({ top }) => top};
    left: ${({ left }) => left};
    cursor: pointer;
    margin-left: 10px;

    &:hover > span {
      background-color: ${({ hover }) => hover && 'red'};
    }
  `,
  line1: styled.span`
    top: 50%;
    left: 50%;
    height: 5px;
    width: 100%;
    position: absolute;
    transform: translate(-50%, -50%) rotate(90deg);
    background-color: ${({ color }) => `${color}`};
    transition: background-color 0.1s linear;
  `,
  line2: styled.span`
    top: 50%;
    left: 50%;
    height: 5px;
    width: 100%;
    transform: translate(-50%, -50%);
    background-color: ${({ color }) => `${color}`};
    position: absolute;
    transition: background-color 0.1s linear;
  `,
};
