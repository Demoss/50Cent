import {
  ClusterOutlined,
  QuestionOutlined,
  WechatOutlined,
} from '@ant-design/icons';
import { Col, Row } from 'antd';

const InvestorQuestion = () => {
  return (
    <>
      <Row justify="space-between">
        <Col span={7}>
          <Row align="middle" wrap={false}>
            <Col>
              <WechatOutlined
                style={{ fontSize: '60px', marginRight: '10px' }}
              />
            </Col>
            <Col>
              <h2>Online support</h2>
              <p>Our support will answer all your quetions. </p>
              <a href="/">write in support</a>
            </Col>
          </Row>
        </Col>

        <Col span={7}>
          <Row align="middle" wrap={false}>
            <Col>
              <QuestionOutlined
                style={{ fontSize: '60px', marginRight: '10px' }}
              />
            </Col>
            <Col>
              <h2>FAQ</h2>
              <p>Visit out frequently asked questions page </p>
              <a href="/">visit FAQ </a>
            </Col>
          </Row>
        </Col>

        <Col span={7}>
          <Row align="middle" wrap={false}>
            <Col>
              <ClusterOutlined
                style={{
                  fontSize: '60px',
                  marginRight: '10px',
                }}
              />
            </Col>
            <Col>
              <h2>About us</h2>
              <p>Visit the about us page to get more info </p>
              <a href="/">About us</a>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export { InvestorQuestion };
