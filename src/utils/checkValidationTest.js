// eslint-disable-next-line no-unused-vars,consistent-return
export function checkValidationTest(
  questions,
  ids,
  setValidQuest,
  setInvalidQuest
) {
  const validQuestions = [];
  const inValidQuestions = [];
  ids.forEach(id => {
    if (
      questions[id].type === 'Один из нескольких' ||
      questions[id].type === 'Несколько из списка'
    ) {
      if (questions[id].answer.ids.length < 2) {
        inValidQuestions.push({
          id,
          errorMsg: 'Нужно больше двух вариантов ответа',
        });
      } else {
        const checkAnswer = [];
        // eslint-disable-next-line array-callback-return,consistent-return
        questions[id].answer.ids.some(qId => {
          if (questions[id].answer.entities[qId].isChecked) {
            checkAnswer.push(id);
            return validQuestions.push(id);
          }
        });
        if (checkAnswer.length === 0) {
          inValidQuestions.push({
            id,
            errorMsg: 'Отсутствует правильный ответ',
          });
        }
      }
    }
  });
  if (inValidQuestions.length === 0) return true;

  if (validQuestions.length !== 0) {
    validQuestions.forEach(qId => {
      setValidQuest(qId);
    });
  }

  inValidQuestions.forEach(q => {
    setInvalidQuest({ id: q.id, errorMsg: q.errorMsg });
  });
}
