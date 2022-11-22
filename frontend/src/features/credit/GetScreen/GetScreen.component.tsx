import { useCurrentCredit } from '@/hooks/credit';
import { message, Modal, Spin, Form, Input, Button } from 'antd';
import { useParams } from 'react-router-dom';
import { useCurrentURLStripe } from '@/hooks/credit/useCurrentURLStripe';
import {
  ChangeRateButton,
  CheckLoan,
  Container,
  ImgContainer,
  Line,
  RedButton,
  StepsContainer,
  Title,
} from './GetScreen.styles';
import LoanImage from '../../../images/loanPage.jpg';
import { useState } from 'react';
import { useFormik } from 'formik';
import { Api } from '@/api';
import { UserOutlined } from '@ant-design/icons';

function Redirect(url: string) {
  window.location.href = url;
  return null;
}

export function GetScreen() {
  const { id } = useParams();
  const credit = useCurrentCredit(id);
  const mutation = useCurrentURLStripe(id);
  const [visible, setVisible] = useState(false);
  const creditForm = useFormik({
    initialValues: {
      creditRate: 0,
      creditTerm: 0,
      creditId: '',
    },
    async onSubmit(values) {
      try {
        const response = await Api.makeCounterOffer({
          creditRate: +values.creditRate,
          creditTerm: +values.creditTerm,
          creditId: id,
        });
        console.log(response.status);
        if (response.status === 'Created') {
          message.success('Credit has been changed.');
        }
      } catch (error) {
        message.error('Error changing credit');
      }
    },
  });
  const handleClick = async () => {
    const response = await mutation.mutateAsync({ creditId: id });
    Redirect(response.url);
  };
  if (credit.isLoading) {
    return <Spin />;
  }

  const handleCancel = () => {
    setVisible(false);
  };
  const handleOk = () => {
    setVisible(false);
    creditForm.submitForm();
  };
  const showModal = () => {
    setVisible(true);
  };

  return (
    <Container>
      <Title>Деталі позики</Title>
      <ImgContainer src={LoanImage} alt="loan-img" />
      <CheckLoan>
        Будь ласка, ще раз ознайомтесь <br />
        із деталями інвестиції 👇
      </CheckLoan>
      <StepsContainer>
        Заголовок: <br />
        <Line>{credit.data?.creditTitle}</Line>
      </StepsContainer>

      <StepsContainer>
        Необхідна сума грошей: <br />
        <Line>₴ {credit.data?.creditSum}</Line>
      </StepsContainer>

      <StepsContainer>
        Відсоткова ставка: <br />
        <Line>{credit.data?.creditRate}%</Line>
      </StepsContainer>

      <StepsContainer>
        Грошей отримаєте ви: <br />{' '}
        <Line>{credit.data?.returnedInvestorMoney} ₴</Line>
      </StepsContainer>

      <StepsContainer>
        Термін кредиту: <br /> <Line>{credit.data?.creditTerm} міс.</Line>
      </StepsContainer>

      <StepsContainer>
        Опис кредиту: <br />
        <Line>{credit.data?.creditDescription}</Line>
      </StepsContainer>
      <RedButton onClick={() => handleClick()}>Проінвестувати</RedButton>

      <ChangeRateButton onClick={showModal}>
        Запропонувати іншу відсоткову ставку
      </ChangeRateButton>
      <Modal
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Скасувати
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Погодитись
          </Button>,
        ]}
      >
        <form onSubmit={creditForm.handleSubmit}>
          <Form.Item
            validateStatus={creditForm.errors.creditRate ? 'error' : 'success'}
            help={creditForm.errors.creditRate}
          >
            Введіть відсоткову ставку, на яку б ви погодились: 👇
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="ставка"
              name="creditRate"
              value={creditForm.values.creditRate}
              onChange={creditForm.handleChange}
            />
          </Form.Item>
          <Form.Item
            validateStatus={creditForm.errors.creditTerm ? 'error' : 'success'}
            help={creditForm.errors.creditTerm}
          >
            Введіть термін кредиту, на який би ви погодились: 👇
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Введіть термін кредиту"
              name="creditTerm"
              value={creditForm.values.creditTerm}
              onChange={creditForm.handleChange}
            />
          </Form.Item>
        </form>
      </Modal>
    </Container>
  );
}
