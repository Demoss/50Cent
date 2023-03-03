import { FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Layout, Row, Col, Space } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import jwt_decode from 'jwt-decode';

import logo from '../../images/logo-test.png';
import { HeaderStyles } from './Header.styles';
import { routes } from '@/routing';
import { useCurrentUser } from '@/hooks';
import { admin, consumer, investor, user } from '@/constants/constants';
import { appStorage } from '@/services/appStorage/appStorage.service';
import { Api } from '@/api';
import { LoginConfirmToken } from '@/features/login/LoginConfirmScreen/LoginConfirmScreen.types';

const { Header } = Layout;
const {
  ImgContainer,
  UserTypeContainer,
  LogoHomeButton,
  NavLinkCabinetStyled,
} = HeaderStyles;

const HeaderComponent: FC = () => {
  const navigate = useNavigate();

  const getInvestorInfo = async () => {
    const investor = await Api.getCurrentInvestor();
    navigate(`/investor/update/${investor.ID}`);
  };

  const getConsumerInfo = async () => {
    const consumer = await Api.getCurrentConsumer();
    navigate(`/consumer/update/${consumer.ID}`);
  };

  const onGoHome = () => {
    const decodedToken = jwt_decode<LoginConfirmToken>(
      localStorage.getItem('apiToken') || '',
    ).role;

    navigate(`/${decodedToken}`);
  };

  const logButton = () => {
    return currentUser ? (
      <Button
        onClick={() => {
          appStorage.setApiKey('');
          navigate(routes.login.absolute(), { replace: true });
          window.location.reload();
        }}
      >
        <LogoutOutlined />
        Sign Out
      </Button>
    ) : (
      <>
        <Button>
          <UserOutlined />
          <NavLink to={routes.login.absolute()}>Sign In</NavLink>
        </Button>
        <Button style={{ marginLeft: '10px' }}>
          <NavLink to={routes.login.registration.absolute()}>Sign Up</NavLink>
        </Button>
      </>
    );
  };

  const { currentUser } = useCurrentUser();

  const cabinetRole =
    currentUser?.role === 'user'
      ? user
      : currentUser?.role === 'investor'
      ? investor
      : currentUser?.role === 'consumer'
      ? consumer
      : admin;

  return (
    <Header>
      <Row>
        <Col span={12} className="logo-container">
          <Row align="middle">
            <LogoHomeButton type="button" onClick={onGoHome}>
              <ImgContainer
                src={logo}
                alt="logo"
                style={{ display: 'block' }}
              />
            </LogoHomeButton>
            <span>Loans that won’t make you poor</span>
          </Row>
        </Col>

        <Col span={12}>
          <Row justify="end">
            <Space>
              <Col>
                {currentUser?.role ? (
                  <UserTypeContainer>
                    <NavLinkCabinetStyled
                      to={`${
                        cabinetRole === 'investor'
                          ? cabinetRole + '/cabinet'
                          : cabinetRole
                      }`}
                    >
                      👉 Cabinet
                    </NavLinkCabinetStyled>
                  </UserTypeContainer>
                ) : (
                  logButton()
                )}
              </Col>

              {currentUser && currentUser.role !== 'user' && (
                <Col>
                  <Button
                    onClick={
                      currentUser?.role === 'investor'
                        ? getInvestorInfo
                        : getConsumerInfo
                    }
                  >
                    <UserOutlined />
                    Update account info
                  </Button>
                </Col>
              )}

              {currentUser && (
                <Button
                  danger
                  onClick={() => {
                    appStorage.setApiKey('');
                    navigate(routes.login.absolute(), { replace: true });
                    window.location.reload();
                  }}
                >
                  <LogoutOutlined />
                  Sign Out
                </Button>
              )}
            </Space>
          </Row>
        </Col>
      </Row>
    </Header>
  );
};

export { HeaderComponent };
