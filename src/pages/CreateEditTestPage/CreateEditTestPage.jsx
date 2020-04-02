import React, { useEffect, useRef, useState } from 'react';
import nanoid from 'nanoid';
import Input from 'components/Input';
import Question from 'pages/CreateEditTestPage/Question';
import useSelector from 'hooks/useSelector';
import {
  getCreatedDataSelector,
  getQuestionsIdsSelector,
  getQuestionsSelector,
  getTestNameSelector,
} from 'models/test/selectors';
import useAction from 'hooks/useAction';
import {
  deleteTest,
  pushQuestion,
  removeQuest,
  setDragAndDropArray,
  setQuestError,
  setTestName,
  setValidQuestion,
} from 'models/test/reducer';
import { useParams } from 'react-router-dom';
import ButtonRipple from 'components/ButtonRipple';
import ModalOverlay from 'components/ModalOverlay';
import { checkValidationTest } from 'utils/checkValidationTest';
import { DELETE_TEST, DEPLOY_TEST, UPDATE_TEST } from 'models/test/action';
import { DragDropContext } from 'react-beautiful-dnd';
import Portal from 'components/Portal';
import S from './CreateEditTestPage.styled';

const CreateEditTestPage = () => {
  const questionsIds = useSelector(getQuestionsIdsSelector);
  const questionsEntities = useSelector(getQuestionsSelector);
  const pushQuest = useAction(pushQuestion);
  const editId = useParams().id;
  const scrollPageToBottomTest = useRef(null);
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
  const setDNDNewIds = useAction(setDragAndDropArray);
  const updateThisTest = useAction(UPDATE_TEST);
  const created = useSelector(getCreatedDataSelector);
  const removeTest = useAction(deleteTest);
  const deleteThisTest = useAction(DELETE_TEST);
  const [push, setPush] = useState(false);

  const modalSaveHandler = () => {
    setShowModalSave(true);
  };

  const editStartHandler = () => {
    setEdit(true);
  };

  useEffect(() => {
    return () => removeTest();
  }, []);

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
    if (!editId) {
      pushQuest({
        id: uniqId,
        questName: 'Ваш вопрос',
        answer: { entities: [], ids: [] },
      });
      setUniqId(nanoid());
    }
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
      setPush(true);
    }
  };

  useEffect(() => {
    if (push) {
      const date = new Date();
      if (!editId) {
        const test = {
          id: uniqId,
          testName,
          created: `${date.getDate()}.${date.getMonth() +
            1}.${date.getFullYear()}`,
          questions: {
            entities: questionsEntities,
            ids: questionsIds,
          },
        };
        deployTest(test);
      } else {
        const test = {
          id: editId,
          testName,
          entities: questionsEntities,
          ids: questionsIds,
          created,
        };
        updateThisTest(test);
      }
    }
  }, [push]);

  const removeThisTest = () => {
    deleteThisTest(editId);
  };

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      // eslint-disable-next-line consistent-return
      return false;
    }

    if (destination.droppableId !== source.droppableId) return;

    const quest = questionsEntities[source.droppableId];
    const copyIds = [...quest.answer.ids];
    copyIds.splice(source.index, 1);
    copyIds.splice(destination.index, 0, draggableId);
    setDNDNewIds({ id: destination.droppableId, ids: copyIds });
  };

  useEffect(() => {
    scrollPageToBottomTest.current.scrollIntoView({
      block: 'end',
      behavior: 'smooth',
    });
  }, [uniqId]);

  return (
    <>
      <Portal
        id="modal"
        /* eslint-disable-next-line react/no-children-prop */
        children={
          (showModalRemove && (
            <ModalOverlay
              toggle={setShowModalRemove}
              isOpen={showModalRemove}
              isFooter
              positiveBtn="Отмена"
              negativeBtn="Удалить"
              headerText="Удалить вопрос?"
              clickHandler={removeQuestion}
            />
          )) ||
          (showModalSave && (
            <ModalOverlay
              toggle={setShowModalSave}
              isOpen={showModalSave}
              isFooter
              positiveBtn="Отмена"
              negativeBtn="Сохранить"
              headerText="Сохранить тест?"
              clickHandler={saveTestAndDeploy}
            />
          ))
        }
      />
      <S.PageTest>
        <DragDropContext onDragEnd={onDragEnd}>
          <S.Content ref={scrollPageToBottomTest}>
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
            <S.FooterTest editId={editId}>
              <ButtonRipple clickHandler={addNewQuestion}>
                Добавить вопрос
              </ButtonRipple>
              <ButtonRipple className="green" clickHandler={modalSaveHandler}>
                {editId ? 'Обновить тест' : 'Сохранить Тест'}
              </ButtonRipple>
              {editId && (
                <ButtonRipple className="red" clickHandler={removeThisTest}>
                  Удалить тест
                </ButtonRipple>
              )}
            </S.FooterTest>
          </S.Content>
        </DragDropContext>
      </S.PageTest>
    </>
  );
};

export default CreateEditTestPage;
