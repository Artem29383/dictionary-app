import React, { useState } from 'react';
import nanoid from 'nanoid';
import PropTypes from 'prop-types';
import Input from 'components/Input';
import DropDown from 'components/DropDown';
import RadioQuestions from 'pages/CreateTestPage/Question/RadioQuestions';
import NumberQuestion from 'pages/CreateTestPage/Question/NumberQuestion';
import CheckBoxQuestions from 'pages/CreateTestPage/Question/CheckBoxQuestions';
import useSelector from 'hooks/useSelector';
import { getErrorMsgSelector, getQuestSelector } from 'models/test/selectors';
import useAction from 'hooks/useAction';
import { setQuestName } from 'models/test/reducer';
import Cross from 'components/Cross';
import S from './Question.styled';

const Question = ({ id, setIdQuestion, setShowModal }) => {
  const errorMsg = useSelector(getErrorMsgSelector)(id);
  const [edit, setEdit] = useState(false);
  const quest = useSelector(getQuestSelector)(id);
  const [questionName, questionSetName] = useState(quest.questName);
  const [value, setValue] = useState('Один из списка');
  const nameRadio = nanoid();
  const setQuestionName = useAction(setQuestName);

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
              options={['Один из списка', 'Несколько из списка', 'Численный']}
              value={value}
              setValue={setValue}
            />
          </S.WrapInput>
        </S.QuestFormHeaderTitle>
        <Cross
          color="#80868b"
          position="absolute"
          top="-15px"
          right="5px"
          rotate="135deg"
          hover
          clickHandler={showModalHandler}
        />
      </S.QuestFormHeader>
      <S.QuestFormBody>
        {value === 'Один из списка' && (
          <RadioQuestions
            name={nameRadio}
            entities={quest.answer.entities}
            ids={quest.answer.ids}
            id={id}
          />
        )}
        {value === 'Численный' && <NumberQuestion id={id} />}
        {value === 'Несколько из списка' && (
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
