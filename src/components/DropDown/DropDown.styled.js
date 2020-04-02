import styled from 'styled-components/macro';
import theme from 'styles/theme';
import { colors } from 'styles/constants';
/* stylelint-disable */

export default {
  DropDownDiv: styled.div`
    width: 100%;
    position: relative;
    height: 50px;
    border: ${theme.border.google};
    cursor: pointer;
    font-size: 16px;
    color: ${colors.olsoGray};
  `,
  DefaultValueDiv: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
  `,
  DefaultValue: styled.div.attrs(({ x, y }) => ({
    style: {
      backgroundImage: `radial-gradient(circle at ${x}px ${y}px, transparent 1%, #fff 1%)`,
    },
  }))`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${colors.white} left/15000%;
    transition: background 0.8s;

    &:active {
      background-color: ${colors.graySuit};
      background-size: 1%;
      transition: background 0s;
    }
  `,
  Triangle: styled.div.attrs(({ isAnim, speedAnim }) => ({
    style: {
      transform: `${isAnim ? 'rotate(180deg)' : 'rotate(0)'}`,
      transition: `transform ${speedAnim} linear`,
    },
  }))`
    width: 0;
    margin-left: 10px;
    height: 0;
    border-style: solid;
    border-width: 10px 7.5px 0 7.5px;
    border-color: #80868b transparent transparent transparent;
  `,
  DropList: styled.div.attrs(({ isAnim, speedAnim }) => ({
    style: {
      transform: `${isAnim ? 'translateY(0)' : 'translateY(-50px)'}`,
      opacity: `${isAnim ? '1' : '0'}`,
      transition: `opacity ${speedAnim} ease-in-out, transform ${speedAnim} ease-in-out`,
      right: '-1px',
      left: '-1px',
      top: '100%',
    },
  }))`
    position: absolute;
    z-index: 100;
  `,
  Ul: styled.ul`
    width: 100%;
  `,
  Li: styled.li.attrs(({ x, y }) => ({
    style: {
      backgroundImage: `radial-gradient(circle at ${x}px ${y}px, transparent 1%, #fff 1%)`,
    },
  }))`
    display: flex;
    border-bottom: 1px solid ${colors.olsoGray};
    border-left: 1px solid ${colors.olsoGray};
    border-right: 1px solid ${colors.olsoGray};
    justify-content: center;
    align-items: center;
    height: 50px;
    background: ${colors.white} left/15000%;
    background-color: ${({ isAnim }) => isAnim && colors.graySuit};
    background-size: ${({ isAnim }) => isAnim && '1%'};
    transition: ${({ isAnim }) =>
      isAnim ? 'background 0s' : 'background 0.8s'};

    &:first-child {
      border-top: 1px solid ${colors.olsoGray};
    }
  `,
};
/* stylelint-enable */
