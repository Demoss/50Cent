import { useCurrentUser } from '@/hooks';
import { useGetUserToken } from '@/hooks/auth/useGetUserToken';
import { appStorage } from '@/services/appStorage';
import { useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();
  const handleClick = () => {
    if (currentUser?.role === 'consumer') navigate('/consumer');
    else if (currentUser?.role === 'investor') navigate('investor');
  };

  return (
    <PageContainer>
      <PageTitle>Ми отримали ваші дані✅</PageTitle>
      <PageSubtitle>
        Як тільки ми все перевіримо - Вам прийде сповіщення на e-mail та у
        особистий кабінет. Після цього, для вас будуть доступні всі можливості
        сайту.
      </PageSubtitle>
      <ButtonStyled type="primary" onClick={handleClick} danger>
        Домашня сторінка
      </ButtonStyled>
    </PageContainer>
  );
};
