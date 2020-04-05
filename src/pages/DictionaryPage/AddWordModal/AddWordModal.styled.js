import styled from 'styled-components/macro';
import { colors } from 'styles/constants';
import { device } from 'constants/device';

export default {
  OverlayM: styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${({ isAnim }) =>
      isAnim ? 'rgba(0, 0, 0, 0.6);' : 'rgba(0, 0, 0, 0);'};
    transition: ${({ speedAnim }) => `background-color ${speedAnim} linear;`};
    z-index: 1000;
    overflow: hidden;
  `,
  ModalWindow: styled.form`
    max-width: 420px;
    height: auto;
    z-index: 1000;
    width: calc(100% - 30px);
    position: relative;
    min-height: 160px;
    background-color: ${colors.white};
    margin: 0 auto;
    transform: ${({ isAnim }) =>
      isAnim ? 'translateY(100px);' : 'translateY(-450px);'};
    transition: ${({ speedAnim }) => `transform ${speedAnim} linear;`};
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

    @media ${device.mobileM} {
      height: 50px;
      font-size: 18px;
      line-height: 2.75;
    }
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
    padding-bottom: 10px;

    @media ${device.mobileL} {
      width: 75%;
    }

    @media ${device.mobileM} {
      width: 90%;
    }
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
  BackDrop: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  `,
};
