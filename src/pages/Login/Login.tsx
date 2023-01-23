import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../Components/PrimaryButton';
import { TextField } from '../../Components/TextField';
import { Title } from '../../Components/Title';
import { AuthLayout } from '../../layout/AuthLayout';
import * as yup from 'yup';
import { TextButton } from '../../Components/TextButton';
import { useMutation } from 'react-query';
import { LoginResponse } from './model/LoginResponse';
import { ApiError } from '../../common/model/error/api_error';
import { AxiosError } from 'axios';
import LoginService from './service/login_service';
import { ErrorSnackBar } from '../../Components/ErrorSnackBar';
import { useSnackbar } from '../../hooks/useSnackbar';
import { useDispatch } from 'react-redux';
import { modifyUser, setNewToken } from '../../redux/states/user';
import useLocalStorage from '../../hooks/useLocalStorage';

interface LoginForm {
  email: string;
  password: string;
}

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('This is not a valid email'),
  password: yup.string().required('Password is required'),
});

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [_value, setRefreshToken] = useLocalStorage('refreshToken', '');

  const { isActive, openSnackBar, closeSnackBar } = useSnackbar(3000);

  const onSubmit: SubmitHandler<LoginForm> = (data) => mutate(data);
  const onError: SubmitErrorHandler<LoginForm> = (data) => console.error(data);

  const { isLoading, error, mutate } = useMutation<
    LoginResponse,
    AxiosError<ApiError>,
    LoginForm
  >(
    'login',
    async (user: LoginForm) => {
      const service = new LoginService();
      return await service.login(user.email, user.password);
    },
    {
      retry: 0,
      onSuccess: (data) => {
        if (data.success) {
          setRefreshToken(data.refreshToken);
          dispatch(modifyUser({ token: data.jwtToken, userId: data.userId }));
          navigate('/home');
        }
      },
      onError: () => {
        openSnackBar('Wrong email or password.');
      },
    }
  );

  return (
    <AuthLayout title="Jordi Expense Tracker">
      <div className="h-[calc(100vh_-_144px)] p-12 md:flex  md:flex-col md:justify-center md:px-24">
        <div className=" mb-24">
          <Title>Welcome Back</Title>
          <h3 className=" text-base  font-light">
            Don&#39;t have an account?{' '}
            <span className="font-light text-blue-600 underline">
              <Link to={'/sign-up'}>Sign Up</Link>
            </span>
          </h3>
        </div>
        <form
          onSubmit={(...args) => void handleSubmit(onSubmit, onError)(...args)}
        >
          <div className=" mb-5">
            <TextField
              label="Email"
              register={register('email')}
              type="email"
              id="email"
              error={errors.email?.message}
            />
          </div>
          <div className=" mb-5">
            <TextField
              label="Password"
              register={register('password')}
              type="password"
              id="password"
              error={errors.password?.message}
            />
          </div>
          <div className="flex items-center justify-end">
            <TextButton
              onClick={() => {
                navigate('/forgot-password');
              }}
              name="Forgot Password?"
            />
          </div>
          <div className=" mt-8">
            <PrimaryButton name="Login" type="submit" />
          </div>
        </form>
        <ErrorSnackBar
          message="Wrong email or password"
          isActive={isActive}
          onClose={closeSnackBar}
        />
      </div>
    </AuthLayout>
  );
};

export default Login;
