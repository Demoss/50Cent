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
  <div style={{ width: '200px', fontSize: '14px' }}>
    Стан Вашого балансу на поточний момент
  </div>
);

const contentPayment = (
  <div style={{ width: '200px', fontSize: '14px' }}>
    Мінімальна сума, необхідна для погашення заборгованості за це місяць
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
                Ваш баланс
                <Popover content={content} trigger="hover">
                  <InfoCircleOutlined style={{ marginLeft: '5px' }} />
                </Popover>
              </Row>
              <Row>
                {/* query to the stripe account */}
                <PageSubtitle>₴ 20000</PageSubtitle>
              </Row>
              <Row>
                <ImgContainer src={diagram} />
              </Row>
            </Col>
            <Col flex="auto">
              <CabinetTitle style={{ textAlign: 'center', padding: '5px' }}>
                <div>Важливо!</div>
                <div style={{ fontSize: '14px' }}>
                  Платформа електроних переказів стягує комісію 2,9% від суми
                  транзакції, окрім комісії нашого сервісу. Виведення коштів на
                  банківський рахунок відбувається в автоматичному режимі раз на
                  день.
                </div>
              </CabinetTitle>
            </Col>
            <Col flex="100px">
              <Row>
                Місячна виплата
                <Popover content={contentPayment} trigger="hover">
                  <InfoCircleOutlined style={{ marginLeft: '5px' }} />
                </Popover>
              </Row>
              <Row>
                <PageSubtitle>₴ 100</PageSubtitle>
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
            Взяти кредит
          </Button>
        </CabinetContainer>

        <CabinetContainer style={{ height: '30% vh' }}>
          <Tabs type="card" size="large">
            <TabPane tab="Ваші актуальні позики" key="2">
              <CabinetTitle>Ваші актуальні позики</CabinetTitle>
              <AcceptedLoansTable />
            </TabPane>
            <TabPane tab="Відповіді на запити позик" key="1">
              <CabinetTitle>
                Відсоткова ставка, запропонована інвесторами, по Вашому
                кредитному запиту.
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
        <TitleContainer>Залишились запитання?</TitleContainer>
        <InvestorQuestion />
      </QuestionContainer>
    </Layout>
  );
};
