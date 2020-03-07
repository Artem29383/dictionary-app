import styled from 'styled-components/macro';
import { NavLink } from 'react-router-dom';

export default {
  Nav: styled.div`
    width: 100%;
    height: 80px;
    background-color: #2196f3;
    display: flex;
  `,
  NavItem: styled.div`
    height: 100%;
    display: flex;
    align-items: center;

    &.right {
      margin-left: auto;
      margin-right: 50px;
    }

    &.left {
      margin-left: 50px;
    }

    &.padding {
      margin-left: 20px;
    }
  `,
  Link: styled(NavLink)`
    text-decoration: none;
  `,
};
