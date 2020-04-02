import React, { useEffect, useState } from 'react';
import nanoid from 'nanoid';
import PropTypes from 'prop-types';
import Input from 'components/Input';
import DropDown from 'components/DropDown';
import RadioQuestions from 'pages/CreateEditTestPage/Question/RadioQuestions';
import NumberQuestion from 'pages/CreateEditTestPage/Question/NumberQuestion';
import CheckBoxQuestions from 'pages/CreateEditTestPage/Question/CheckBoxQuestions';
import useSelector from 'hooks/useSelector';
import { getErrorMsgSelector, getQuestSelector } from 'models/test/selectors';
import useAction from 'hooks/useAction';
import {
  setInitialRadioOrCheckBox,
  setNumericAnswer,
  setQuestName,
} from 'models/test/reducer';
import Cross from 'components/Cross';
import { questionVariable } from 'styles/constants';
import S from './Question.styled';

const Question = ({ id, setIdQuestion, setShowModal }) => {
  const errorMsg = useSelector(getErrorMsgSelector)(id);
  const [edit, setEdit] = useState(false);
  const quest = useSelector(getQuestSelector)(id);
  const [questionName, questionSetName] = useState(quest.questName);
  const [value, setValue] = useState(quest.type || questionVariable.one);
  const [temp, setTemp] = useState(quest.type);
  const [questType, setQuestType] = useState(value);
  const nameRadio = nanoid();
  const setQuestionName = useAction(setQuestName);
  const setInitAnswer = useAction(setInitialRadioOrCheckBox);
  const setNumeric = useAction(setNumericAnswer);

  useEffect(() => {
    if (!quest.isValid || value !== temp) {
      setTemp(value);
      const uniqId = nanoid();
      if (value === questionVariable.one || value === questionVariable.some) {
        const answer = {
          id: uniqId,
          value: `Вариант ответа`,
          isChecked: false,
        };
        setInitAnswer({
          id,
          qId: uniqId,
          answer,
          type: value,
          isValid: false,
          errorMsg: null,
        });
      }
      if (value === questionVariable.number) {
        setNumeric({
          id,
          qId: uniqId,
          value: '0',
          isChecked: true,
          isValid: false,
          type: value,
        });
      }
      setQuestType(value);
    }
  }, [value]);

  const showModalHandler = () => {
    setShowModal(true);
    setIdQuestion(id);
  };

  const startEdit = () => {
    setEdit(true);
  };

  const setQuestionNameHandler = e => {
    questionSetName(e.currentTarget.value);
  };

  const stopEditHandlerBlur = () => {
    if (questionName.trim()) {
      setEdit(false);
      setQuestionName({ id, questionName });
    }
  };

  const stopEditHandlerKey = e => {
    if (e.key === 'Escape') {
      setEdit(false);
      questionSetName(quest.questName);
    }
    if (e.key === 'Enter' && questionName.trim()) {
      setEdit(false);
      setQuestionName({ id, questionName });
    }
  };

  return (
    <S.QuestionForm isValid={errorMsg}>
      <S.QuestFormHeader>
        <S.QuestFormHeaderTitle>
          <S.WrapInput padding="0 20px 0 20px">
            {edit ? (
              <Input
                label="Вопрос"
                onChange={setQuestionNameHandler}
                value={questionName}
                blur={stopEditHandlerBlur}
                keyHandler={stopEditHandlerKey}
                focus
              />
            ) : (
              <S.QuestNameDiv onClick={startEdit}>
                {questionName}
              </S.QuestNameDiv>
            )}
          </S.WrapInput>
        </S.QuestFormHeaderTitle>
        <S.QuestFormHeaderTitle>
          <S.WrapInput padding="0 25px 0 25px">
            <DropDown
              options={[
                questionVariable.one,
                questionVariable.some,
                questionVariable.number,
              ]}
              value={value}
              setValue={setValue}
            />
          </S.WrapInput>
        </S.QuestFormHeaderTitle>
        <Cross
          color="#80868b"
          position="absolute"
          top="-15px"
          right="25px"
          rotate="135deg"
          hover
          clickHandler={showModalHandler}
        />
      </S.QuestFormHeader>
      <S.QuestFormBody>
        {questType === questionVariable.one && (
          <RadioQuestions
            name={nameRadio}
            entities={quest.answer.entities}
            ids={quest.answer.ids}
            id={id}
          />
        )}
        {questType === questionVariable.number && (
          <NumberQuestion
            id={id}
            ids={quest.answer.ids}
            entities={quest.answer.entities}
            numberId={quest.answer.ids[0]}
          />
        )}
        {questType === questionVariable.some && (
          <CheckBoxQuestions
            entities={quest.answer.entities}
            ids={quest.answer.ids}
            id={id}
          />
        )}
        <S.WrapInput>
          <S.Error>{errorMsg}</S.Error>
        </S.WrapInput>
      </S.QuestFormBody>
    </S.QuestionForm>
  );
};

export default Question;
Question.propTypes = {
  id: PropTypes.string,
  setIdQuestion: PropTypes.func,
  setShowModal: PropTypes.func,
};
