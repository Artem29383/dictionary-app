import styled from 'styled-components/macro';
import { NavLink } from 'react-router-dom';
import { colors } from 'styles/constants';

export default {
  OverlayM: styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${({ isAnim }) => !isAnim && 'rgba(0, 0, 0, 0);'};
    transition: ${({ speedAnim }) => `background-color ${speedAnim} linear;`};
    z-index: 1000;
    overflow: hidden;

    &.show {
      background-color: ${({ isAnim }) => isAnim && 'rgba(0, 0, 0, 0.6);'};
    }
  `,
  ModalWindow: styled.div`
    width: 420px;
    height: auto;
    z-index: 1000;
    position: relative;
    min-height: 160px;
    background-color: ${colors.white};
    margin: 0 auto;
    transform: ${({ isAnim }) => !isAnim && 'translateY(-450px);'};
    transition: ${({ speedAnim }) => `transform ${speedAnim} linear;`};

    &.show {
      transform: ${({ isAnim }) => isAnim && 'translateY(100px);'};
    }
  `,
  ModalHeader: styled.div`
    min-height: 80px;
    justify-content: center;
    position: relative;
    padding: 0 35px;
    background-color: ${colors.royalBlue};
    width: 100%;
    color: #fff;
    font-size: 24px;
    display: flex;
    align-items: center;
    text-align: center;
    line-height: 1.3;
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
  Link: styled(NavLink)`
    text-decoration: none;
  `,
};
