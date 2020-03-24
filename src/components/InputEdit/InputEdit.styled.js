import styled from 'styled-components/macro';
/* stylelint-disable */

const Label = styled.label`
  font-size: 14px;
  pointer-events: none;
  color: #999;
  position: absolute;
  left: 30px;
  top: 25px;
  transition: 0.2s ease all;
`;

const Bar = styled.div`
  position: absolute;
  height: 3px;
  content: '';
  transform: rotateY(90deg);
  transition: transform 0.2s linear;
  background-color: ${({ isError }) => (isError ? 'red' : '#2196f3')};
  width: 100%;
  bottom: 0;
  left: 0;
`;

export default {
  Group: styled.div`
    position: relative;
  `,
  Label,
  Bar,
  InputField: styled.input`
    border: none;
    background-color: transparent;
    width: 100%;
    font-size: 22px;
    padding-left: 15px;
    padding-bottom: 7px;
    border-bottom: 2px solid #999;
    margin-left: 50%;
    transform: translateX(-50%);

    &:focus ~ ${Label}, &:not(:placeholder-shown) ~ ${Label} {
      top: -5px;
      color: #2196f3;
    }

    &:focus ~ ${Bar}, &:not(:placeholder-shown) ~ ${Bar} {
      transform: rotateY(0deg);
    }
  `,
  Error: styled.div`
    font-size: 16px;
    color: red;
    padding: 10px 0 0 15px;
  `,
};
/* stylelint-enable */
