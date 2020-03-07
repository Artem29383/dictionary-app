import styled from 'styled-components/macro';

export default {
  OverlayM: styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${({ isAnim }) => !isAnim && 'rgba(0, 0, 0, 0);'};
    transition: ${({ speedAnim }) => `background-color ${speedAnim} ease-in;`};
    z-index: 1000;
    overflow: hidden;

    &.show {
      background-color: ${({ isAnim }) => isAnim && 'rgba(0, 0, 0, 0.6);'};
    }
  `,
  ModalWindow: styled.form`
    width: 400px;
    height: auto;
    z-index: 1000;
    position: relative;
    min-height: 400px;
    background-color: #fff;
    margin: 0 auto;
    transform: ${({ isAnim }) => !isAnim && 'translateY(-450px);'};
    transition: ${({ speedAnim }) => `transform ${speedAnim} ease-in;`};

    &.show {
      transform: ${({ isAnim }) => isAnim && 'translateY(100px);'};
    }
  `,
  ModalHeader: styled.div`
    height: 80px;
    background-color: #3049f3;
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 24px;
    vertical-align: middle;
    line-height: 3.21;
  `,
  ModalInputWrap: styled.div`
    margin-top: 30px;
    width: 100%;
    padding: 0 40px;
  `,
  ModalFooter: styled.div`
    width: 60%;
    margin: 20px auto 10px auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
  `,
  Message: styled.div`
    line-height: 2;
    color: red;
    font-size: 16px;
    text-align: center;

    &.green {
      color: darkolivegreen;
    }
  `,
};
