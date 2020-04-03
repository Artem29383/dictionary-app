import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import CheckBox from 'components/CheckBox';
import useAction from 'hooks/useAction';
import {
  setDataCurrentQuest,
  setDefaultAnswersCheckBox,
  setErrorMessage,
  setUserTouchedAnswer,
  toggleCheckBox,
} from 'models/passTest/reducer';
import useSelector from 'hooks/useSelector';
import {
  getAllUserAnsweredEntitiesSel,
  getAllUserAnsweredIdSel,
  getAnswerOptionsQuSel,
  getIdsAnswerOptionsQuSel,
} from 'models/passTest/selectors';
import S from './CheckBoxAnswer.styled';

const CheckBoxAnswer = ({ entities, ids, questId, questIndex }) => {
  const setThisQuest = useAction(setDataCurrentQuest);
  const checkedId = ids.filter(ans => entities[ans].isChecked);
  const resetAllChecked = useAction(setDefaultAnswersCheckBox);
  const answerOptions = useSelector(getAnswerOptionsQuSel);
  const idsAnswerOptions = useSelector(getIdsAnswerOptionsQuSel);
  const setError = useAction(setErrorMessage);
  const answeredQuestsIds = useSelector(getAllUserAnsweredIdSel);
  const answeredQuestsEntities = useSelector(getAllUserAnsweredEntitiesSel);
  const setUserAnswerFromCache = useAction(setUserTouchedAnswer);
  const toggleBoxHandler = useAction(toggleCheckBox);

  useEffect(() => {
    setThisQuest({
      correctAnswer: checkedId,
      entities,
      ids,
      questId,
      userAnswer: [],
    });
    resetAllChecked(checkedId);
    setError('');
    if (answeredQuestsIds.includes(questId)) {
      setUserAnswerFromCache({
        questId,
        answers: answeredQuestsEntities[questId].userAnswer,
      });
    }
  }, [questIndex]);

  const changeCheckBox = e => {
    const checkBoxId = e.currentTarget.id;
    toggleBoxHandler(checkBoxId);
    setError('');
  };

  return idsAnswerOptions.map(id => (
    <S.CheckBox key={id}>
      <CheckBox
        changeHandler={changeCheckBox}
        label={answerOptions[id].value}
        id={id}
        isChecked={answerOptions[id].isChecked}
      />
    </S.CheckBox>
  ));
};

CheckBoxAnswer.propTypes = {
  entities: PropTypes.any,
  ids: PropTypes.array,
  questId: PropTypes.string,
  questIndex: PropTypes.number,
};

export default CheckBoxAnswer;
