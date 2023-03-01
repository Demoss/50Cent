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
      <Title>Loan details</Title>
      <ImgContainer src={LoanImage} alt="loan-img" />
      <CheckLoan>
        Please review the details of the investment again 👇
      </CheckLoan>
      <StepsContainer>
        Title: <br />
        <Line>{credit.data?.creditTitle}</Line>
      </StepsContainer>

      <StepsContainer>
        The required amount of money: <br />
        <Line>$ {credit.data?.creditSum}</Line>
      </StepsContainer>

      <StepsContainer>
        Interest rate: <br />
        <Line>{credit.data?.creditRate}%</Line>
      </StepsContainer>

      <StepsContainer>
        The ammount of money you will receive : <br />{' '}
        <Line>$ {credit.data?.returnedInvestorMoney}</Line>
      </StepsContainer>

      <StepsContainer>
        Term of the loan: <br /> <Line>{credit.data?.creditTerm} month(s)</Line>
      </StepsContainer>

      <StepsContainer>
        Loan description: <br />
        <Line>{credit.data?.creditDescription}</Line>
      </StepsContainer>
      <RedButton onClick={() => handleClick()}>Invest</RedButton>

      <ChangeRateButton onClick={showModal}>
        Offer a different interest rate
      </ChangeRateButton>
      <Modal
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Reject
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Accept
          </Button>,
        ]}
      >
        <form onSubmit={creditForm.handleSubmit}>
          <Form.Item
            validateStatus={creditForm.errors.creditRate ? 'error' : 'success'}
            help={creditForm.errors.creditRate}
          >
            Enter the interest rate that you would agree to👇
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="rate"
              name="creditRate"
              value={creditForm.values.creditRate}
              onChange={creditForm.handleChange}
            />
          </Form.Item>
          <Form.Item
            validateStatus={creditForm.errors.creditTerm ? 'error' : 'success'}
            help={creditForm.errors.creditTerm}
          >
            Enter the term that you would agree to👇
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Enter loan term"
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
