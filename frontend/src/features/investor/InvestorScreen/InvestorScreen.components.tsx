import { InvestmentsTable, InvestorQuestion } from '@/components';
import { Col, Layout, Row } from 'antd';

import investorHomeImg from '../../../images/pexels-tima-miroshnichenko-6694864.jpg';
import {
  QuestionContainer,
  ImgContainer,
  InvestmentsContainer,
  InvestorHomeContainer,
  SubTitleContainer,
  TitleContainer,
  NavLinkStyled,
} from './InvestorScreen.styles';

export function InvestorScreen() {
  return (
    <Layout>
      <InvestorHomeContainer>
        <Row justify="space-between" align="middle">
          <Col span={12}>
            <TitleContainer>Start investing and earning!</TitleContainer>
            <SubTitleContainer>
              All active applications for investment are posted on Cabinet ↗️
            </SubTitleContainer>
          </Col>
          <Col span={12}>
            <Row justify="end">
              <ImgContainer src={investorHomeImg} alt="investor-img" />
            </Row>
          </Col>
        </Row>
      </InvestorHomeContainer>

      <InvestmentsContainer>
        <Row>
          <TitleContainer>
            The most profitable offers for investments{' '}
          </TitleContainer>
          <InvestmentsTable />
        </Row>
      </InvestmentsContainer>

      <QuestionContainer>
        <TitleContainer>Do you have any more questions?</TitleContainer>
        <InvestorQuestion />
      </QuestionContainer>
    </Layout>
  );
}
