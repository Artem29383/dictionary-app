import styled from 'styled-components/macro';

export default {
  Button: styled.button`
    border: none;
    border-radius: 2px;
    padding: 0 18px;
    line-height: 2.5;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;
    display: block;
    color: white;
    background-color: #2196f3;
    box-shadow: 0 0 4px #999;
    background-position: center;
    transition: background 0.8s;

    &.circle {
      border-radius: 50%;
      height: 100%;
      width: 100%;
      line-height: 0;
    }

    &:hover {
      background: #47a7f5 radial-gradient(circle, transparent 1%, #47a7f5 1%)
        center/15000%;
    }

    &.green {
      background-color: #807b0c;

      &:hover {
        background: #80802b radial-gradient(circle, transparent 1%, #80802b 1%)
          center/15000%;
      }

      &:active {
        background-color: #7f807d;
        background-size: 100%;
        transition: background 0s;
      }
    }

    &.red {
      background-color: #ff490d;

      &:hover {
        background: #ff6107 radial-gradient(circle, transparent 1%, #ff6107 1%)
          center/15000%;
      }

      &:active {
        background-color: #7f807d;
        background-size: 100%;
        transition: background 0s;
      }
    }

    &:active {
      background-color: #6eb9f7;
      background-size: 100%;
      transition: background 0s;
    }

    &.center {
      margin: 0 auto;
    }
  `,
};
