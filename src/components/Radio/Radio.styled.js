import styled from 'styled-components/macro';
import { colors } from 'styles/constants';

export const Label = styled.label`
  position: relative;
  word-break: break-all;
  cursor: pointer;
  max-width: 80%;
  transition: color 250ms ease;

  &::before {
    position: absolute;
    left: -45px;
    content: '';
    background: ${colors.gallery};
    border-radius: 100%;
    border: 1px solid darken(${colors.gallery}, 25%);
    display: inline-block;
    width: 1.4em;
    height: 1.4em;
    top: 50%;
    transform: translateY(-50%);
    margin-right: 1em;
    vertical-align: top;
    cursor: pointer;
    text-align: center;
    transition: background-color 250ms ease, box-shadow 250ms ease;
  }
`;

export default {
  Input: styled.input`
    opacity: 0;
    position: absolute;

    &:checked + ${Label} {
      color: ${colors.dodjerBlue};

      &::before {
        background-color: ${colors.pictonBlue};
        box-shadow: inset 0 0 0 4px ${colors.windSand};
      }
    }
  `,
};
