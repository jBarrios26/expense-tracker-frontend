import React, { useState } from 'react';
import TextField from '../../Components/TextField/TextField';
import { Title } from '../../Components/Title';
import { AuthLayout } from '../../layout/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import { RadioGroup } from '../../Components/RadioGroup';
import { PrimaryButton } from '../../Components/PrimaryButton';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoaderOverlay } from '../../Components/LoaderOverlay';
import { useMutation } from 'react-query';
import { SignUpResponse } from './model/sign_up_response';
import { ApiError } from '../../common/model/error/api_error';
import SignUpService from './service/sign_up_service';
import { AxiosError } from 'axios';
import { SuccessDialog } from '../../Components/SuccessDialog';

interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
}

const signUpSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().required('Email is required').email('Email is invalid'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must not exceed 40 characters'),
  gender: yup.string().required(),
});

const SignUp: React.FC = () => {
  const gender = ['Male', 'Female', 'Other'];
  const genderValue = ['1', '2', '3'];

  const [showSucess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: yupResolver(signUpSchema),
    defaultValues: { gender: '1' },
    mode: 'onBlur',
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignUpForm> = (data) => mutate(data);
  const onError: SubmitErrorHandler<SignUpForm> = (data) => console.error(data);

  const { isLoading, error, mutate } = useMutation<
    SignUpResponse,
    AxiosError<ApiError>,
    SignUpForm
  >(
    'sign-up',
    async (user: SignUpForm) => {
      const service = new SignUpService();
      return await service.signUp(
        user.firstName,
        user.lastName,
        user.email,
        user.password,
        user.gender
      );
    },
    {
      retry: 0,
      onSuccess: (data) => {
        if (data.success) {
          setShowSuccess(true);
        }
      },
    }
  );

  return (
    <AuthLayout title="Jordi Expense Tracker">
      <LoaderOverlay isLoading={isLoading}>
        <div className="h-[calc(100vh_-_144px)] p-12 md:flex  md:flex-col md:justify-center md:px-24">
          <div className=" mb-24">
            <Title>Create account</Title>
            <h3 className=" text-base  font-light">
              Already have an account?
              <span className="font-light text-blue-600 underline">
                <Link to={'/login'}>Login</Link>
              </span>
            </h3>
          </div>
          <form
            onSubmit={(...args) =>
              void handleSubmit(onSubmit, onError)(...args)
            }
          >
            <div className="flex flex-col  md:flex-row md:gap-8">
              <div className=" mb-5 md:flex-1">
                <TextField
                  label="First Name"
                  register={register('firstName')}
                  type="text"
                  id="firstName"
                  error={errors.firstName?.message}
                />
              </div>
              <div className=" mb-5 md:flex-1">
                <TextField
                  label="Last Name"
                  register={register('lastName')}
                  type="text"
                  id="lastName"
                  error={errors.lastName?.message}
                />
              </div>
            </div>
            <div className=" mb-5">
              <TextField
                label="Email"
                register={register('email')}
                type="email"
                id="email"
                error={
                  error !== null
                    ? error.response?.data.message
                    : errors.email?.message
                }
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
            <div className=" mb-5 flex flex-wrap  items-center gap-1">
              Genero:
              <RadioGroup
                options={genderValue}
                labels={gender}
                register={register('gender')}
              ></RadioGroup>
            </div>
            <div className=" mt-8">
              <PrimaryButton name="Create Account" type="submit" />
            </div>
          </form>
        </div>
      </LoaderOverlay>
      <SuccessDialog
        title={'You are successfully register!'}
        subtitle={'Login to start using the Expense Tracker!'}
        isShowing={showSucess}
        doubleButton={false}
        onAccept={() => {
          navigate('/login');
        }}
        onDismiss={() => setShowSuccess(false)}
      ></SuccessDialog>
    </AuthLayout>
  );
};

export default SignUp;
