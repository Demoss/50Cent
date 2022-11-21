import { Col, Layout, Popover, Row } from 'antd';

import { InvestorInvestmentsTable } from '@/components/InvestorInvestmentsTable/InvestorInvestmaentsTable';
import diagram from '../../../images/diagram.png';
import {
  BalanceContainer,
  BalanceTitle,
  InvestorHeader,
  InvestorInfo,
  InvestorTable,
} from './InvestorCabinetScreen.styles';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useCurrentInvestor, usePotentialPayout } from '@/hooks/investor';
import { Messages } from '@/components/Messages/Messages';

export function InvestorCabinetScreen() {
  const { Name, Surname, MiddleName, Balance } = useCurrentInvestor();
  const { payout } = usePotentialPayout();

  const balance = (
    <div style={{ width: '200px', fontSize: '14px' }}>
      Стан Вашого балансу на поточний момент
    </div>
  );

  const payouts = (
    <div style={{ width: '200px', fontSize: '14px' }}>
      Потенційна сума відсотків за виплати цього місяця
    </div>
  );

  return (
    <Layout>
      <InvestorHeader>
        <Row justify="space-between">
          <Col span={8}>
            <BalanceTitle>
              Ваш баланс
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
              Виплати за цей місяць
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
    </Layout>
  );
}
