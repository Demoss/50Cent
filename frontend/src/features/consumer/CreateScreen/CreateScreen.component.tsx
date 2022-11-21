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
      <PageTitle>Будь ласка, заповніть форму</PageTitle>
      <PageSubtitle>
        Нам потрібні ці дані, щоб вірно оцінити Ваш
        <br /> кредитний рейтинг. Ми не розповсюджуємо <br /> ці дані
      </PageSubtitle>

      <form onSubmit={form.handleSubmit}>
        <Form.Item
          validateStatus={form.errors.name ? 'error' : 'success'}
          help={form.errors.name}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Ім'я"
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
            placeholder="Прізвище"
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
            placeholder="По батькові"
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
            Фотографія:
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
            Довідка про місце роботи:
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
            Паспорт:
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
            Документи про наявне майно:
            <Button icon={<UploadOutlined />}> Select File</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <RedButton type="submit">Продовжити</RedButton>
        </Form.Item>
      </form>
    </PageContainer>
  );
};
