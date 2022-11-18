import { Col, Row } from 'antd/lib/grid';
import Title from 'antd/lib/typography/Title';
import { Outlet } from 'react-router-dom';
import { Divider, Form, Modal, Table, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import 'antd/dist/antd.min.css';
import { ApproveAction, Container, RejectAction } from './AdminScreen.styles';
import { useEffect, useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { roles, UI_ROLES, User } from '@/api/admin/apiTypes';
import { Api } from '@/api';
import {
  ActionToPerformOnUser,
  UserTypeToSendApiRequest,
} from '@/api/admin/reviewUser/apiTypes';

const MAX_FORM_LENGTH = 250;

export function AdminScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userKeyAdminWantsToDelete, setUserKeyAdminWantsToDelete] =
    useState(-1);

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
    return (_e: React.SyntheticEvent) => {
      setUserKeyAdminWantsToDelete(record.key);
      showModal(record);
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

          success(record);
        })
        .catch((error) => {
          showErrorMsg(error);
        });
    };
  }

  const columns: ColumnsType<User> = [
    {
      key: 'role',
      title: 'Full name, role',
      dataIndex: 'role',
    },
    {
      key: 'name',
      title: 'Name',
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
            <a target={`_blank`} href={record.workplace}>
              Workplace
            </a>
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
            <a target={`_blank`} href={record.property}>
              Private property
            </a>
          </span>
        );
      },
    },
    {
      key: 'action',
      title: 'Actions',
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

  const showModal = (_user: User) => {
    setIsModalVisible(true);
  };
  const handleOk = async () => {
    //find user by id and get his role
    const temp: UI_ROLES = dataSource.find(
      (user) => user.key === userKeyAdminWantsToDelete,
    )?.role;

    let role: UserTypeToSendApiRequest = UserTypeToSendApiRequest.investors;
    if (temp === roles.creditor) {
      role = UserTypeToSendApiRequest.consumers;
    } else if (temp === roles.investor) {
      role = UserTypeToSendApiRequest.investors;
    }

    await Api.reviewUser({
      action: ActionToPerformOnUser.decline,
      userId: userKeyAdminWantsToDelete,
      accountType: role,
    })
      .then((_res) => {
        //delete from local state:
        setDataSource(
          dataSource.filter((user) => user.key !== userKeyAdminWantsToDelete),
        );
        setIsModalVisible(false);
      })
      .catch((err) => {
        showErrorMsg(err);
      });
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const success = (user: User) => {
    Modal.success({
      title: 'Success!',
      content: `Account ${user.name} has been accepted successfully.`,
    });
  };

  return (
    <Container>
      <Modal
        title="Confirm the action"
        okText={'Reject'}
        cancelText={`Back`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Describe why the account will be rejected 👇</p>
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          initialValues={{
            size: 'small',
          }}
          size={'small'}
        >
          <Form.Item label="Reason for rejection: ">
            <TextArea
              rows={4}
              placeholder={`Up to ${MAX_FORM_LENGTH} symbols`}
              maxLength={MAX_FORM_LENGTH}
            />
          </Form.Item>
        </Form>
      </Modal>
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
