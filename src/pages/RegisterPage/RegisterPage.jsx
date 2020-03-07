import React, { useEffect } from 'react';
import Input from 'components/Input';
import { useForm } from 'react-hook-form';
import ButtonRipple from 'components/ButtonRipple';
import routes from 'constants/routes';
import useSelector from 'hooks/useSelector';
import { getErrorSelector, getSuccessMsg } from 'models/user/selectors';
import useAction from 'hooks/useAction';
import { loginUserFailure, registerUserSuccess } from 'models/user/reducer';
import { REGISTER_USER } from 'models/user/action';
import S from './RegisterPage.styled';

const RegisterPage = () => {
  const { register, errors, watch, handleSubmit } = useForm({
    mode: 'onChange',
  });

  const setError = useAction(loginUserFailure);
  const error = useSelector(getErrorSelector);
  const signUp = useAction(REGISTER_USER);
  const setSuccessMsg = useAction(registerUserSuccess);
  const successMsg = useSelector(getSuccessMsg);
  const watchLogin = watch('login');
  const watchPassword = watch('password');
  const registerHandler = data => {
    signUp({ ...data, isAdmin: false, id: Date.now() });
  };

  useEffect(() => {
    if (error.trim()) {
      setError('');
    }
  }, [watchLogin, watchPassword]);

  useEffect(() => {
    if (successMsg.trim()) {
      setTimeout(() => {
        setSuccessMsg('');
      }, 3000);
    }
  }, [successMsg]);

  return (
    <S.RegisterForm onSubmit={handleSubmit(registerHandler)}>
      <S.WrapInput>
        <Input
          label="Имя"
          name="name"
          register={register({ required: true })}
        />
        {errors.name && <S.Error>Поле обязательно к заполнению</S.Error>}
      </S.WrapInput>
      <S.WrapInput>
        <Input
          label="Логин"
          name="login"
          register={register({ required: true })}
        />
        {errors.login && <S.Error>Поле обязательно к заполнению</S.Error>}
      </S.WrapInput>
      <S.WrapInput>
        <Input
          label="Пароль"
          name="password"
          register={register({ required: true })}
        />
        {errors.password && <S.Error>Поле обязательно к заполнению</S.Error>}
      </S.WrapInput>
      <S.WrapInput className="margin10">
        <ButtonRipple className="center">Создать</ButtonRipple>
        <S.Error>{error}</S.Error>
        <S.Error className="green">{successMsg}</S.Error>
        <S.SignIn to={routes.auth} className="center">
          Авторизация
        </S.SignIn>
      </S.WrapInput>
    </S.RegisterForm>
  );
};
export default RegisterPage;

// RegisterPage.propTypes = {
//   logIn: PropTypes.func.isRequired,
// };
