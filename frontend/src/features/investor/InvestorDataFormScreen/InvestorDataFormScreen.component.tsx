import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Form, Input, message, Button, Upload, Spin } from 'antd';
import {
  LoadingOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { RcFile } from 'antd/lib/upload';
import { Api } from '@/api';
import { ButtonStyled } from './InvestorDataFormScreen.styles';
import { PageContainer, PageSubtitle, PageTitle } from '../Investor.styles';
import { InvestorDataForm } from './InvestorDataFormScreen.types';
import { investorDataFormValidationSchema } from './InvestorFormValidation';

function Redirect(url: string) {
  window.location.href = url;
  return null;
}

export const InvestorDataFormScreen: React.FC = () => {
  const [isLoging, setIsLoging] = useState(false);
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: 'white' }} spin />
  );

  const form = useFormik<InvestorDataForm>({
    initialValues: {
      name: '',
      surname: '',
      middleName: '',
      idFile: undefined,
      photo: undefined,
    },
    validationSchema: investorDataFormValidationSchema,
    validateOnChange: false,

    async onSubmit(values) {
      try {
        setIsLoging(true);

        await Api.registerInvestorForm({
          name: values.name,
          surname: values.surname,
          middleName: values.middleName,
          photo: values.photo as RcFile,
          idFile: values.idFile as RcFile,
        }).catch(err => {
           if(err.response?.data.message === 'file too large') {
             message.error('File too large to upload');
             // TODO:fix redirect
             window.location.reload();
           }
         });

        await Api.registerInvestorStripe()
          .then((response) => Redirect(response.url))
          .catch((error) =>
                message.error('Error while trying to add payment.'),
          );
      } catch (error) {
        return message.error('Something goes wrong');
      } finally {
        setIsLoging(false);
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
            onClick={() => {
              form.handleSubmit();
            }}
            danger
          >
            {isLoging ? <Spin indicator={antIcon} /> : 'Continue'}
          </ButtonStyled>
        </Form.Item>
      </form>
    </PageContainer>
  );
};
