import styled from 'styled-components/macro';
import theme from 'styles/theme';

export default {
  Content: styled.div`
    position: relative;
    left: 50%;
    height: auto;
    max-width: 600px;
    transform: translateX(-50%);
  `,
  TestForm: styled.div`
    margin-top: 50px;
    width: 100%;
    border-radius: ${theme.radius.google};
    box-shadow: 0 0 15px 1px rgba(117, 117, 117, 1);
  `,
  WrapInput: styled.div`
    width: 100%;
    padding: ${({ padding }) => padding};
  `,
};
