import React, { useEffect, useRef, useState } from 'react';
import nanoid from 'nanoid';
import Input from 'components/Input';
import Question from 'pages/CreateTestPage/Question';
import useSelector from 'hooks/useSelector';
import {
  getQuestionsIdsSelector,
  getQuestionsSelector,
  getTestNameSelector,
} from 'models/test/selectors';
import useAction from 'hooks/useAction';
import {
  deleteTest,
  pushQuestion,
  removeQuest,
  setQuestError,
  setTestName,
  setValidQuestion,
} from 'models/test/reducer';
import ButtonRipple from 'components/ButtonRipple';
import ModalOverlay from 'components/ModalOverlay';
import { checkValidationTest } from 'utils/checkValidationTest';
import { DEPLOY_TEST } from 'models/test/action';
import S from './CreateTestPage.styled';

const CreateTestPage = () => {
  const questionsIds = useSelector(getQuestionsIdsSelector);
  const questionsEntities = useSelector(getQuestionsSelector);
  const pushQuest = useAction(pushQuestion);
  const removeTest = useAction(deleteTest);
  const bottomTest = useRef(null);
  const [uniqId, setUniqId] = useState(nanoid());
  const [edit, setEdit] = useState(false);
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [showModalSave, setShowModalSave] = useState(false);
  const [idQuestion, setIdQuestion] = useState(null);
  const deleteQuest = useAction(removeQuest);
  const testName = useSelector(getTestNameSelector);
  const [testTitle, setTestTitle] = useState(testName);
  const acceptTestName = useAction(setTestName);
  const setValidQuest = useAction(setValidQuestion);
  const setInvalidQuest = useAction(setQuestError);
  const deployTest = useAction(DEPLOY_TEST);

  const modalSaveHandler = () => {
    setShowModalSave(true);
  };

  const editStartHandler = () => {
    setEdit(true);
  };

  const editChangeHandler = e => {
    setTestTitle(e.currentTarget.value);
  };

  const editStopBlur = () => {
    if (testTitle.trim()) {
      setEdit(false);
      acceptTestName(testTitle);
    }
  };

  const editStopKey = e => {
    if (e.key === 'Escape') {
      setEdit(false);
      setTestTitle(testName);
    }
    if (e.key === 'Enter' && testTitle.trim()) {
      setEdit(false);
      acceptTestName(testTitle);
    }
  };

  const removeQuestion = () => {
    deleteQuest(idQuestion);
  };

  useEffect(() => {
    return () => removeTest();
  }, []);

  useEffect(() => {
    pushQuest({
      id: uniqId,
      questName: 'Ваш вопрос',
      answer: { entities: [], ids: [] },
    });
    setUniqId(nanoid());
  }, []);

  const addNewQuestion = () => {
    pushQuest({
      id: uniqId,
      questName: 'Ваш вопрос',
      answer: { entities: [], ids: [] },
    });
    setUniqId(nanoid());
  };

  const saveTestAndDeploy = () => {
    const isValid = checkValidationTest(
      questionsEntities,
      questionsIds,
      setValidQuest,
      setInvalidQuest
    );
    if (isValid && questionsIds.length !== 0) {
      const date = new Date();
      const test = {
        id: uniqId,
        testName,
        created: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`,
        questions: {
          entities: questionsEntities,
          ids: questionsIds,
        },
      };
      deployTest(test);
    }
  };

  useEffect(() => {
    bottomTest.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }, [uniqId]);

  return (
    <>
      {showModalRemove && (
        <ModalOverlay
          toggle={setShowModalRemove}
          nameClass={showModalRemove && 'show'}
          isFooter
          positiveBtn="Отмена"
          negativeBtn="Удалить"
          headerText="Удалить вопрос?"
          clickHandler={removeQuestion}
          isCloseBtn1
          isCloseBtn2
        />
      )}
      {showModalSave && (
        <ModalOverlay
          toggle={setShowModalSave}
          nameClass={showModalSave && 'show'}
          isFooter
          positiveBtn="Отмена"
          negativeBtn="Сохранить"
          headerText="Сохранить тест?"
          isCloseBtn2
          clickHandler={saveTestAndDeploy}
        />
      )}
      <S.Content ref={bottomTest}>
        <S.TestForm>
          <S.WrapInput padding="25px 100px 25px 100px">
            {edit ? (
              <Input
                label="Название теста"
                focus
                value={testTitle}
                onChange={editChangeHandler}
                blur={editStopBlur}
                keyHandler={editStopKey}
              />
            ) : (
              <S.QuestNameDiv onClick={editStartHandler}>
                {testTitle}
              </S.QuestNameDiv>
            )}
          </S.WrapInput>
        </S.TestForm>
        {questionsIds.map(id => (
          <Question
            key={id}
            id={id}
            setIdQuestion={setIdQuestion}
            setShowModal={setShowModalRemove}
          />
        ))}
        <S.FooterTest>
          <ButtonRipple onClick={addNewQuestion}>Добавить вопрос</ButtonRipple>
          <ButtonRipple className="green" onClick={modalSaveHandler}>
            Сохранить Тест
          </ButtonRipple>
        </S.FooterTest>
      </S.Content>
    </>
  );
};

export default CreateTestPage;
