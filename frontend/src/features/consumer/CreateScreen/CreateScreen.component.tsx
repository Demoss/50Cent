import { useFormik } from 'formik';
import { CreateForm } from './CreateScreen.types';
import { Api } from '@/api';
import { Button, Form, Input, message, Upload } from 'antd';

import {
  PageContainer,
  PageSubtitle,
  PageTitle,
  RedButton,
} from './Create.styles';
import { CreateFormValidationSchema } from '@/features/consumer/CreateScreen/CreateScreen.validation';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';

function Redirect(url: string) {
  window.location.href = url;
  return null;
}

export const CreateScreen = () => {
  const form = useFormik<CreateForm>({
    initialValues: {
      name: '',
      surname: '',
      middle_name: '',
      photo: null,
      work_file: null,
      id_file: null,
      property_file: null,
    },
    validationSchema: CreateFormValidationSchema,
    validateOnChange: false,
    async onSubmit(values) {
      try {
        await Api.create({
          name: values.name,
          surname: values.surname,
          middle_name: values.middle_name,
          photo: values.photo,
          work_file: values.work_file,
          id_file: values.id_file,
          property_file: values.property_file,
        });

        await Api.registerStripe()
          .then((response) => Redirect(response.url))
          .catch((err) =>
            message.error('Сталась помилка при спробі додати оплату.'),
          );
      } catch (error) {
        message.error('Сталась помилка під час створення користувача.');
      }
    },
  });

  return (
    <PageContainer>
      <PageTitle>Please fill out the form👇</PageTitle>
      <PageSubtitle>
        We need this data to accurately assess your credit rating. We do not
        share this data.
      </PageSubtitle>

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
          validateStatus={form.errors.middle_name ? 'error' : 'success'}
          help={form.errors.middle_name}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}

            placeholder="Parental name"
            name="middle_name"
            value={form.values.middle_name}
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
            <Button icon={<UploadOutlined />}> Select File</Button>
          </Upload>
        </Form.Item>
        <Form.Item rules={[{ required: true }]}>
          <Upload
            beforeUpload={(file) => {
              form.setFieldValue('work_file', file);

              return false;
            }}
          >
            <span style={{ color: 'red' }}>*</span>
            Certificate of employment:
            <Button icon={<UploadOutlined />}> Select File</Button>
          </Upload>
        </Form.Item>
        <Form.Item rules={[{ required: true }]}>
          <Upload
            beforeUpload={(file) => {
              form.setFieldValue('id_file', file);

              return false;
            }}
          >
            <span style={{ color: 'red' }}>*</span>
            ID Card:
            <Button icon={<UploadOutlined />}> Select File</Button>
          </Upload>
        </Form.Item>
        <Form.Item rules={[{ required: true }]}>
          <Upload
            beforeUpload={(file) => {
              form.setFieldValue('property_file', file);


              return false;
            }}
          >
            <span style={{ color: 'red' }}>*</span>
            Documents for existing property:
            <Button icon={<UploadOutlined />}> Select File</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <RedButton type="submit">Continue</RedButton>
        </Form.Item>
      </form>
    </PageContainer>
  );
};
