import React, { useEffect, useState } from 'react';
import useAction from 'hooks/useAction';
import { GET_TEST_DATA } from 'models/passTest/actions';
import useSelector from 'hooks/useSelector';
import { useParams } from 'react-router-dom';
import {
  getEntitiesQuestionsSel,
  getErrorSel,
  getIdsQuestionsSel,
  getLoadSelector,
  getQuestSelector,
  getTestNameSelector,
  getUserAnswerSel,
} from 'models/passTest/selectors';
import Loader from 'components/Loader';
import RadioAnswer from 'pages/PassingTestPage/RadioAnswer/RadioAnswer';
import { questionVariable } from 'styles/constants';
import ButtonRipple from 'components/ButtonRipple';
import {
  pushAnswer,
  removeTrash,
  setErrorMessage,
} from 'models/passTest/reducer';
import S from './PassingTestPage.styled';

const PassingTestPage = () => {
  const fetchTest = useAction(GET_TEST_DATA);
  const testId = useParams().id;
  const isLoad = useSelector(getLoadSelector);
  const testName = useSelector(getTestNameSelector);
  const ids = useSelector(getIdsQuestionsSel);
  const questions = useSelector(getEntitiesQuestionsSel);
  const [questIndex, setQuestIndex] = useState(0);
  const currentQuest = useSelector(getQuestSelector)(questIndex);
  const userResCurrentQuest = useSelector(getUserAnswerSel);
  const setError = useAction(setErrorMessage);
  const error = useSelector(getErrorSel);
  const pushAns = useAction(pushAnswer);
  const deleteTrash = useAction(removeTrash);

  const getQuestIndex = e => {
    setQuestIndex(Number(e.currentTarget.id));
  };

  const questionsItem = ids.map((q, i) => (
    <S.AllQuestItem
      onClick={getQuestIndex}
      key={q}
      id={i}
      type={questions[q].type}
    >
      {questions[q].questName}
    </S.AllQuestItem>
  ));

  useEffect(() => {
    return () => deleteTrash();
  }, []);

  const answerHandler = () => {
    if (userResCurrentQuest.length !== 0) {
      const userQuestAnswer = {
        id: ids[questIndex],
        userAnswer: userResCurrentQuest,
      };
      pushAns({ questId: ids[questIndex], userQuestAnswer });
      if (questIndex + 1 === ids.length) {
        console.log('result...');
      } else {
        setQuestIndex(questIndex + 1);
      }
    } else {
      setError('Выберите хотя бы один ответ');
    }
  };

  useEffect(() => {
    fetchTest(testId);
  }, []);

  return isLoad ? (
    <Loader />
  ) : (
    <S.Content>
      <S.Form>
        <S.Header>
          <S.HeaderTitle>Название теста: {testName}</S.HeaderTitle>
        </S.Header>
        <S.Body>
          <S.PassQuest>
            <S.QuestTitle>Вопрос: {currentQuest.questName}</S.QuestTitle>
            <S.QuestBody>
              {currentQuest.type === questionVariable.one && (
                <RadioAnswer
                  entities={currentQuest.answer.entities}
                  ids={currentQuest.answer.ids}
                  questId={ids[questIndex]}
                  questIndex={questIndex}
                />
              )}
              {error && <S.Error>{error}</S.Error>}
            </S.QuestBody>
            <S.QuestFooter>
              <ButtonRipple clickHandler={answerHandler}>Ответить</ButtonRipple>
            </S.QuestFooter>
          </S.PassQuest>
          <S.AllQuestions>
            <S.AllQuestTitle>Вопросы</S.AllQuestTitle>
            <S.AllQuestList>{questionsItem}</S.AllQuestList>
          </S.AllQuestions>
        </S.Body>
      </S.Form>
    </S.Content>
  );
};

export default PassingTestPage;
