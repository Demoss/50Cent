import { message } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { PageTitle, PageContainer } from '../Login.styles';

import { RedButton, ButtonText } from './LoginConfirmType.styles';
import { Api } from '@/api';
import { routes } from '@/routing';

export const LoginConfirmType = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const typesMFA = searchParams.getAll('typesMFA');

  const handlePhone = () => {
    Api.loginPhone()
      .then((value) => {
        message
          .success('Code sent')
          .then((r) => navigate(routes.login.confirmTypes.phoneAbsolute()));
      })
      .catch((error) => {
        message
          .error("Can't send code to your phone")
          .then((r) => navigate(routes.login.absolute()));
      });
  };

  const handleEmail = () => {
    Api.loginEmail()
      .then((value) => {
        message
          .success('Code sent')
          .then((r) => navigate(routes.login.confirmTypes.emailAbsolute()));
      })
      .catch((error) => {
        message
          .error("Can't send code to your email")
          .then((r) => navigate(routes.login.absolute()));
      });
  };

  const handleOTP = () => {
    navigate(routes.login.confirmTypes.otpAbsolute());
  };

  return (
    <PageContainer>
      <PageTitle>Choose the type of authentification</PageTitle>

      {typesMFA.includes('otp') && (
        <RedButton onClick={() => handleOTP()}>
          <ButtonText> Confirming with Google Authenticator </ButtonText>
        </RedButton>
      )}
      {typesMFA.includes('phone') && (
        <RedButton onClick={() => handlePhone()}>
          <ButtonText>Confirming by phone number</ButtonText>
        </RedButton>
      )}
      {typesMFA.includes('email') && (
        <RedButton onClick={() => handleEmail()}>
          <ButtonText>Confirming by the email</ButtonText>
        </RedButton>
      )}
    </PageContainer>
  );
};
