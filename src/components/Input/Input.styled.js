import styled from 'styled-components/macro';
import theme from '../../styles/theme';
/* stylelint-disable */

export const InputField = styled.input`
  border: ${theme.border.google};
  padding: 16px 13px;
  border-radius: ${theme.radius.google};
  transition: box-shadow 0.1s linear;
  width: 100%;
`;

export const Label = styled.label`
  color: #80868b;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 13px;
  pointer-events: none;
  background-color: #fff;
  transition: transform 0.1s linear, color 0.1s linear;
`;

export default {
  Group: styled.div`
    position: relative;
    font-size: 18px;
    border-radius: ${theme.radius.google};

    & ${InputField}:focus {
      border: 1px solid royalblue;
      box-shadow: inset 0 0 1px 1.5px rgba(77, 37, 196, 1);
    }

    &
      ${InputField}:focus
      + ${Label},
      &
      ${InputField}:not(:placeholder-shown)
      + ${Label} {
      color: #1a73e8;
      transform: translateY(-220%);
      padding: 0 3px;
      font-size: 14px;
    }
  `,
};
/* stylelint-enable */