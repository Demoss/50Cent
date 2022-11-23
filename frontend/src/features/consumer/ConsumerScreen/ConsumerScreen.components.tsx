import { InvestorQuestion } from '@/components';
import { Col, Layout, Popover, Row, Tabs, Button } from 'antd';
import {
  CabinetContainer,
  ConsumerHomeContainer,
  ImgContainer,
  QuestionContainer,
  TitleContainer,
  PageSubtitle,
  CabinetTitle,
} from './ConsumerScreen.styles';
import diagram from '../../../images/diagram.png';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { InvestorResponse } from '@/components/InvestorResponseTable/InvestorResponseTable';
import { AcceptedLoansTable } from '@/components/AcceptedLoansTable/AcceptedLoansTable';
import { Messages } from '@/components/Messages/Messages';

const content = (
  <div style={{ width: '200px', fontSize: '14px' }}>Your current balance</div>
);

const contentPayment = (
  <div style={{ width: '200px', fontSize: '14px' }}>
    The minimum amount required to repay the debt for this month
  </div>
);

const { TabPane } = Tabs;

export const ConsumerScreen = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/credit');
  };
  return (
    <Layout>
      <ConsumerHomeContainer>
        <CabinetContainer>
          <Row style={{ flexWrap: 'nowrap' }}>
            <Col flex="100px">
              <Row>
                Your balance
                <Popover content={content} trigger="hover">
                  <InfoCircleOutlined style={{ marginLeft: '5px' }} />
                </Popover>
              </Row>
              <Row>
                {/* query to the stripe account */}
                <PageSubtitle>$ 20000</PageSubtitle>
              </Row>
              <Row>
                <ImgContainer src={diagram} />
              </Row>
            </Col>
            <Col flex="auto">
              <CabinetTitle style={{ textAlign: 'center', padding: '5px' }}>
                <div>Important!</div>
                <div style={{ fontSize: '14px' }}>
                  The electronic transfer platform charges a fee of 2.9% of the
                  transaction amount, in addition to our service fee. Funds are
                  withdrawn to the bank account automatically once a day.
                </div>
              </CabinetTitle>
            </Col>
            <Col flex="100px">
              <Row>
                Monthly payment
                <Popover content={contentPayment} trigger="hover">
                  <InfoCircleOutlined style={{ marginLeft: '5px' }} />
                </Popover>
              </Row>
              <Row>
                <PageSubtitle>$ 100</PageSubtitle>
              </Row>
              <Row>
                <ImgContainer src={diagram} />
              </Row>
            </Col>
          </Row>
        </CabinetContainer>
        <CabinetContainer style={{ textAlign: 'center' }}>
          <Button
            type="primary"
            danger
            style={{ width: '100%' }}
            onClick={handleClick}
          >
            Take loan
          </Button>
        </CabinetContainer>

        <CabinetContainer style={{ height: '30% vh' }}>
          <Tabs type="card" size="large">
            <TabPane tab="Your current loans" key="2">
              <CabinetTitle>Your current loans</CabinetTitle>
              <AcceptedLoansTable />
            </TabPane>
            <TabPane tab="Respone to loan requests." key="1">
              <CabinetTitle>
                The interest rate offered by investors to your credit request.
              </CabinetTitle>
              <InvestorResponse />
            </TabPane>
          </Tabs>
        </CabinetContainer>

        <CabinetContainer>
          <Messages />
        </CabinetContainer>
      </ConsumerHomeContainer>
      <QuestionContainer>
        <TitleContainer>Do you have any more questions?</TitleContainer>
        <InvestorQuestion />
      </QuestionContainer>
    </Layout>
  );
};
