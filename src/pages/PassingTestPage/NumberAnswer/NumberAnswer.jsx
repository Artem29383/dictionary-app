import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import InputEdit from 'components/InputEdit';
import useAction from 'hooks/useAction';
import {
  setDataCurrentQuest,
  setDefaultAnswerNumeric,
  setErrorMessage,
  setNumericAnswer,
  setUserTouchedNumAnswer,
} from 'models/passTest/reducer';
import useSelector from 'hooks/useSelector';
import {
  getAllUserAnsweredEntitiesSel,
  getAllUserAnsweredIdSel,
  getAnswerOptionsQuSel,
  getIdsAnswerOptionsQuSel,
} from 'models/passTest/selectors';
import S from './NumberAnswer.styled';

const NumberAnswer = ({ entities, ids, questId, questIndex }) => {
  const answerOptions = useSelector(getAnswerOptionsQuSel);
  const [idsAnswerOptions] = useSelector(getIdsAnswerOptionsQuSel);
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState('');
  const setNumeric = useAction(setNumericAnswer);
  const setThisQuest = useAction(setDataCurrentQuest);
  const resetNumericAnswer = useAction(setDefaultAnswerNumeric);
  const setError = useAction(setErrorMessage);
  const answeredQuestsIds = useSelector(getAllUserAnsweredIdSel);
  const answeredQuestsEntities = useSelector(getAllUserAnsweredEntitiesSel);
  const setUserAnswerFromCache = useAction(setUserTouchedNumAnswer);

  useEffect(() => {
    setThisQuest({
      correctAnswer: [entities[ids[0]].value],
      entities,
      ids,
      questId,
      userAnswer: [],
    });
    resetNumericAnswer(ids[0]);
    setError('');
    if (answeredQuestsIds.includes(questId)) {
      setUserAnswerFromCache({
        taskId: ids[0],
        answers: answeredQuestsEntities[questId].userAnswer,
      });
    }
  }, [questIndex]);

  const startEdit = () => {
    setEdit(true);
    setValue(answerOptions[idsAnswerOptions].value);
    setError('');
  };

  const changeHandler = e => {
    setValue(e.currentTarget.value);
  };

  const stopEditBlur = () => {
    setNumeric({ taskId: ids[0], value });
    setEdit(false);
  };

  const stopEditKey = e => {
    if (e.key === 'Enter') {
      setNumeric({ taskId: ids[0], value });
      setEdit(false);
    }
    if (e.key === 'Escape') {
      setValue(answerOptions[idsAnswerOptions].value);
      setEdit(false);
    }
  };

  return (
    <S.NumberDiv>
      {edit ? (
        <InputEdit
          label="Численный ответ"
          focus
          type="number"
          value={value}
          handler={changeHandler}
          blur={stopEditBlur}
          keyDown={stopEditKey}
        />
      ) : (
        <S.Answer onClick={startEdit}>
          Введите ответ:{' '}
          {answerOptions[idsAnswerOptions] &&
            answerOptions[idsAnswerOptions].value}
        </S.Answer>
      )}
    </S.NumberDiv>
  );
};

NumberAnswer.propTypes = {
  entities: PropTypes.any,
  ids: PropTypes.array,
  questId: PropTypes.string,
  questIndex: PropTypes.number,
};

export default NumberAnswer;
