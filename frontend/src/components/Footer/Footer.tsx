import React, { FC } from 'react';
import { Layout, Col, Row } from 'antd';

import './Footer.css';

const { Footer } = Layout;

const FooterComponent: FC = () => {
  return (
    <Footer>
      <Row justify="space-between">
        <Col>
          <h2>About us</h2>
          <Row>
            <span>Company info</span>
          </Row>
          <Row>
            <span>FAG</span>
          </Row>
          <Row>
            <span>Ask a question</span>
          </Row>
          <Row>
            <span>System dat</span>
          </Row>
          <Row>
            <span>Brand assets </span>
          </Row>
        </Col>

        <Col>
          <h2>Products and serices</h2>
          <Row>
            <span>Р2р borrowing</span>
          </Row>
          <Row>
            <span>Р2р lending</span>
          </Row>
          <Row>
            <span>Referral program</span>
          </Row>
        </Col>

        <Col>
          <h2>Documentations</h2>
          <Row>
            <span>User agreement</span>
          </Row>
          <Row>
            <span>Privacy Policy</span>
          </Row>
          <Row>
            <span>Support</span>
          </Row>
        </Col>
      </Row>
    </Footer>
  );
};

export { FooterComponent };
