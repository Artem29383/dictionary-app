import styled from 'styled-components/macro';
import theme from 'styles/theme';

export default {
  QuestionForm: styled.div`
    width: 100%;
    padding: 20px 0;
    border-radius: ${theme.radius.google};
    border: ${({ isValid }) =>
      isValid ? theme.border.googleError : theme.border.google};
    margin: 25px 0;
    height: auto;
  `,
  WrapInput: styled.div`
    width: 100%;
    padding: ${({ padding }) => padding};
  `,
  QuestFormHeader: styled.div`
    max-height: 80px;
    height: 100%;
    width: 100%;
    display: flex;
    margin-bottom: 20px;
    position: relative;
  `,
  QuestFormHeaderTitle: styled.div`
    width: 48%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  QuestFormBody: styled.div`
    width: 100%;
    height: 100%;
    padding-left: 10px;
  `,
  QuestNameDiv: styled.div`
    font-size: 18px;
    color: #80868b;
    padding-left: 13px;
    line-height: 2.7;
    cursor: pointer;
    border-radius: ${theme.radius.google};
    border: ${theme.border.google};
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  `,
  Error: styled.div`
    color: ${theme.error.main};
    font-size: 24px;
    text-align: center;
  `,
};
