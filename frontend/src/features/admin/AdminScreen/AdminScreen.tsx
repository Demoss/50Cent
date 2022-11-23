import { Col, Row } from 'antd/lib/grid';
import Title from 'antd/lib/typography/Title';
import { Outlet } from 'react-router-dom';
import { Divider, message, Modal, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import 'antd/dist/antd.min.css';
import { ApproveAction, Container, RejectAction } from './AdminScreen.styles';
import { useEffect, useState } from 'react';
import { adminActions, roles, User } from '@/api/admin/apiTypes';
import { Api } from '@/api';
import {
  ActionToPerformOnUser,
  UserTypeToSendApiRequest,
} from '@/api/admin/reviewUser/apiTypes';

export function AdminScreen() {
  const showErrorMsg = (errText: string) => {
    message.error(`Error: ${errText}`);
  };

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await Api.getUsers();

        //set data source from response:
        setDataSource(response);
      } catch (err: unknown) {
        let msg: string;

        if (err instanceof Error) msg = err.message;
        else msg = String(err);

        showErrorMsg(msg);
      }
    }
    fetchUsers();
  }, []);

  function onUserReject(record: User) {
    return async (_e: React.SyntheticEvent) => {
      let userType: UserTypeToSendApiRequest;
      if (record.role === roles.creditor) {
        userType = UserTypeToSendApiRequest.consumers;
      } else {
        userType = UserTypeToSendApiRequest.investors;
      }

      await Api.reviewUser({
        action: ActionToPerformOnUser.decline,
        userId: record.key,
        accountType: userType,
      })
        .then((_response) => {
          // user is approved, so we can delete him from not approved users list;
          setDataSource(dataSource.filter((user) => user.key !== record.key));

          success(record, adminActions.reject);
        })
        .catch((error) => {
          showErrorMsg(error);
        });
    };
  }

  function onUserApprove(record: User) {
    return async (_e: React.SyntheticEvent) => {
      let userType: UserTypeToSendApiRequest;
      if (record.role === roles.creditor) {
        userType = UserTypeToSendApiRequest.consumers;
      } else {
        userType = UserTypeToSendApiRequest.investors;
      }

      await Api.reviewUser({
        action: ActionToPerformOnUser.approve,
        userId: record.key,
        accountType: userType,
      })
        .then((_response) => {
          // user is approved, so we can delete him from not approved users list;
          setDataSource(dataSource.filter((user) => user.key !== record.key));

          success(record, adminActions.approve);
        })
        .catch((error) => {
          showErrorMsg(error);
        });
    };
  }

  const columns: ColumnsType<User> = [
    {
      key: 'role',
      title: 'Role',
      dataIndex: 'role',
    },
    {
      key: 'name',
      title: 'Full name',
      dataIndex: 'name',
    },
    {
      key: 'photo',
      title: 'Photo',
      render: (_, record: User) => {
        return (
          <span>
            <a target={`_blank`} href={record.photo}>
              Photo
            </a>
          </span>
        );
      },
    },
    {
      key: 'passport',
      title: 'ID card',
      render: (_, record: User) => {
        return (
          <span>
            <a target={`_blank`} href={record.passport}>
              ID card
            </a>
          </span>
        );
      },
    },
    {
      key: 'workplace',
      title: 'Workplace',
      render: (_, record: User) => {
        return (
          <span>
            {record.workplace ? (
              <a target={`_blank`} href={record.workplace}>
                Workplace
              </a>
            ) : (
              <p>User put in the documents.</p>
            )}
          </span>
        );
      },
    },
    {
      key: 'property',
      title: 'Property',
      render: (_, record: User) => {
        return (
          <span>
            {record.property ? (
              <a target={`_blank`} href={record.property}>
                Property
              </a>
            ) : (
              <p>User put in the property documents.</p>
            )}
          </span>
        );
      },
    },
    {
      key: 'action',
      title: 'Action',
      render: (_, record: User) => (
        <span>
          <ApproveAction onClick={onUserApprove(record)}>Accept</ApproveAction>
          <Divider type="vertical" />

          <RejectAction onClick={onUserReject(record)}>Reject</RejectAction>
        </span>
      ),
    },
  ];

  const [dataSource, setDataSource] = useState([] as User[]);
  const success = (user: User, action: adminActions) => {
    Modal.success({
      title: 'Success!',
      content: `Account ${user.name} has been successfully activated.`,
    });
  };

  return (
    <Container>
      <Outlet />
      <Row>
        <Col span={18} offset={4}>
          <Title>Accounts awaiting verification</Title>
          <Table<User> columns={columns} dataSource={dataSource} />
        </Col>
      </Row>
    </Container>
  );
}
