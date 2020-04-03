import React from 'react';
import PropTypes from 'prop-types';
import useSelector from 'hooks/useSelector';
import {
  getAllUserAnsweredIdSel,
  getEntitiesQuestionsSel,
  getIdsQuestionsSel,
} from 'models/passTest/selectors';
import S from './AllQuestions.styled';

const AllQuestions = ({ getQuestIndex }) => {
  const ids = useSelector(getIdsQuestionsSel);
  const questions = useSelector(getEntitiesQuestionsSel);
  const answeredQuestsIds = useSelector(getAllUserAnsweredIdSel);

  return ids.map((q, i) => (
    <S.AllQuestItem
      onClick={getQuestIndex}
      key={q}
      id={i}
      isComplete={answeredQuestsIds.includes(q)}
      type={questions[q].type}
    >
      {questions[q].questName}
    </S.AllQuestItem>
  ));
};

AllQuestions.propTypes = {
  getQuestIndex: PropTypes.func,
};

export default AllQuestions;
