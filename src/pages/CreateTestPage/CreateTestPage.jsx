import React, { useEffect } from 'react';
import nanoid from 'nanoid';
import Input from 'components/Input';
import Question from 'pages/CreateTestPage/Question';
import useSelector from 'hooks/useSelector';
import { getQuestionsIdsSelector } from 'models/test/selectors';
import useAction from 'hooks/useAction';
import { pushQuestion } from 'models/test/reducer';
import S from './CreateTestPage.styled';

const CreateTestPage = () => {
  const questionsIds = useSelector(getQuestionsIdsSelector);
  const pushQuest = useAction(pushQuestion);
  
  useEffect(() => {
    return () => removeTest();
  });

  useEffect(() => {
    pushQuest({
      id: nanoid(),
      questName: 'Ваш вопрос',
      answer: { entities: [], ids: [] },
    });
  }, []);
  return (
    <S.Content>
      <S.TestForm>
        <S.WrapInput padding="25px 100px 25px 100px">
          <Input label="Название теста" />
        </S.WrapInput>
      </S.TestForm>
      {questionsIds.map(id => (
        <Question key={id} id={id} />
      ))}
    </S.Content>
  );
};

export default CreateTestPage;
