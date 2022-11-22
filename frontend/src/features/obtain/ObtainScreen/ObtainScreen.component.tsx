import { useNavigate } from 'react-router-dom';
import {
  PageContainer,
  PageSubtitle,
  PageTitle,
  ButtonStyled,
} from '../Obtain.styles';

export const ObtainScreen = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/payment');
  };

  return (
    <PageContainer>
      <PageTitle>We have received your data ✅</PageTitle>
      <PageSubtitle>
        As soon as we check everything, you will receive a notification by
        e-mail and in your personal account. After that, you can start
        investing.
      </PageSubtitle>
      <ButtonStyled type="primary" onClick={handleClick} danger>
        Continue
      </ButtonStyled>
    </PageContainer>
  );
};
