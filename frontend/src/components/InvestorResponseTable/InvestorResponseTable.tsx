import {
  Checkbox,
  Divider,
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
} from 'antd';

import Column from 'antd/lib/table/Column';
import React, { useState } from 'react';
import { useCounterOffers } from '@/hooks/consumer/useGetContoffers';
import ColumnGroup from 'antd/lib/table/ColumnGroup';
import { CounterOffers } from '@/api/consumer/getCounterOffers/apiTypes';
import { useAcceptOffer } from '@/hooks/consumer//useAcceptOffer';
import { useRejectOffer } from '@/hooks/consumer/useRejectOffer';

export const InvestorResponse: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [visibleModalAccept, setModalAcceptVisible] = useState(false);
  const [visibleModalDenied, setModalDeniedVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [confirm] = useState('Confirm');
  const [checked, setChecked] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [id, setId] = useState<number>(0);

  function showModalAccept(record: CounterOffers) {
    return (_e: React.SyntheticEvent) => {
      setId(record.key);
      setModalAcceptVisible(true);
    };
  }

  function showModalDenied(record: CounterOffers) {
    return (_e: React.SyntheticEvent) => {
      setId(record.key);
      setModalDeniedVisible(true);
    };
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const toggleDisable = () => {
    setDisabled(!disabled);
    setChecked(checked);
  };

  const mutationAccept = useAcceptOffer();
  const mutationReject = useRejectOffer();

  const handleSubmit = async () => {
    if (inputValue === confirm) {
      try {
        const response = await mutationAccept.mutateAsync({ id });
        console.log(response);
      } catch (error) {
        message.error('Sorry, something goes wrong!');
      }
      setLoading(true);
      setLoading(false);
      setModalAcceptVisible(false);
      setInputValue('');
      return;
    }
    return message.error('To confirm, please input rigth word.');
  };

  const handleCancel = () => {
    setModalAcceptVisible(false);
    setModalDeniedVisible(false);
    setInputValue('');
    setChecked(false);
    setDisabled(true);
  };

  const onDelete = () => {
    setModalDeniedVisible(false);
    mutationReject.mutate({ id });
  };

  const { offers } = useCounterOffers();

  return (
    <Table dataSource={offers} pagination={false} scroll={{ y: 240 }}>
      <Column
        title="Name"
        dataIndex="CreditTitle"
        key="CreditTitle"
        width="8%"
        render={(_, record: CounterOffers) => {
          return <span>{record.CreditTitle}</span>;
        }}
      />
      <Column
        title="Loan amount"
        dataIndex="CreditSum"
        key="CreditSum"
        width="9%"
        render={(_, record: CounterOffers) => {
          return <span>₴ {record.CreditSum}</span>;
        }}
      />
      <ColumnGroup title="Interest rate">
        <Column
          title="Your rate"
          dataIndex="CreditRate"
          key="CreditRate"
          width="7%"
          render={(_, record: CounterOffers) => {
            return <span>{record.CreditRate}%</span>;
          }}
        />
        <Column
          title="Offer"
          dataIndex="CreditNewRate"
          key="CreditNewRate"
          width="8.5%"
          render={(_, record: CounterOffers) => {
            return <strong>{record.CreditNewRate}%</strong>;
          }}
        />
      </ColumnGroup>
      <ColumnGroup title="Loan term">
        <Column
          title="Your term"
          dataIndex="CreditTerm"
          key="CreditTerm"
          width="7%"
          render={(_, record: CounterOffers) => {
            return <span>{record.CreditTerm} м.</span>;
          }}
        />
        <Column
          title="Offer"
          dataIndex="CreditNewTerm"
          key="CreditNewTerm"
          width="8.5%"
          render={(_, record: CounterOffers) => {
            return <strong>{record.CreditNewTerm} м.</strong>;
          }}
        />
      </ColumnGroup>
      <ColumnGroup title="The entire loan repayment amount">
        <Column
          title="On your cond."
          dataIndex="TotalSum"
          key="TotalSum"
          width="9%"
          render={(_, record: CounterOffers) => {
            return <span>₴ {record.TotalSum}</span>;
          }}
        />
        <Column
          title="Accord. to offer"
          dataIndex="TotalNewSum"
          key="TotalNewSum"
          width="9%"
          render={(_, record: CounterOffers) => {
            return <strong>₴ {record.TotalNewSum}</strong>;
          }}
        />
      </ColumnGroup>
      <ColumnGroup title="Monthly payment">
        <Column
          title="On your cond."
          dataIndex="MonthlyPayment"
          key="MonthlyPayment"
          width="9%"
          render={(_, record: CounterOffers) => {
            return <span>₴ {record.MonthlyPayment}</span>;
          }}
        />
        <Column
          title="Accord. to offer"
          dataIndex="NewMonthlyPayment"
          key="NewMonthlyPayment"
          width="9%"
          render={(_, record: CounterOffers) => {
            return <strong>₴ {record.NewMonthlyPayment}</strong>;
          }}
        />
      </ColumnGroup>
      <Column
        title="Actiona"
        dataIndex="creditTotalPayment"
        key="creditTotalPayment"
        width="9%"
        render={(_, record: CounterOffers) => (
          <>
            <button
              onClick={showModalAccept(record)}
              style={{ color: 'green' }}
            >
              Accept
            </button>
            <Modal
              visible={visibleModalAccept}
              title="Congirm action"
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
                  Take loan
                </Button>,
              ]}
            >
              <Form layout="vertical">
                <Form.Item>
                  <label>
                    To confirm the loan, type in <strong>“Confirm”</strong>.
                  </label>
                  <Input
                    type="text"
                    name="inputValue"
                    value={inputValue}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item style={{ textAlign: 'center' }}>
                  <Checkbox onChange={toggleDisable}>
                    I agree to the Terms of Use and Privacy policy
                  </Checkbox>
                </Form.Item>
              </Form>
            </Modal>
            <Divider type="vertical" />
            <button onClick={showModalDenied(record)} style={{ color: 'red' }}>
              Reject
            </button>
            <Modal
              visible={visibleModalDenied}
              onCancel={handleCancel}
              footer={[
                <Button type="primary" danger onClick={onDelete}>
                  OK
                </Button>,
              ]}
            >
              <Form.Item
                style={{
                  textAlign: 'center',
                  marginBottom: '0',
                  fontSize: '18px',
                }}
              >
                <p>Offer rejected.</p>
                <p>Iterest rate successfully rejected.</p>
              </Form.Item>
            </Modal>
          </>
        )}
      />
    </Table>
  );
};
