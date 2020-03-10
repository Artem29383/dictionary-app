import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from 'components/Input';
import PropTypes from 'prop-types';
import ButtonRipple from 'components/ButtonRipple';
import useAction from 'hooks/useAction';
import { ADD_WORD } from 'models/dictionary/action';
import useSelector from 'hooks/useSelector';
import {
  getIdsSelector,
  getMsgSelector,
  getWordsSelector,
} from 'models/dictionary/selectors';
import { setMsg } from 'models/dictionary/reducer';
import S from './AddWordModal.styled';

const AddWordModal = ({ id, login, nameClass, toggle }) => {
  const { register, errors, handleSubmit, setValue } = useForm({
    mode: 'onChange',
  });
  const [animated, setAnimated] = useState(null);
  const SPEED_ANIMATION = '0.2s';
  const addWord = useAction(ADD_WORD);
  const entities = useSelector(getWordsSelector);
  const ids = useSelector(getIdsSelector);
  const msg = useSelector(getMsgSelector);
  const setMessage = useAction(setMsg);

  useEffect(() => {
    setAnimated(true);
  }, []);

  useEffect(() => {
    if (msg.trim()) {
      setTimeout(() => {
        setMessage('');
      }, 2000);
    }
  }, [msg]);

  const submitNewWord = data => {
    addWord({ id, login, data: { id: Date.now(), ...data }, entities, ids });
    setValue('word', '');
    setValue('translate', '');
    setValue('pronunciation', '');
  };

  const hideWindow = e => {
    if (e.target.dataset.close === 'true' || e.key === 'Escape') {
      e.preventDefault();
      setAnimated(false);
      setTimeout(() => toggle(), 200);
    }
  };

  useEffect(() => {
    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';
    document.addEventListener('click', hideWindow);
    document.addEventListener('keydown', hideWindow);
    return () => {
      document.body.style.height = '100%';
      document.body.style.overflow = 'visible';
      document.removeEventListener('click', hideWindow);
      document.removeEventListener('keydown', hideWindow);
    };
  }, []);

  return (
    <S.OverlayM
      className={nameClass}
      isAnim={animated}
      speedAnim={SPEED_ANIMATION}
      data-close
    >
      <S.ModalWindow
        className={nameClass}
        isAnim={animated}
        speedAnim={SPEED_ANIMATION}
        onSubmit={handleSubmit(submitNewWord)}
      >
        <S.ModalHeader>Добавить слово в словарь</S.ModalHeader>
        <S.ModalInputWrap>
          <Input
            label="Слово"
            register={register({ required: true })}
            name="word"
          />
          {errors.word && <S.Message>Поле обязательно к заполнению</S.Message>}
        </S.ModalInputWrap>
        <S.ModalInputWrap>
          <Input
            label="Перевод"
            register={register({ required: true })}
            name="translate"
          />
          {errors.translate && (
            <S.Message>Поле обязательно к заполнению</S.Message>
          )}
        </S.ModalInputWrap>
        <S.ModalInputWrap>
          <Input
            label="Произношение"
            register={register({ required: true })}
            name="pronunciation"
          />
          {errors.pronunciation && (
            <S.Message>Поле обязательно к заполнению</S.Message>
          )}
        </S.ModalInputWrap>
        <S.ModalFooter>
          <ButtonRipple className="red" dataClose>
            Отмена
          </ButtonRipple>
          <ButtonRipple>Добавить</ButtonRipple>
        </S.ModalFooter>
        <S.Message className="green">{msg}</S.Message>
      </S.ModalWindow>
    </S.OverlayM>
  );
};

export default AddWordModal;
AddWordModal.propTypes = {
  id: PropTypes.number.isRequired,
  nameClass: PropTypes.string,
  login: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
};
