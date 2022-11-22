import React, { FC } from 'react';
import { Button, Layout, Row, Col, Space } from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  WalletOutlined,
  TransactionOutlined,
} from '@ant-design/icons';

import { IUser } from '@/models/user.interface';
import logo from '../../images/logo-test.png';
import { HeaderStyles } from './Header.styles';
import './Header.css';
import { NavLink } from 'react-router-dom';
import { routes } from '@/routing';

const { Header } = Layout;
const { ImgContainer, UserTypeContainer } = HeaderStyles;

const HeaderComponent: FC = () => {
  const user: IUser = {
    username: '',
    type: '',
  };

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
                {user.type ? (
                  <UserTypeContainer>
                    {user.type}: {user.username}
                  </UserTypeContainer>
                ) : (
                  <Button>
                    <UserOutlined />
                    <NavLink to={routes.login.absolute()}>Sign In</NavLink>
                  </Button>
                )}
              </Col>

              <Col>
                <Button>
                  {user.username ? (
                    user.type === 'користувач' ? (
                      <>
                        <SettingOutlined />
                        Change accout type
                      </>
                    ) : (
                      <>
                        <WalletOutlined />
                        Take a loan
                      </>
                    )
                  ) : (
                    <NavLink to={routes.login.registration.absolute()}>
                      Sign Up
                    </NavLink>
                  )}
                </Button>
              </Col>

              {user.username ? (
                <Col>
                  <Button type="primary" danger size="large">
                    <UserOutlined />
                  </Button>
                </Col>
              ) : null}

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
