import styled from 'styled-components/macro';
import theme from 'styles/theme';

export default {
  Content: styled.div`
    position: relative;
    left: 50%;
    height: auto;
    max-width: 600px;
    transform: translateX(-50%);
    padding-bottom: 120px;
  `,
  TestForm: styled.div`
    margin: 50px 0;
    width: 100%;
    border-radius: ${theme.radius.google};
    box-shadow: 0 0 15px 1px rgba(117, 117, 117, 1);
  `,
  WrapInput: styled.div`
    width: 100%;
    padding: ${({ padding }) => padding};
  `,
  FooterTest: styled.div`
    display: flex;
    justify-content: space-around;
    padding: 0 85px 0 85px;
  `,
  QuestNameDiv: styled.div`
    font-size: 18px;
    color: #80868b;
    padding-left: 13px;
    line-height: 2.7;
    cursor: pointer;
    border-radius: ${theme.radius.google};
    border: ${theme.border.google};
  `,
};
