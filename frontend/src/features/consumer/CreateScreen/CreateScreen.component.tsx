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

export const CreateScreen = () => {
  const form = useFormik<CreateForm>({
    initialValues: {
      name: '',
      surname: '',
      middleName: '',
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
          middleName: values.middleName,
          photo: values.photo,
          work_file: values.work_file,
          id_file: values.id_file,
          property_file: values.property_file,
        });
      } catch (error) {
        message.error('something went wrong while creating consumer');
      }
    },
  });

  return (
    <PageContainer>
      <PageTitle>Please fill out the form👇</PageTitle>
      <PageSubtitle>
        We need this data to accurately assess your credit rating.
        <br />
        We do not share this data.
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
          validateStatus={form.errors.middleName ? 'error' : 'success'}
          help={form.errors.middleName}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Paternal name"
            name="middleName"
            value={form.values.middleName}
            onChange={form.handleChange}
          />
        </Form.Item>
        <Upload
          beforeUpload={(file) => {
            form.setFieldValue('photo', file);

            return false;
          }}
          fileList={form.values.photo ? [form.values.photo] : []}
        >
          Photo:
          <Button icon={<UploadOutlined />}> Select File</Button>
        </Upload>
        <Upload
          beforeUpload={(file) => {
            form.setFieldValue('work_file', file);

            return false;
          }}
          fileList={form.values.work_file ? [form.values.work_file] : []}
        >
          Certificate of employment:
          <Button icon={<UploadOutlined />}> Select File</Button>
        </Upload>
        <Upload
          beforeUpload={(file) => {
            form.setFieldValue('id_file', file);

            return false;
          }}
          fileList={form.values.id_file ? [form.values.id_file] : []}
        >
          ID Card:
          <Button icon={<UploadOutlined />}> Select File</Button>
        </Upload>
        <Upload
          beforeUpload={(file) => {
            form.setFieldValue('property_file', file);

            return false;
          }}
          fileList={
            form.values.property_file ? [form.values.property_file] : []
          }
        >
          Documents for existing property:
          <Button icon={<UploadOutlined />}> Select File</Button>
        </Upload>

        <Form.Item>
          <RedButton type="submit">Continue</RedButton>
        </Form.Item>
      </form>
    </PageContainer>
  );
};
