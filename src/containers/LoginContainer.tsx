'use client';

import { ReactElement } from 'react';
import { LoginForm } from '../components';
import { LoginFormValues } from '../types';

export interface LoginContainerProps {
  onSubmit: (formValues: LoginFormValues) => void | Promise<void>;
}

export const LoginContainer = ({
  onSubmit,
}: LoginContainerProps): ReactElement => {
  return <LoginForm onSubmit={onSubmit} />;
};
