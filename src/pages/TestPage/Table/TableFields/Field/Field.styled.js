import styled from 'styled-components/macro';
import theme from 'styles/theme';
import { NavLink } from 'react-router-dom';
import { colors } from 'styles/constants';

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
      color: ${colors.blazeOrange};
    }
  `,
  ThDiv: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    cursor: default;
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
    color: ${colors.gray};
    padding-left: 10px;
    border-radius: ${theme.radius.google};
    border: ${theme.border.google};

    &:nth-child(2n) {
      color: ${colors.scorpion};
    }
  `,
  Link: styled(NavLink)`
    text-decoration: none;
    color: inherit;
  `,
};
