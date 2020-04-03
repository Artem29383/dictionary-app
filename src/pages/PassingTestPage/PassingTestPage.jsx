import React, { useEffect, useState } from 'react';
import useAction from 'hooks/useAction';
import { GET_TEST_DATA } from 'models/passTest/actions';
import useSelector from 'hooks/useSelector';
import { useParams } from 'react-router-dom';
import {
  getAllUserAnsweredEntitiesSel,
  getAllUserAnsweredIdSel,
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
import NumberAnswer from 'pages/PassingTestPage/NumberAnswer';
import AllQuestions from 'pages/PassingTestPage/AllQuestions';
import CheckBoxAnswer from 'pages/PassingTestPage/CheckBoxAnswer';
import { testResult } from 'utils/testResult';
import Portal from 'components/Portal';
import ModalOverlay from 'components/ModalOverlay';
import useToggle from 'hooks/useToggle';
import routes from 'constants/routes';
import S from './PassingTestPage.styled';

const PassingTestPage = () => {
  const fetchTest = useAction(GET_TEST_DATA);
  const testId = useParams().id;
  const isLoad = useSelector(getLoadSelector);
  const testName = useSelector(getTestNameSelector);
  const ids = useSelector(getIdsQuestionsSel);
  const [questIndex, setQuestIndex] = useState(0);
  const currentQuest = useSelector(getQuestSelector)(questIndex);
  const userResCurrentQuest = useSelector(getUserAnswerSel);
  const setError = useAction(setErrorMessage);
  const error = useSelector(getErrorSel);
  const pushAns = useAction(pushAnswer);
  const correctAnswersForTest = useSelector(getEntitiesQuestionsSel);
  const deleteTrash = useAction(removeTrash);
  const answeredQuestsIds = useSelector(getAllUserAnsweredIdSel);
  const answeredQuestsEntities = useSelector(getAllUserAnsweredEntitiesSel);
  const [showResult, setShowResult] = useToggle(false);
  const [result, setResult] = useState(0);

  const getQuestIndex = e => {
    setQuestIndex(Number(e.currentTarget.id));
  };

  useEffect(() => {
    return () => deleteTrash();
  }, []);

  const answerHandler = () => {
    if (userResCurrentQuest.length !== 0) {
      const userQuestAnswer = {
        id: ids[questIndex],
        userAnswer: userResCurrentQuest,
      };
      pushAns({
        questId: ids[questIndex],
        userQuestAnswer,
        type: currentQuest.type,
      });
      if (questIndex + 1 !== ids.length) {
        setQuestIndex(questIndex + 1);
      }
    } else if (ids.length !== answeredQuestsIds.length) {
      setError('Выберите хотя бы один ответ');
    }
  };

  const getResult = () => {
    const counterCorrectAnswers = testResult(
      correctAnswersForTest,
      answeredQuestsIds,
      answeredQuestsEntities
    );
    setResult(counterCorrectAnswers);
    setShowResult(true);
  };

  useEffect(() => {
    fetchTest(testId);
  }, []);

  return isLoad ? (
    <Loader />
  ) : (
    <>
      <Portal id="modal">
        {showResult && (
          <ModalOverlay
            isFooter
            toggle={setShowResult}
            isOpen={showResult}
            headerText="Результаты теста"
            link="К списку тестов"
            linkPath={routes.tests}
            isClosable={false}
          >
            <S.Answer>Правильных ответов: {result}</S.Answer>
            <S.Answer>Всего вопросов: {ids.length}</S.Answer>
          </ModalOverlay>
        )}
      </Portal>
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
                {currentQuest.type === questionVariable.number && (
                  <NumberAnswer
                    entities={currentQuest.answer.entities}
                    ids={currentQuest.answer.ids}
                    questId={ids[questIndex]}
                    questIndex={questIndex}
                  />
                )}
                {currentQuest.type === questionVariable.some && (
                  <CheckBoxAnswer
                    entities={currentQuest.answer.entities}
                    ids={currentQuest.answer.ids}
                    questId={ids[questIndex]}
                    questIndex={questIndex}
                  />
                )}
                {error && <S.Error>{error}</S.Error>}
              </S.QuestBody>
              <S.QuestFooter>
                <ButtonRipple clickHandler={answerHandler}>
                  Ответить
                </ButtonRipple>
                <ButtonRipple className="red" clickHandler={getResult}>
                  Завершить тест
                </ButtonRipple>
              </S.QuestFooter>
            </S.PassQuest>
            <S.AllQuestions>
              <S.AllQuestTitle>Вопросы</S.AllQuestTitle>
              <S.AllQuestList>
                <AllQuestions
                  getQuestIndex={getQuestIndex}
                  questId={ids[questIndex]}
                />
              </S.AllQuestList>
            </S.AllQuestions>
          </S.Body>
        </S.Form>
      </S.Content>
    </>
  );
};

export default PassingTestPage;
