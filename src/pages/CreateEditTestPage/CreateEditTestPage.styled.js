import styled from 'styled-components/macro';
import theme from 'styles/theme';
import { colors } from 'styles/constants';

export default {
  PageTest: styled.div`
    width: 100%;
  `,
  Content: styled.div`
    height: auto;
    margin: 0 auto;
    max-width: 600px;
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
    padding: ${({ editId }) => (editId ? '0px' : '0 85px 0 85px')};
  `,
  QuestNameDiv: styled.div`
    font-size: 18px;
    color: ${colors.olsoGray};
    padding: 0 13px;
    word-break: break-all;
    line-height: 2.7;
    cursor: pointer;
    border-radius: ${theme.radius.google};
    border: ${theme.border.google};
  `,
};
