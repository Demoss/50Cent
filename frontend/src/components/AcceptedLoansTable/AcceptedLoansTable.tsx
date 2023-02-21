import {
  Progress,
  Checkbox,
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Popover,
} from 'antd';
import { Loans } from '@/api/consumer';
import { useCurrentRepayUrlStripe, useLoansAccepted } from '@/hooks';
import Column from 'antd/lib/table/Column';
import { useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';

export function AcceptedLoansTable() {
  const [loading, setLoading] = useState(false);
  const [visibleModalAccept, setModalAcceptVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [minimumPayment, setMinimumPayment] = useState(0);
  const [check, setCheck] = useState(false);
  const [stripeCommission] = useState(0.029);
  const [centServiceCommission] = useState(0.005);
  const [loanId, setLoanId] = useState<string | undefined>('');

  const contentPayment = (
    <div style={{ width: '200px', fontSize: '14px' }}>
      The amount includes the minimum loan repayment fee, our service fee and
      the payment platform fee for the transfer.
    </div>
  );

  function showModal(record: Loans) {
    return (_e: React.SyntheticEvent) => {
      setModalAcceptVisible(true);

      setDisabled(true);
      setMinimumPayment(
        Math.round(
          (record.MinMonthlyPayment * centServiceCommission +
            record.MinMonthlyPayment * stripeCommission +
            record.MinMonthlyPayment) *
            100,
        ) / 100,
      );

      setLoanId(record.key.toString());
    };
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const toggleChange = () => {
    if (check) {
      setCheck(false);
      setDisabled(true);
    } else {
      setCheck(true);
      setDisabled(false);
    }
  };

  const handleCancel = () => {
    setModalAcceptVisible(false);

    setInputValue('');
    setCheck(false);
    setDisabled(true);
  };

  const mutation = useCurrentRepayUrlStripe();

  const handleSubmit = async () => {
    if (inputValue === minimumPayment.toString()) {
      try {
        const response = await mutation.mutateAsync({ loanId });
        window.location.replace(response.url);
        console.log('url: ', response.url);
      } catch (error) {
        message.error('Sorry, something goes wrong!');
      } finally {
        setLoading(false);
        setModalAcceptVisible(false);
        setInputValue('');
        console.log('loanId: ', loanId);
      }
    }
    return message.error('Confirm your action, please.');
  };
  const { loans } = useLoansAccepted();

  return (
    <>
      <Table dataSource={loans} bordered pagination={false} scroll={{ y: 240 }}>
        <Column
          title="Loan"
          key="CreditSum"
          render={(_, record: Loans) => {
            return (
              <span>
                $ {record.CreditSum} - {record.CreditTitle}
              </span>
            );
          }}
        />
        <Column
          title="Already payed"
          dataIndex="PercentOfPayment"
          key="PercentOfPayment"
          render={(_, record: Loans) => {
            return <Progress percent={Math.round(record.PercentOfPayment)} />;
          }}
        />
        <Column
          title="Date of final payment"
          dataIndex="FinalPaymentDate"
          key="FinalPaymentDate"
          render={(_, record: Loans) => {
            return <span>{record.FinalPaymentDate}</span>;
          }}
        />
        <Column
          title="Make a payment"
          render={(_, record: Loans) => {
            return (
              <Button type="primary" danger onClick={showModal(record)}>
                Monthly payment
              </Button>
            );
          }}
        />
      </Table>

      <Modal
        visible={visibleModalAccept}
        title="Confirm action"
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Reject
          </Button>,
          <Button
            key="submit"
            type="primary"
            danger
            loading={loading}
            disabled={disabled}
            onClick={handleSubmit}
          >
            Make payment
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item>
            Minimal payment due to your Loan is{' '}
            <strong>{minimumPayment} $.</strong>
            <Popover content={contentPayment} trigger="hover">
              <InfoCircleOutlined style={{ marginLeft: '5px', color: 'red' }} />
            </Popover>
          </Form.Item>
          <Form.Item>
            <label>
              To confirm the loan, please input the sum you see on the top.
            </label>
            <Input
              type="text"
              name="inputValue"
              value={inputValue}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            <Checkbox checked={check} onChange={toggleChange}>
              I agree to the Terms of Use and
              <a target={'blank'} href="https://stripe.com/privacy">
                Privacy policy
              </a>
            </Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
