import { Api } from '@/api/api';
import { routes } from '@/routing/routes';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageContainer } from '../Login.styles';

import {
  RedButton,
  ButtonText,
  MainTitle,
  MainContainer,
  PageSubTitle,
  ButtonsContainer,
} from './UserTypeRegistrationScreen';

export const UserTypeRegistrationScreen = () => {
  const navigate = useNavigate();

  const getUserRole = async () => {
    const user = await Api.getMe();

    if (user.data.role !== 'user') {
      navigate(`/${user.data.role}`, { replace: true });
    }
  };

  useEffect(() => {
    getUserRole().catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  return (
    <PageContainer>
      <MainTitle>welcome to 50! 🎉</MainTitle>
      <MainContainer>
        <PageSubTitle>
          In wich way <br /> you want to continue?
        </PageSubTitle>
        <ButtonsContainer>
          <Link to={`${routes.investor.registration.absolute()}`}>
            <RedButton>
              <ButtonText> As investor </ButtonText>
            </RedButton>
          </Link>
          <Link to={`${routes.consumer.registration.absolute()}`}>
            <RedButton>
              <ButtonText>As consumer</ButtonText>
            </RedButton>
          </Link>
        </ButtonsContainer>
      </MainContainer>
    </PageContainer>
  );
};
