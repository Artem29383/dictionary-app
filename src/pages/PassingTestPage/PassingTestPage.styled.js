import styled from 'styled-components/macro';
import theme from 'styles/theme';
import { colors } from 'styles/constants';

export default {
  Content: styled.div`
    width: 100%;
    min-height: calc(100vh - 80px);
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Form: styled.div`
    max-width: 800px;
    width: 100%;
    overflow: hidden;
    box-shadow: ${theme.shadows.lg};
    border-radius: ${theme.radius.google};
  `,
  Header: styled.div`
    height: 80px;
    width: 100%;
    color: ${colors.white};
    background-color: ${colors.dodjerBlue};
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  HeaderTitle: styled.div`
    font-size: 36px;
  `,
  AllQuestions: styled.div`
    width: 35%;
    height: 100%;
    padding: 0 25px;
    box-shadow: ${theme.shadows.xl};
  `,
  PassQuest: styled.div`
    width: 65%;
    height: 100%;
  `,
  QuestTitle: styled.div`
    font-size: 36px;
    padding: 15px 0 20px 25px;
  `,
  QuestBody: styled.div`
    width: 100%;
    padding: 10px 0 10px 25px;
  `,
  QuestFooter: styled.div`
    width: 100%;
    padding: 10px 50px 20px 50px;
  `,
  Body: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    background-color: ${colors.windSand};
  `,
  AllQuestTitle: styled.div`
    width: 100%;
    font-size: 36px;
    color: ${colors.black};
    text-align: center;
    padding: 15px 10px 10px 10px;
  `,
  AllQuestList: styled.ul`
    width: 100%;
    height: 350px;
    overflow-y: auto;
    font-size: 28px;
    padding: 0 5px 0 0;

    &::-webkit-scrollbar {
      width: 5px;
      margin-left: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${colors.gray};
      outline: 1px solid ${colors.olsoGray};
    }
  `,
  AllQuestItem: styled.li`
    width: 100%;
    border-radius: 5px;
    margin: 10px 5px 10px 0;
    cursor: pointer;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid ${colors.olsoGray};
  `,
  Error: styled.div`
    color: ${colors.vermillion};
    font-size: 28px;
    padding: 20px 0 0 10px;
  `,
};
