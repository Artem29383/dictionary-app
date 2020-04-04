import styled from 'styled-components/macro';
import { NavLink } from 'react-router-dom';
import { device } from 'constants/device';
import theme from '../../styles/theme';

export default {
  RegisterForm: styled.form`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: ${theme.border.google};
    max-width: 350px;
    width: 100%;
    height: auto;
    border-radius: ${theme.radius.google};

    @media ${device.mobileM} {
      max-width: 310px;
    }
  `,
  WrapInput: styled.div`
    width: 100%;
    padding: 0 40px;
    margin: 25px 0;

    &.margin10 {
      margin: 10px 0;
    }
  `,
  Error: styled.div`
    margin: 10px 0;
    color: red;
    font-size: 16px;
    text-align: center;

    &.green {
      color: darkolivegreen;
    }
  `,
  SignIn: styled(NavLink)`
    font-size: 16px;
    text-align: center;
    text-decoration: none;
    display: block;
    margin-left: 50%;
    transform: translateX(-50%);

    &:hover {
      text-decoration: underline;
    }
  `,
};
/* stylelint-enable */
