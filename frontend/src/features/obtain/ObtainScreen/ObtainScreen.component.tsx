import { useNavigate, useSearchParams } from 'react-router-dom';

import { useCurrentUser } from '@/hooks';
import { useGetUserToken } from '@/hooks/auth/useGetUserToken';
import { appStorage } from '@/services/appStorage';
import {
  PageContainer,
  PageSubtitle,
  PageTitle,
  ButtonStyled,
} from '../Obtain.styles';

export const ObtainScreen = () => {
  const { token } = useGetUserToken();
  token && appStorage.setApiKey(token);
  const { currentUser } = useCurrentUser();

  const [searchParams] = useSearchParams();
  const stripeTypeMsg = searchParams.get('type');

  const navigate = useNavigate();
  const handleClick = () => {
    if (currentUser?.role === 'consumer') navigate('/consumer');
    else if (currentUser?.role === 'investor') navigate('/investor');
  };

  return (
    <PageContainer>
      <PageTitle>
        {stripeTypeMsg ? 'Stripe message 💸' : 'We have received your data ✅'}
      </PageTitle>
      <PageSubtitle>
        {stripeTypeMsg === 'success'
          ? 'Payment Successfull!🥇'
          : stripeTypeMsg === 'error'
          ? 'Payment Failure!🚨'
          : 'As soon as we check everything, you will receive a notification by e-mail and in your personal account. After that, you can start investing.'}
      </PageSubtitle>
      <ButtonStyled type="primary" onClick={handleClick} danger>
        My account
      </ButtonStyled>
    </PageContainer>
  );
};
