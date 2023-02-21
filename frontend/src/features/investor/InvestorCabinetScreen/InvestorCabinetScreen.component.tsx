import { Col, Layout, Popover, Row, Modal, Button } from 'antd';
import { useSearchParams } from 'react-router-dom';

import { InvestorInvestmentsTable } from '@/components/InvestorInvestmentsTable/InvestorInvestmaentsTable';
import diagram from '../../../images/diagram.png';
import {
  BalanceContainer,
  BalanceTitle,
  InvestorHeader,
  InvestorInfo,
  InvestorTable,
  StripeInfo,
  StripeInfoError,
  StripeInfoSuccess,
} from './InvestorCabinetScreen.styles';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useCurrentInvestor, usePotentialPayout } from '@/hooks/investor';
import { Messages } from '@/components/Messages/Messages';
import { useEffect, useState } from 'react';

export function InvestorCabinetScreen() {
  const { Name, Surname, MiddleName, Balance } = useCurrentInvestor();
  const { payout } = usePotentialPayout();

  const [searchParams, setSearchParams] = useSearchParams();
  const stripeTypeMsg = searchParams.get('type');
  const [isVisible, setIsVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const balance = (
    <div style={{ width: '200px', fontSize: '14px' }}>Your current balance</div>
  );

  const payouts = (
    <div style={{ width: '200px', fontSize: '14px' }}>
      Potential interest amount for this month's payments
    </div>
  );

  useEffect(() => {
    if (stripeTypeMsg) setIsVisible(true);
  }, [stripeTypeMsg]);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setIsVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  return (
    <Layout>
      <InvestorHeader>
        <Row justify="space-between">
          <Col span={8}>
            <BalanceTitle>
              Your balance
              <Popover content={balance} trigger="hover">
                <InfoCircleOutlined style={{ marginLeft: '5px' }} />
              </Popover>
            </BalanceTitle>
            <BalanceContainer>${Balance}</BalanceContainer>
            <img src={diagram} alt="diagram" />
          </Col>
          <Col span={8}>
            <InvestorInfo>
              {Surname} {Name} {MiddleName}
            </InvestorInfo>
          </Col>
          <Col span={8} push={3}>
            <BalanceTitle style={{ marginLeft: '25px' }}>
              Payments for this month
              <Popover content={payouts} trigger="hover">
                <InfoCircleOutlined style={{ marginLeft: '5px' }} />
              </Popover>
            </BalanceTitle>
            <BalanceContainer style={{ marginLeft: '25px' }}>
              ${payout?.payouts}
            </BalanceContainer>
            <img src={diagram} alt="diagram" style={{ marginLeft: '20px' }} />
          </Col>
        </Row>
      </InvestorHeader>
      <InvestorTable>
        <Row>
          <Col span={24}>
            <InvestorInvestmentsTable />
          </Col>
        </Row>
      </InvestorTable>
      <InvestorTable>
        <Row>
          <Col span={24}>
            <Messages />
          </Col>
        </Row>
      </InvestorTable>
      {stripeTypeMsg && (
        <div>
          <Modal
            title="Stripe message"
            visible={isVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            confirmLoading={confirmLoading}
            footer={[
              <Button
                type="primary"
                key="submit"
                loading={confirmLoading}
                onClick={handleOk}
              >
                OK
              </Button>,
            ]}
          >
            <StripeInfo>
              {stripeTypeMsg === 'success' ? (
                <StripeInfoSuccess className={'stripe-msg-success'}>
                  Payment Successfull!
                </StripeInfoSuccess>
              ) : stripeTypeMsg === 'error' ? (
                <StripeInfoError className={'stripe-msg-error'}>
                  Payment Failure!
                </StripeInfoError>
              ) : (
                ''
              )}
            </StripeInfo>
          </Modal>
        </div>
      )}
    </Layout>
  );
}
