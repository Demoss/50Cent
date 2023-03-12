import { Form, Input, message, Spin } from 'antd';
import { useFormik } from 'formik';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useQueryClient } from 'react-query';

import { cacheKeys } from '@/hooks/auth/auth.cacheKeys';
import {
  RedButton,
  PageTitle,
  PageSubtitle,
  PageContainer,
} from '../Login.styles';
import {
  LoginConfirmForm,
  LoginConfirmToken,
} from './LoginConfirmScreen.types';
import { ConfirmValidationSchema } from './LoginConfirmScreen.validation';
import { Api } from '@/api';
import { routes } from '@/routing';
import { appStorage } from '@/services/appStorage';

function Redirect(url: string) {
  window.location.href = url;
  return null;
}

export const LoginConfirmScreen = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const [isLogging, setIsLogging] = useState(false);
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: 'white' }} spin />
  );

  const form = useFormik<LoginConfirmForm>({
    initialValues: {
      code: 0,
    },
    validationSchema: ConfirmValidationSchema,
    validateOnChange: false,
    async onSubmit(values) {
      try {
        setIsLogging(true);

        const method =
          type === 'email'
            ? 'loginConfirmEmail'
            : type === 'phone'
            ? 'loginConfirmPhone'
            : 'loginConfirmOtp';

        const response = await Api[method]({ code: values.code });
        const token: LoginConfirmToken = jwt_decode(response.token);
        message.success('Code sent');
        await appStorage.setApiKey(response.token);
        await appStorage.setExpirationTimeApiKey(token.exp)
        await appStorage.setRefreshToken(response.refresh)
        if (token.role === 'investor') {
          const investor = await Api.getCurrentInvestor();

          if (!investor.IsConfirmed) {
            message.warn('You did not add payment to your account!');
            await Api.registerInvestorStripe()
              .then((response) => Redirect(response.url))
              .catch((error) =>
                message.error('Error while trying to add payment.'),
              );
          } else {
            await queryClient.invalidateQueries(cacheKeys.currentUser());
            navigate(`/${token.role}/cabinet`, { replace: true });
          }
        } else if (token.role === 'consumer') {
          const consumer = await Api.getCurrentConsumer();

          if (!consumer.IsConfirmed) {
            message.warn('You did not add payment to your account!');
            await Api.registerStripe()
              .then((response) => Redirect(response.url))
              .catch((err) =>
                message.error(
                  'An error occurred while trying to add a payment.',
                ),
              );
          } else {
            await queryClient.invalidateQueries(cacheKeys.currentUser());
            navigate(`/${token.role}`, { replace: true });
          }
        } else {
          navigate('/login/userType', { replace: true });
        }
      } catch (e) {
        message.error('Code is incorrect');
      } finally {
        setIsLogging(false);
      }
    },
  });

  return (
    <PageContainer>
      <PageTitle>Enter the code for the comfirmation</PageTitle>
      <PageSubtitle>
        Didn't receive the code?&nbsp;
        <Link to={routes.login.absolute()}>Send again.</Link>
      </PageSubtitle>

      <form onSubmit={form.handleSubmit}>
        <Form.Item validateStatus={form.errors.code ? 'error' : 'success'}>
          <Input
            placeholder="Code"
            value={form.values.code > 0 ? form.values.code : ''}
            name="code"
            onChange={form.handleChange}
          />
        </Form.Item>
        <Form.Item>
          <RedButton type="submit">
            {isLogging ? <Spin indicator={antIcon} /> : 'Continue'}
          </RedButton>
        </Form.Item>
      </form>
    </PageContainer>
  );
};
