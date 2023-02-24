import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { Form, Input, message, Button, Upload, Image, Alert, Spin } from 'antd';
import {
  LoadingOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { PageContainer, PageSubtitle } from '../Consumer.styles';
import { ConsumerUpdateDataForm } from './ConsumerUpdateDataFormScreen.types';
import { consumerDataFormValidationSchema } from './ConsumerUpdateFormValidation';
import { Api } from '@/api';
import { RcFile } from 'antd/lib/upload';
import {
  ButtonStyled,
  PhotoContainer,
  UpdatePageContainer,
  UpdatePageTitle,
} from './ConsumerUpdateDataFormScreen.styles';

export const ConsumerUpdateDataFormScreen: React.FC = () => {
  const params = useParams();
  const [photo, setPhoto] = useState('');
  const [idPicture, setIdPicture] = useState('');
  const [workFile, setWorkFile] = useState('');
  const [Property, setProperty] = useState('');

  const [isLoging, setIsLoging] = useState(false);
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: 'white' }} spin />
  );

  const id = params.id ? +params.id : 0;
  const getConsumerInfo = async () => {
    try {
      const response = await Api.getConsumerInfo({ id });
      form.setFieldValue('name', response.Name);
      form.setFieldValue('surname', response.Surname);
      form.setFieldValue('middleName', response.MiddleName);
      setPhoto(response.Photo);
      setIdPicture(response.IDFile);
      setWorkFile(response.WorkFile);
      setProperty(response.PropertyFile);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getConsumerInfo();
    // eslint-disable-next-line
  }, []);

  const form = useFormik<ConsumerUpdateDataForm>({
    initialValues: {
      name: '',
      surname: '',
      middleName: '',
      photo: undefined,
      workFile: undefined,
      idFile: undefined,
      propertyFile: undefined,
    },
    validationSchema: consumerDataFormValidationSchema,
    validateOnChange: false,

    async onSubmit(values) {
      try {
        setIsLoging(true);

        const response = await Api.updateConsumer({
          id: id,
          name: values.name,
          surname: values.surname,
          middleName: values.middleName,
          photo: values.photo ? (values.photo as RcFile) : undefined,
          workFile: values.workFile ? (values.workFile as RcFile) : undefined,
          idFile: values.idFile ? (values.idFile as RcFile) : undefined,
          propertyFile: values.propertyFile
            ? (values.propertyFile as RcFile)
            : undefined,
        });
        (values.photo ||
          values.idFile ||
          values.workFile ||
          values.propertyFile) &&
          getConsumerInfo();
        if (response.status === 'Added updated to user') {
          return message.success('The profile has updated successfully!');
        }
      } catch (error) {
        return message.error('Something goes wrong');
      } finally {
        setIsLoging(false);
      }
    },
  });

  return (
    <PageContainer>
      {form.values.name ? (
        <>
          <UpdatePageTitle>Wellcome, {form.values.name}! 😎</UpdatePageTitle>
          <UpdatePageContainer>
            <PhotoContainer>
              <div>
                <PageSubtitle>Photo</PageSubtitle>
                {photo && <Image width={200} src={photo} />}
              </div>
              <div>
                <PageSubtitle>Certificate of employment</PageSubtitle>
                {idPicture && <Image width={200} src={idPicture} />}
              </div>
            </PhotoContainer>
            <PhotoContainer>
              <div>
                <PageSubtitle>ID Card</PageSubtitle>
                {workFile && <Image width={200} src={workFile} />}
              </div>
              <div>
                <PageSubtitle>Documents for existing property</PageSubtitle>
                {Property && <Image width={200} src={Property} />}
              </div>
            </PhotoContainer>
            <div>
              <PageSubtitle>
                You can update imforamtion about you up here
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
                    Photo:{' '}
                    <Button icon={<UploadOutlined />}>Click to replace</Button>
                  </Upload>
                </Form.Item>
                <Form.Item rules={[{ required: true }]}>
                  <Upload
                    beforeUpload={(file) => {
                      form.setFieldValue('workFile', file);
                      return false;
                    }}
                  >
                    <span style={{ color: 'red' }}>*</span>
                    Certificate of employment:{' '}
                    <Button icon={<UploadOutlined />}>Click to replace</Button>
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
                    ID Card:{' '}
                    <Button icon={<UploadOutlined />}>Click to replace</Button>
                  </Upload>
                </Form.Item>
                <Form.Item rules={[{ required: true }]}>
                  <Upload
                    beforeUpload={(file) => {
                      form.setFieldValue('propertyFile', file);
                      return false;
                    }}
                  >
                    <span style={{ color: 'red' }}>*</span>
                    Documents for existing property:{' '}
                    <Button icon={<UploadOutlined />}>Click to replace</Button>
                  </Upload>
                </Form.Item>

                <Form.Item></Form.Item>
              </form>
            </div>
          </UpdatePageContainer>
          <ButtonStyled
            type="primary"
            onClick={() => form.handleSubmit()}
            danger
          >
            {isLoging ? <Spin indicator={antIcon} /> : 'Update'}
          </ButtonStyled>
        </>
      ) : (
        <Alert
          message="Error!"
          description="Unfortunately, we can't find your data..."
          type="error"
          showIcon
        />
      )}
    </PageContainer>
  );
};
