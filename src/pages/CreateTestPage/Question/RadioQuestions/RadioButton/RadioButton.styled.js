import styled from 'styled-components/macro';

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
    background: #ebebeb;
    border-radius: 100%;
    border: 1px solid darken(#ebebeb, 25%);
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
  Radio: styled.div`
    width: auto;
    font-size: 24px;
    color: #80868b;
    padding: ${({ edit }) =>
      edit ? '10px 50px 10px 10px' : '10px 50px 10px 55px'};
    display: ${({ edit }) => (edit ? 'block' : 'flex')};
    align-items: center;
  `,
  Input: styled.input`
    opacity: 0;
    position: absolute;

    &:checked + ${Label} {
      color: #2196f3;

      &::before {
        background-color: #3197ee;
        box-shadow: inset 0 0 0 4px #f4f4f4;
      }
    }
  `,
};
