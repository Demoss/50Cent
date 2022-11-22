import React from 'react';
import { useFormik } from 'formik';
import { PageContainer, PageSubtitle, PageTitle } from '../Investor.styles';
import { InvestorDataForm } from './InvestorDataFormScreen.types';
import { investorDataFormValidationSchema } from './InvestorFormValidation';
import { Form, Input, message, Button, Upload } from 'antd';
import { Api } from '@/api';

import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/lib/upload';
import { useNavigate } from 'react-router-dom';
import { ButtonStyled } from './InvestorDataFormScreen.styles';

export const InvestorDataFormScreen: React.FC = () => {
  const navigate = useNavigate();
  const form = useFormik<InvestorDataForm>({
    initialValues: {
      name: '',
      surname: '',
      middleName: '',
      photo: undefined,
      idFile: undefined,
    },
    validationSchema: investorDataFormValidationSchema,
    validateOnChange: false,

    async onSubmit(values) {
      try {
        await Api.registerInvestorForm({
          name: values.name,
          surname: values.surname,
          middleName: values.middleName,
          photo: values.photo as RcFile,
          idFile: values.idFile as RcFile,
        });
        navigate('/obtain');
      } catch (error) {
        return message.error("Something goes's wrong");
      }
    },
  });

  return (
    <PageContainer>
      <PageTitle>Please fill out the form👇👇</PageTitle>
      <PageSubtitle>We need this data. It won’t be shared.</PageSubtitle>

      <form onSubmit={form.handleSubmit}>
        <Form.Item
          validateStatus={form.errors.name ? 'error' : 'success'}
          help={form.errors.name}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Name"
            name="name"
            value={form.values.name}
            onChange={form.handleChange}
          />
        </Form.Item>

        <Form.Item
          validateStatus={form.errors.surname ? 'error' : 'success'}
          help={form.errors.surname}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Surname"
            name="surname"
            value={form.values.surname}
            onChange={form.handleChange}
          />
        </Form.Item>

        <Form.Item
          validateStatus={form.errors.middleName ? 'error' : 'success'}
          help={form.errors.middleName}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Parental name"
            name="middleName"
            value={form.values.middleName}
            onChange={form.handleChange}
          />
        </Form.Item>
        <Form.Item rules={[{ required: true }]}>
          <Upload
            beforeUpload={(file) => {
              form.setFieldValue('photo', file);
              return false;
            }}
          >
            <span style={{ color: 'red' }}>*</span>
            Photo:
            <Button icon={<UploadOutlined />}>Click, to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item rules={[{ required: true }]}>
          <Upload
            beforeUpload={(file) => {
              form.setFieldValue('idFile', file);
              return false;
            }}
          >
            <span style={{ color: 'red' }}>*</span>
            ID Card:
            <Button icon={<UploadOutlined />}>Click, to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <ButtonStyled
            type="primary"
            onClick={() => form.handleSubmit()}
            danger
          >
            Continue
          </ButtonStyled>
        </Form.Item>
      </form>
    </PageContainer>
  );
};
