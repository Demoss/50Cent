import { FC } from 'react';
import { Button, Layout, Row, Col, Space } from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  WalletOutlined,
  TransactionOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

import logo from '../../images/logo-test.png';
import { HeaderStyles } from './Header.styles';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { routes } from '@/routing';
import { useCurrentUser } from '@/hooks';
import { admin, consumer, investor, user } from '@/constants/constants';
import { appStorage } from '@/services/appStorage/appStorage.service';
import { Api } from '@/api';

const { Header } = Layout;
const { ImgContainer, UserTypeContainer } = HeaderStyles;

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
        Вийти
      </Button>
    ) : (
      <Button>
        <UserOutlined />
        <NavLink to={routes.login.absolute()}>Увійти</NavLink>
      </Button>
    );
  };

  const { currentUser } = useCurrentUser();

  return (
    <Header>
      <Row>
        <Col span={12} className="logo-container">
          <Row align="middle">
            <ImgContainer src={logo} alt="logo" />
            <span>Loans that won’t make you poor</span>
          </Row>
        </Col>

        <Col span={12}>
          <Row justify="end">
            <Space>
              <Col>
                {currentUser?.role ? (
                  <UserTypeContainer>
                    {currentUser?.role === 'user'
                      ? user
                      : currentUser?.role === 'investor'
                      ? investor
                      : currentUser?.role === 'consumer'
                      ? consumer
                      : admin}
                  </UserTypeContainer>
                ) : (

                  logButton()

                )}
              </Col>

              <Col>
                <Button>
                  {currentUser?.email ? (
                    currentUser.role === 'investor' ? (
                      <>
                        <SettingOutlined />
                        Change accout type
                      </>
                    ) : currentUser.role === 'consumer' ? (
                      <>

                        <Link to={routes.credit.absolute()}>
                          <WalletOutlined />
                          Take a loan
                        </Link>

                      </>
                    ) : null
                  ) : (
                    <NavLink to={routes.login.registration.absolute()}>
                      Sign Up
                    </NavLink>
                  )}
                </Button>
              </Col>
              {currentUser && (
                <Button
                  onClick={() => {
                    appStorage.setApiKey('');
                    navigate(routes.login.absolute(), { replace: true });
                    window.location.reload();
                  }}
                >
                  <LogoutOutlined />
                  Вийти
                </Button>
              )}

              {currentUser && currentUser.role !== 'user' && (
                <Col>
                  <Button
                    type="primary"
                    danger
                    size="large"
                    onClick={
                      currentUser?.role === 'investor'
                        ? getInvestorInfo
                        : getConsumerInfo
                    }
                  >
                    <UserOutlined />
                    Змінити профіль
                  </Button>
                </Col>
              )}

              {/*TOD0: Find icon translate and change*/}
              <Col>
                <Button>
                  <TransactionOutlined />
                </Button>
              </Col>
            </Space>
          </Row>
        </Col>
      </Row>
    </Header>
  );
};

export { HeaderComponent };
