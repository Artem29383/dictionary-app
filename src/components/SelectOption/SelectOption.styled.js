import styled from 'styled-components/macro';

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
    background-color: #fff;
    border: 1px solid #ddd;
    color: #337ab7;
    position: relative;
    display: inline-block;
  `,
  Option: styled.span`
    display: block;
    position: absolute;
    background-color: #fff;
    border: 1px solid #ddd;
    width: 100%;

    &:nth-child(2) {
      top: 50px;
    }

    &:nth-child(3) {
      top: 75px;
    }

    &:hover {
      color: #fff;
      background-color: #9d83b7;
      border-color: #337ab7;
    }
  `,
  Div: styled.div`
    display: flex;
    justify-content: center;
    max-width: 400px;
    margin: 20px auto -30px auto;
    color: #337ab7;
    font-size: 24px;
    width: 100%;
  `,
};
