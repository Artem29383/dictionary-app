import React, { useEffect, useState } from 'react';
import useSelector from 'hooks/useSelector';
import {
  arrayForTestSelector,
  getIdsSelector,
  getWordsSelector,
} from 'models/dictionary/selectors';
import Input from 'components/Input';
import ButtonRipple from 'components/ButtonRipple';
import { useInput } from 'hooks/useInput';
import { createArrayWithRandomWords } from 'utils/createArrayWithRandomWords';
import useAction from 'hooks/useAction';
import { fillArrayForTest } from 'models/dictionary/reducer';
import { synthVoice } from 'utils/speech';
import Microphone from 'components/Microphone/Microphone';
import useToggle from 'hooks/useToggle';
import routes from 'constants/routes';
import { Redirect } from 'react-router-dom';
import S from './ControlWordsPage.styled';

const ControlWordsPage = () => {
  const maxWords = 10;
  const [goodAnswer, setGoodAnswer] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);
  const [word, setWord] = useState('');
  const [value, setValue, reset] = useInput('');
  const words = useSelector(getWordsSelector);
  const [answer, setAnswer] = useState(0);
  const [showAnswer, setShowAnswer] = useToggle(false);
  const ids = useSelector(getIdsSelector);
  const wordsForTest = useSelector(arrayForTestSelector);
  const fillRandomWordsArray = useAction(fillArrayForTest);
  const [time, setTime] = useState(5);
  const [stopTest, setStopTest] = useToggle(false);
  const offTest = () => {
    setWord('');
    setAnswer(goodAnswer / maxWords);
    setStopTest();
    setShowAnswer();
    fillRandomWordsArray([]);
  };

  useEffect(() => {
    fillRandomWordsArray(createArrayWithRandomWords(ids, maxWords));
    return () => offTest();
  }, [ids]);

  const repeatTest = () => {
    setAnswer(0);
    setShowAnswer();
    setCurrentWord(0);
    setGoodAnswer(0);
    setStopTest();
    setTime(5);
    fillRandomWordsArray(createArrayWithRandomWords(ids, maxWords));
  };

  const checkAnswer = e => {
    if (e.key === 'Enter' || e.which === 1 || e === 'Enter') {
      if (
        words[wordsForTest[currentWord]].word.toLowerCase() ===
        value.toLowerCase()
      ) {
        setGoodAnswer(goodAnswer + 1);
      }
      setTime(5);
      reset();
      setCurrentWord(currentWord + 1);
    }
  };
  // установка новых слов
  useEffect(() => {
    if (wordsForTest[currentWord]) {
      synthVoice(words[wordsForTest[currentWord]].word, 'en-US');
      setWord(words[wordsForTest[currentWord]].translate);
    }
  }, [currentWord, wordsForTest]);

  const interval = () => {
    return setInterval(() => setTime(time - 1), 1000);
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!stopTest) {
      const timer = interval();
      if (time === 0) {
        checkAnswer('Enter');
      }
      return () => clearInterval(timer);
    }
  }, [time, setTime]);

  useEffect(() => {
    if (currentWord === maxWords) {
      offTest();
    }
  }, [currentWord]);

  // eslint-disable-next-line consistent-return
  const result = () => {
    if (answer < 0.5) return 2;
    if (answer >= 0.5 && answer < 0.7) return 3;
    if (answer >= 0.7 && answer < 0.85) return 4;
    if (answer >= 0.85 && answer <= 1) return 5;
  };

  if (ids.length === 0) return <Redirect to={routes.dictionary} />;

  return (
    <S.Content>
      <S.Form>
        {!showAnswer ? (
          <>
            <S.FormHeader>
              <S.FormHeaderText>Повтор слов</S.FormHeaderText>
              <S.FormHeaderCounter>
                Слово: {currentWord + 1}/{maxWords}
              </S.FormHeaderCounter>
            </S.FormHeader>
            <S.FormBody>
              <S.FormBodyText padding="30">
                {word}
                <Microphone voice={() => synthVoice(word, 'ru-RU')} />
              </S.FormBodyText>
              <S.FormInputWrap>
                <Input
                  focus
                  value={value}
                  onChange={setValue}
                  label="Перевод"
                  keyHandler={checkAnswer}
                />
              </S.FormInputWrap>
              <S.FormInputWrap>
                <S.FormText>Время: {time}</S.FormText>
              </S.FormInputWrap>
            </S.FormBody>
            <S.FormFooter>
              <ButtonRipple onClick={checkAnswer}>Проверить</ButtonRipple>
              <ButtonRipple className="red" onClick={offTest}>
                Прервать тест
              </ButtonRipple>
            </S.FormFooter>
          </>
        ) : (
          <>
            <S.FormHeader>
              <S.FormHeaderText>Результат</S.FormHeaderText>
            </S.FormHeader>
            <S.FormBody>
              <S.FormBodyText padding="10">Оценка: {result()}.</S.FormBodyText>
              <S.FormBodyText padding="10">
                Ошибок: {maxWords - goodAnswer}
              </S.FormBodyText>
            </S.FormBody>
            <S.FormFooter>
              <ButtonRipple onClick={repeatTest}>Повторить</ButtonRipple>
            </S.FormFooter>
          </>
        )}
      </S.Form>
    </S.Content>
  );
};

export default ControlWordsPage;
