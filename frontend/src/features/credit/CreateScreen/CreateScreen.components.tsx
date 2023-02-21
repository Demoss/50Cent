import { Form, Layout, Input, Steps, Divider, message } from 'antd';
import { useFormik } from 'formik';
import { CreditForm } from './CreateScreen.types';
import { Api } from '@/api';
import { CreditFormValidationSchema } from './CreateScreen.validation';
import {
  CreditFormContainer,
  CreditFormStyled,
  RedButton,
  StepsContainer,
  InstructionContainer,
  Instruction,
  InstructionText,
} from './CreateScreen.styles';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/routing';

const { TextArea } = Input;
const { Step } = Steps;

export const CreateScreen = () => {
  const navigate = useNavigate();

  const creditForm = useFormik<CreditForm>({
    initialValues: {
      creditSum: 0,
      creditTitle: '',
      creditDesc: '',
      creditTerm: 0,
      creditRate: 0,
    },
    validationSchema: CreditFormValidationSchema,
    validateOnChange: false,
    async onSubmit(values) {
      try {
        const response = await Api.createCredit({
          creditSum: Number(values.creditSum),
          creditTitle: values.creditTitle,
          creditDesc: values.creditDesc,
          creditTerm: Number(values.creditTerm),
          creditRate: Number(values.creditRate),
        });
        if (response.Loan === 'created') {
          message.success('The loan is created successfully');
        }
        navigate(routes.consumer.absolute());
      } catch (error) {
        console.log('error', error);
        message.error('Error due to creating od loan');
      }
    },
  });

  return (
    <Layout>
      <CreditFormContainer>
        <StepsContainer>
          <Steps size="small" current={1}>
            <Step title="Submit documents" />
            <Step title="Fill out the form" />
            <Step title="Your loan will be placed on 50 Cent." />
          </Steps>
        </StepsContainer>
        <CreditFormStyled onSubmit={creditForm.handleSubmit}>
          <Form.Item
            validateStatus={creditForm.errors.creditSum ? 'error' : 'success'}
            help={creditForm.errors.creditSum}
            label="The required amount of money, $ "
            labelCol={{ span: 8 }}
            labelAlign={'left'}
          >
            <Input
              size="large"
              placeholder="12000"
              name="creditSum"
              value={creditForm.values.creditSum}
              onChange={creditForm.handleChange}
            />
          </Form.Item>
          <Form.Item
            validateStatus={creditForm.errors.creditTitle ? 'error' : 'success'}
            help={creditForm.errors.creditTitle}
            label="Title of the loan "
            labelCol={{ span: 8 }}
            labelAlign={'left'}
          >
            <Input
              size="large"
              placeholder="Buy a freezer in a coffee shop"
              name="creditTitle"
              value={creditForm.values.creditTitle}
              onChange={creditForm.handleChange}
            />
          </Form.Item>
          <Form.Item
            validateStatus={creditForm.errors.creditDesc ? 'error' : 'success'}
            help={creditForm.errors.creditDesc}
            label="Detailed description of the loan "
            labelCol={{ span: 8 }}
            labelAlign={'left'}
          >
            <TextArea
              size="large"
              placeholder="My coffee shop needs to buy a freezer to..."
              name="creditDesc"
              value={creditForm.values.creditDesc}
              onChange={creditForm.handleChange}
            />
          </Form.Item>
          <Form.Item
            validateStatus={creditForm.errors.creditTerm ? 'error' : 'success'}
            help={creditForm.errors.creditTerm}
            label="Term of the loan: "
            labelCol={{ span: 8 }}
            labelAlign={'left'}
          >
            <Input
              size="large"
              placeholder="12"
              name="creditTerm"
              value={creditForm.values.creditTerm}
              onChange={creditForm.handleChange}
            />
          </Form.Item>
          <Form.Item
            validateStatus={creditForm.errors.creditRate ? 'error' : 'success'}
            help={creditForm.errors.creditRate}
            label="Desired Annual %(0.5% service fee will be added to this percentage) "
            labelCol={{ span: 8 }}
            labelAlign={'left'}
          >
            <Input
              size="large"
              placeholder="3%"
              name="creditRate"
              value={creditForm.values.creditRate}
              onChange={creditForm.handleChange}
            />
          </Form.Item>
          <Form.Item>
            <RedButton type="submit">Submit a loan</RedButton>
          </Form.Item>
        </CreditFormStyled>
        <Divider />
      </CreditFormContainer>
      <InstructionContainer>
        <Instruction>Instruction</Instruction>
        <InstructionText>Filling out the loan form</InstructionText>
        <InstructionText>
          After filling out this form, your loan application will be placed on
          the "looking for investments" tab. In other words, every willing
          investor will see your statement and will be able to invest in it, if
          the conditions suit him. 0.5% will be added to the percentage
          specified by you - a commission of 50 cents.
        </InstructionText>
      </InstructionContainer>
    </Layout>
  );
};
