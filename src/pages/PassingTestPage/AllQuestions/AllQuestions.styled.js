import styled from 'styled-components/macro';
import { colors } from 'styles/constants';

export default {
  AllQuestItem: styled.li`
    width: 100%;
    border-radius: 5px;
    margin: 10px 5px 10px 0;
    cursor: pointer;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ isComplete }) => isComplete && `${colors.sunglo}`};
    border: ${({ isComplete }) =>
      !isComplete
        ? `2px solid ${colors.olsoGray}`
        : `2px solid ${colors.crete}`};
  `,
};
