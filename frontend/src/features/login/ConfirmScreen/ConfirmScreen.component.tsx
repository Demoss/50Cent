import { Form, Input, Spin } from 'antd';
import { useFormik } from 'formik';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

import {
  RedButton,
  PageTitle,
  PageSubtitle,
  PageContainer,
} from '../Login.styles';
import { ConfirmForm } from './ConfirmScreen.types';
import { ConfirmValidationSchema } from './ConfirmScreen.validation';
import { Api } from '@/api';
import { routes } from '@/routing';

export const ConfirmScreen = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoging, setIsLoging] = useState(false);
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: 'white' }} spin />
  );

  const form = useFormik<ConfirmForm>({
    initialValues: {
      code: '',
    },
    validationSchema: ConfirmValidationSchema,
    validateOnChange: false,

    async onSubmit(values) {
      try {
        setIsLoging(true);
        await Api.confirmRegistration({
          email: searchParams.get('email') || '',
          code: values.code,
        });
        console.log('success');
        navigate('/login');
      } catch (error) {
        console.log('error', error);
      } finally {
        setIsLoging(false);
      }
    },
  });

  return (
    <PageContainer>
      <PageTitle>Enter the code from the mail</PageTitle>
      <PageSubtitle>
        Didn't receive the code?&nbsp;
        <Link to={routes.login.registration.absolute()}> Send again</Link>
      </PageSubtitle>

      <form onSubmit={form.handleSubmit}>
        <Form.Item validateStatus={form.errors.code ? 'error' : 'success'}>
          <Input
            placeholder="Code"
            value={form.values.code !== '' ? form.values.code : ''}
            name="code"
            onChange={form.handleChange}
          />
        </Form.Item>
        <Form.Item>
          <RedButton type="submit">
            {isLoging ? <Spin indicator={antIcon} /> : 'Continue'}
          </RedButton>
        </Form.Item>
      </form>
    </PageContainer>
  );
};
