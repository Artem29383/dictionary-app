import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Radio from 'components/Radio';
import useAction from 'hooks/useAction';
import {
  setDataCurrentQuest,
  setDefaultAnswers,
  setErrorMessage,
  setUserTouchedAnswer,
  toggleChecked,
} from 'models/passTest/reducer';
import useSelector from 'hooks/useSelector';
import {
  getAllUserAnsweredEntitiesSel,
  getAllUserAnsweredIdSel,
  getAnswerOptionsQuSel,
  getIdsAnswerOptionsQuSel,
} from 'models/passTest/selectors';
import nanoid from 'nanoid';
import S from './RadioAnswer.styled';

const RadioAnswer = ({ entities, ids, questId, questIndex }) => {
  const setThisQuest = useAction(setDataCurrentQuest);
  const nameRadio = nanoid();
  const resetAllChecked = useAction(setDefaultAnswers);
  const checkedId = ids.filter(ans => entities[ans].isChecked);
  const answerOptions = useSelector(getAnswerOptionsQuSel);
  const idsAnswerOptions = useSelector(getIdsAnswerOptionsQuSel);
  const toggleRadio = useAction(toggleChecked);
  const setError = useAction(setErrorMessage);
  const answeredQuestsIds = useSelector(getAllUserAnsweredIdSel);
  const answeredQuestsEntities = useSelector(getAllUserAnsweredEntitiesSel);
  const setUserAnswerFromCache = useAction(setUserTouchedAnswer);

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

  const changeRadioHandler = e => {
    // eslint-disable-next-line array-callback-return,consistent-return,no-shadow
    const [checkedId] = idsAnswerOptions.filter(qId => {
      if (answerOptions[qId].isChecked) return qId;
    });
    const radioId = e.currentTarget.id;
    toggleRadio({ radioId, checkedId, questId });
    setError('');
  };

  return idsAnswerOptions.map(id => (
    <S.Radio key={answerOptions[id].id}>
      <Radio
        id={answerOptions[id].id}
        label={answerOptions[id].value}
        name={nameRadio}
        isChecked={answerOptions[id].isChecked}
        changeHandler={changeRadioHandler}
      />
    </S.Radio>
  ));
};

RadioAnswer.propTypes = {
  entities: PropTypes.any,
  ids: PropTypes.array,
  questId: PropTypes.string,
  questIndex: PropTypes.number,
};

export default RadioAnswer;
